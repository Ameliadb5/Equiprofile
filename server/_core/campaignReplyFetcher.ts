/**
 * Campaign Reply Fetcher — lightweight IMAP poller using imapflow.
 * Fetches new replies to the campaign sending mailbox and stores them in
 * the `campaignReplies` table for operator review.
 *
 * Environment variables used (same as SMTP):
 *   SMTP_HOST  — IMAP server host (often same as SMTP host)
 *   SMTP_PORT  — ignored for IMAP; we use port 993
 *   IMAP_PORT  — optional IMAP port override (default 993)
 *   SMTP_USER  — login username
 *   SMTP_PASS  — login password
 *   IMAP_TLS   — set to "false" to disable TLS (default: true)
 *
 * Operational model:
 * - Called from reminderScheduler on a cron schedule
 * - Only fetches UNSEEN messages in INBOX since the last-fetched date
 * - Upserts by messageId to prevent duplicates
 * - Never auto-replies; purely read-only on mailbox
 */
import { ImapFlow, type FetchMessageObject } from "imapflow";
import { getRuntimeConfig } from "../dynamicConfig";
import { getDb } from "../db";

async function getImapCredentials(): Promise<{
  host: string;
  port: number;
  user: string;
  pass: string;
  tls: boolean;
} | null> {
  const host =
    process.env.SMTP_HOST ||
    (await getRuntimeConfig("smtp_host", "SMTP_HOST")) ||
    "";
  const user =
    process.env.SMTP_USER ||
    (await getRuntimeConfig("smtp_user", "SMTP_USER")) ||
    "";
  const pass =
    process.env.SMTP_PASS ||
    (await getRuntimeConfig("smtp_pass", "SMTP_PASS")) ||
    "";
  const tls = process.env.IMAP_TLS !== "false";
  const port = parseInt(process.env.IMAP_PORT || "993", 10);

  if (!host || !user || !pass) return null;
  return { host, port, user, pass, tls };
}

/**
 * Fetch up to `limit` unseen messages from INBOX and store them in DB.
 * Returns the count of new replies stored.
 */
export async function fetchCampaignReplies(limit = 50): Promise<number> {
  const creds = await getImapCredentials();
  if (!creds) {
    console.log("[CampaignReplies] IMAP credentials not configured — skipping fetch");
    return 0;
  }

  const dbConn = await getDb();
  if (!dbConn) {
    console.log("[CampaignReplies] No DB connection — skipping fetch");
    return 0;
  }

  const client = new ImapFlow({
    host: creds.host,
    port: creds.port,
    secure: creds.tls,
    auth: { user: creds.user, pass: creds.pass },
    logger: false, // suppress imapflow internal logs
  });

  let stored = 0;

  try {
    await client.connect();
    const lock = await client.getMailboxLock("INBOX");

    try {
      // Search for UNSEEN messages — safe: doesn't mark as read automatically
      const uids = await client.search({ seen: false }, { uid: true });
      if (!uids || uids.length === 0) {
        return 0;
      }

      // Process up to `limit` messages per call to avoid large bursts
      const batch = uids.slice(0, limit);

      const {
        campaignReplies: repliesTable,
        emailCampaignRecipients,
        marketingContacts,
        emailCampaigns,
      } = await import("../../drizzle/schema");
      const { eq, sql } = await import("drizzle-orm");

      for (const uid of batch) {
        try {
          // Fetch headers and snippet without marking seen
          const msgResult: FetchMessageObject | false = await client.fetchOne(String(uid), {
            uid: true,
            envelope: true,
            bodyParts: ["TEXT"],
          }, { uid: true });

          // fetchOne returns false if the message no longer exists
          if (!msgResult) continue;
          const msg = msgResult as FetchMessageObject;

          if (!msg.envelope) continue;

          const messageId = (msg.envelope as { messageId?: string }).messageId || `uid-${uid}-${Date.now()}`;
          const envelope = msg.envelope as {
            from?: Array<{ address?: string; name?: string }>;
            subject?: string;
            date?: Date;
          };
          const fromAddr = envelope.from?.[0];
          const fromEmail = fromAddr?.address?.toLowerCase() || "";
          const fromName = fromAddr?.name || undefined;
          const subject = envelope.subject || "";
          const receivedAt = envelope.date || new Date();

          // Extract text snippet (first 250 chars of plain text body)
          let snippet = "";
          try {
            const bodyParts = (msg as { bodyParts?: Map<string, Buffer | string> }).bodyParts;
            const rawBody = bodyParts?.get("TEXT");
            if (rawBody) {
              const text = Buffer.isBuffer(rawBody)
                ? rawBody.toString("utf-8")
                : String(rawBody);
              snippet = text.replace(/\s+/g, " ").trim().slice(0, 250);
            }
          } catch {
            // snippet is optional
          }

          if (!fromEmail) continue;

          // ── Try to match contact and campaign ──
          let matchedContactId: number | null = null;
          let matchedCampaignId: number | null = null;

          try {
            const [mc] = await dbConn
              .select({ id: marketingContacts.id })
              .from(marketingContacts)
              .where(eq(marketingContacts.email, fromEmail));
            if (mc) matchedContactId = mc.id;

            if (fromEmail) {
              const [sentRecord] = await dbConn
                .select({ campaignId: emailCampaignRecipients.campaignId })
                .from(emailCampaignRecipients)
                .where(eq(emailCampaignRecipients.email, fromEmail));
              if (sentRecord) {
                matchedCampaignId = sentRecord.campaignId;
              }
            }
          } catch {
            // matching is best-effort
          }

          // ── Upsert reply (ignore duplicate messageId) ──
          try {
            await dbConn
              .insert(repliesTable)
              .values({
                messageId: messageId.slice(0, 499),
                fromEmail,
                fromName: fromName?.slice(0, 199),
                subject: subject.slice(0, 499),
                snippet: snippet || null,
                receivedAt,
                matchedCampaignId,
                matchedContactId,
                status: "new",
                sequenceStopped: false,
              })
              .onDuplicateKeyUpdate({ set: { fromEmail } }); // no-op on duplicate messageId
            stored++;
          } catch {
            // duplicate key — already stored
          }
        } catch (msgErr) {
          console.error("[CampaignReplies] Error processing message:", msgErr);
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
  } catch (err) {
    console.error("[CampaignReplies] IMAP connection error:", err);
    try {
      await client.logout().catch(() => {});
    } catch {
      // ignore
    }
  }

  return stored;
}
