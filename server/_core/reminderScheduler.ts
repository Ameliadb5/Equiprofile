import cron from "node-cron";
import * as db from "../db";
import {
  getWhatsAppConfig,
  sendWhatsAppMessage,
  formatDateForWhatsApp,
  userHasWhatsAppEnabled,
} from "./whatsapp";
import { sendEmail } from "./email";
import { getTodayDateString } from "./campaignService";

/**
 * Reminder Scheduler
 * Checks for due reminders every hour and sends email + WhatsApp notifications
 */

let isRunning = false;

export function startReminderScheduler() {
  if (isRunning) {
    console.log("[Reminders] Scheduler already running");
    return;
  }

  console.log("[Reminders] Starting reminder scheduler...");

  // Run every hour at minute 0
  cron.schedule("0 * * * *", async () => {
    console.log("[Reminders] Checking for due reminders...");

    try {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // ── Event reminders ──────────────────────────────────────
      const dueReminders = await db.getDueEventReminders(tomorrow);

      console.log(`[Reminders] Found ${dueReminders.length} due reminders`);

      for (const reminder of dueReminders) {
        try {
          // Get the associated event
          const event = await db.getEventById(reminder.eventId);
          if (!event) {
            // Mark orphaned reminder as sent so it doesn't reappear every hour
            await db.markEventReminderSent(reminder.id);
            console.log(
              `[Reminders] Skipped orphaned reminder ${reminder.id} (event deleted) — marked as sent`,
            );
            continue;
          }

          // Get user details
          const user = await db.getUserById(event.userId);
          if (!user || !user.email) {
            console.log(`[Reminders] User not found for event ${event.id}`);
            continue;
          }

          // Send email reminder
          const emailModule = await import("./email");
          await emailModule.sendReminderEmail(
            user.email,
            user.name || "there",
            event.title,
            event.description || "",
            new Date(event.startDate),
            undefined, // horse name if applicable
          );

          // Send WhatsApp reminder if user has it enabled
          const waConfig = await getWhatsAppConfig();
          if (
            waConfig.enabled &&
            userHasWhatsAppEnabled(user.preferences || null)
          ) {
            const phone = user.phone;
            if (phone) {
              const hoursUntil = Math.round(
                (new Date(event.startDate).getTime() - now.getTime()) /
                  (1000 * 60 * 60),
              );
              const timeLabel =
                hoursUntil <= 1 ? "1 hour" : `${hoursUntil} hours`;
              await sendWhatsAppMessage({
                to: phone,
                template: "event_reminder",
                parameters: [
                  user.name || "there",
                  event.title,
                  formatDateForWhatsApp(new Date(event.startDate)),
                  timeLabel,
                ],
              });
            }
          }

          // Mark reminder as sent
          await db.markEventReminderSent(reminder.id);

          console.log(
            `[Reminders] Sent reminder ${reminder.id} to ${user.email}`,
          );
        } catch (error) {
          console.error(
            `[Reminders] Failed to send reminder ${reminder.id}:`,
            error,
          );
        }
      }

      // ── Trial-ending reminders (daily at 9 AM UTC) ───────────
      const TRIAL_REMINDER_LOOKAHEAD_DAYS = 3;
      if (now.getUTCHours() === 9) {
        try {
          const trialUsers = await db.getTrialsEndingSoon(TRIAL_REMINDER_LOOKAHEAD_DAYS);
          const emailModule = await import("./email");

          for (const user of trialUsers) {
            if (!user.email || !user.trialEndsAt) continue;
            const daysLeft = Math.max(
              0,
              Math.ceil(
                (user.trialEndsAt.getTime() - now.getTime()) /
                  (1000 * 60 * 60 * 24),
              ),
            );
            // Only send at key milestones: 2, 1, or 0 days remaining
            if (daysLeft <= 2) {
              await emailModule
                .sendTrialReminderEmail(user, daysLeft)
                .catch((err: any) =>
                  console.error(
                    `[Reminders] Failed to send trial reminder to ${user.email}:`,
                    err,
                  ),
                );
              console.log(
                `[Reminders] Sent trial reminder (${daysLeft}d left) to ${user.email}`,
              );
            }
          }
        } catch (error) {
          console.error("[Reminders] Error checking trial reminders:", error);
        }
      }

      console.log("[Reminders] Reminder check complete");
    } catch (error) {
      console.error("[Reminders] Error checking reminders:", error);
    }
  });

  // ── Campaign Follow-Up Sequence Scheduler ───────────────────
  // Runs daily at 10:00 AM UTC — checks for pending sequence steps
  // that have reached their scheduled date and sends them automatically.
  cron.schedule("0 10 * * *", async () => {
    console.log("[CampaignFollowUp] Checking for due follow-up steps...");

    try {
      const dbConn = await db.getDb();
      if (!dbConn) {
        console.log("[CampaignFollowUp] No database connection — skipping");
        return;
      }

      const { eq, and, lte, or } = await import("drizzle-orm");
      const {
        campaignSequences,
        campaignSequenceRecipients,
        emailCampaignRecipients,
        emailUnsubscribes,
        marketingContacts,
        emailCampaigns,
      } = await import("../../drizzle/schema");

      const today = getTodayDateString();

      // Find pending sequence steps whose scheduledDate is today or earlier
      const dueSteps = await dbConn
        .select()
        .from(campaignSequences)
        .where(
          and(
            eq(campaignSequences.status, "pending"),
            lte(campaignSequences.scheduledDate, today),
          ),
        );

      if (dueSteps.length === 0) {
        console.log("[CampaignFollowUp] No due follow-up steps");
        return;
      }

      console.log(`[CampaignFollowUp] Found ${dueSteps.length} due follow-up step(s)`);

      // Build global suppression set (once for all steps)
      const suppressions = await dbConn
        .select({ email: emailUnsubscribes.email })
        .from(emailUnsubscribes);
      const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));

      const mcBounced = await dbConn
        .select({ email: marketingContacts.email })
        .from(marketingContacts)
        .where(
          or(
            eq(marketingContacts.status, "unsubscribed"),
            eq(marketingContacts.status, "bounced"),
          ),
        );
      for (const b of mcBounced) suppressedSet.add(b.email.toLowerCase());

      const BASE_URL = process.env.BASE_URL || "https://equiprofile.online";

      for (const step of dueSteps) {
        try {
          // Check that parent campaign exists and is not paused/draft-cancelled
          const [campaign] = await dbConn
            .select()
            .from(emailCampaigns)
            .where(eq(emailCampaigns.id, step.campaignId));
          if (!campaign || campaign.status === "paused") {
            console.log(
              `[CampaignFollowUp] Skipping step ${step.id} — campaign ${step.campaignId} is paused or missing`,
            );
            continue;
          }

          // Get original recipients who were successfully sent the initial campaign
          const recipients = await dbConn
            .select()
            .from(emailCampaignRecipients)
            .where(
              and(
                eq(emailCampaignRecipients.campaignId, step.campaignId),
                eq(emailCampaignRecipients.status, "sent"),
              ),
            );

          let sentCount = 0;
          let failedCount = 0;

          for (const recipient of recipients) {
            // Skip if suppressed/unsubscribed
            if (suppressedSet.has(recipient.email.toLowerCase())) {
              await dbConn.insert(campaignSequenceRecipients).values({
                sequenceId: step.id,
                campaignId: step.campaignId,
                email: recipient.email,
                status: "skipped",
              });
              continue;
            }

            try {
              // Get unsubscribe token
              const [mc] = await dbConn
                .select()
                .from(marketingContacts)
                .where(eq(marketingContacts.email, recipient.email.toLowerCase()));
              const unsubToken = mc?.unsubscribeToken || "";
              const unsubLink = unsubToken
                ? `${BASE_URL}/unsubscribe?token=${unsubToken}`
                : `${BASE_URL}/unsubscribe`;

              // Simple merge field replacement for follow-up body
              let html = step.htmlBody || "";
              html = html.replace(/\{\{firstName\}\}/g, recipient.name?.split(" ")[0] || "");
              html = html.replace(/\{\{email\}\}/g, recipient.email);
              html = html.replace(/\{\{unsubscribeLink\}\}/g, unsubLink);

              await sendEmail(recipient.email, step.subject || "Follow-up", html);

              await dbConn.insert(campaignSequenceRecipients).values({
                sequenceId: step.id,
                campaignId: step.campaignId,
                email: recipient.email,
                status: "sent",
                sentAt: new Date(),
              });
              sentCount++;
            } catch (err) {
              await dbConn.insert(campaignSequenceRecipients).values({
                sequenceId: step.id,
                campaignId: step.campaignId,
                email: recipient.email,
                status: "failed",
                error: err instanceof Error ? err.message : "Unknown error",
              });
              failedCount++;
            }
          }

          // Mark step as sent
          await dbConn
            .update(campaignSequences)
            .set({ status: "sent", sentAt: new Date(), sentCount, failedCount })
            .where(eq(campaignSequences.id, step.id));

          console.log(
            `[CampaignFollowUp] Step ${step.id} (Day ${step.delayDays}): sent=${sentCount} failed=${failedCount} skipped=${recipients.length - sentCount - failedCount}`,
          );
        } catch (stepErr) {
          console.error(
            `[CampaignFollowUp] Error processing step ${step.id}:`,
            stepErr,
          );
        }
      }

      console.log("[CampaignFollowUp] Follow-up check complete");
    } catch (error) {
      console.error("[CampaignFollowUp] Error:", error);
    }
  });

  isRunning = true;
  console.log("[Reminders] Scheduler started successfully");
}

export function stopReminderScheduler() {
  // Note: node-cron doesn't provide a direct way to stop all tasks
  // In production, you might want to keep track of task references
  isRunning = false;
  console.log("[Reminders] Scheduler stopped");
}
