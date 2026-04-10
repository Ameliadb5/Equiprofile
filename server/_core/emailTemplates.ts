/**
 * Professional HTML email templates for admin campaigns.
 * 5 templates total: 4 marketing + 1 general-purpose.
 *
 * Merge fields supported:
 *   {{firstName}} – recipient first name
 *   {{email}} – recipient email
 *   {{currentDate}} – today's date (formatted)
 *   {{trialEndDate}} – trial expiration date
 *   {{signupLink}} – registration URL
 *   {{billingLink}} – billing/upgrade URL
 */

const LOGO_URL = "https://equiprofile.online/logo.png";
const SIGNUP_URL = "https://equiprofile.online/register";
const BILLING_URL = "https://equiprofile.online/billing";
const SITE_URL = "https://equiprofile.online";

// ─────────────────────────────────────────────────────────────────────────────
// Shared styles & layout wrapper
// ─────────────────────────────────────────────────────────────────────────────

function wrapEmail(body: string, bgColor = "#f4f6f9"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>EquiProfile</title>
</head>
<body style="margin:0;padding:0;background:${bgColor};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bgColor};">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
${body}
</table>
<!-- Footer -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin-top:16px;">
<tr><td align="center" style="padding:16px;color:#9ca3af;font-size:12px;line-height:1.5;">
<p style="margin:0;">EquiProfile — Professional Horse Management</p>
<p style="margin:4px 0 0 0;"><a href="${SITE_URL}" style="color:#6366f1;text-decoration:none;">equiprofile.online</a></p>
<p style="margin:8px 0 0 0;">{{currentDate}}</p>
<p style="margin:8px 0 0 0;font-size:11px;color:#b0b8c4;">You received this because you were contacted by EquiProfile.<br/>
<a href="{{unsubscribeLink}}" style="color:#6366f1;text-decoration:underline;">Unsubscribe</a> from future marketing emails.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function headerBlock(accent: string): string {
  return `<tr><td style="background:${accent};padding:32px 40px;text-align:center;">
<img src="${LOGO_URL}" alt="EquiProfile" width="140" style="display:block;margin:0 auto 12px auto;max-width:140px;height:auto;"/>
<p style="margin:0;color:#ffffff;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Professional Horse Management</p>
</td></tr>`;
}

function ctaButton(text: string, url: string, color: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
<tr><td style="border-radius:8px;background:${color};">
<a href="${url}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">
${text}
</a>
</td></tr>
</table>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 1: Feature Spotlight — Health Tracking
// ─────────────────────────────────────────────────────────────────────────────

function template1_healthTracking(): string {
  return wrapEmail(`
${headerBlock("linear-gradient(135deg, #0f2e6b 0%, #3b82f6 100%)")}
<tr><td style="padding:40px 40px 0;">
  <h1 style="margin:0 0 8px;font-size:26px;color:#1e293b;font-weight:700;">
    Hi {{firstName}} 👋
  </h1>
  <p style="margin:0 0 20px;font-size:16px;color:#64748b;line-height:1.6;">
    Did you know EquiProfile gives you a <strong style="color:#1e293b;">complete health dashboard</strong> for every horse?
  </p>
</td></tr>
<tr><td style="padding:0 40px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
    <tr><td style="padding:24px;background:#f0f7ff;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#0f2e6b;">🩺 Health Records at a Glance</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#334155;">✅ Vaccinations & reminders</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#334155;">✅ Dental care tracking</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#334155;">✅ Hoof care & farrier logs</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#334155;">✅ Deworming schedules</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#334155;">✅ X-ray records & documents</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#334155;">✅ Treatment history & notes</td>
        </tr>
      </table>
    </td></tr>
  </table>
</td></tr>
<tr><td style="padding:24px 40px 12px;text-align:center;">
  <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 8px;">
    Start your <strong style="color:#3b82f6;">7-day free trial</strong> — no credit card required.
  </p>
  ${ctaButton("Start Free Trial →", "{{signupLink}}", "#3b82f6")}
</td></tr>
<tr><td style="padding:0 40px 32px;text-align:center;">
  <p style="margin:0;font-size:13px;color:#94a3b8;">No credit card needed. Cancel anytime.</p>
</td></tr>
`);
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 2: Feature Spotlight — Training & Performance
// ─────────────────────────────────────────────────────────────────────────────

function template2_trainingPerformance(): string {
  return wrapEmail(`
${headerBlock("#1a1a2e")}
<tr><td style="padding:40px 40px 0;">
  <h1 style="margin:0 0 8px;font-size:26px;color:#1e293b;font-weight:700;">
    Level Up Your Training, {{firstName}} 🏇
  </h1>
  <p style="margin:0 0 20px;font-size:16px;color:#64748b;line-height:1.6;">
    Track every session, monitor performance trends, and optimise your horse's progress with EquiProfile.
  </p>
</td></tr>
<tr><td style="padding:0 40px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:50%;padding:8px;vertical-align:top;">
        <div style="background:#faf5ff;border-radius:10px;padding:20px;text-align:center;min-height:120px;">
          <div style="font-size:28px;margin-bottom:8px;">📊</div>
          <h3 style="margin:0 0 6px;font-size:14px;color:#7c3aed;font-weight:600;">Session Logs</h3>
          <p style="margin:0;font-size:13px;color:#64748b;">Log duration, type, intensity, and notes</p>
        </div>
      </td>
      <td style="width:50%;padding:8px;vertical-align:top;">
        <div style="background:#f0fdf4;border-radius:10px;padding:20px;text-align:center;min-height:120px;">
          <div style="font-size:28px;margin-bottom:8px;">🎯</div>
          <h3 style="margin:0 0 6px;font-size:14px;color:#16a34a;font-weight:600;">Performance</h3>
          <p style="margin:0;font-size:13px;color:#64748b;">Rate and track improvement over time</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="width:50%;padding:8px;vertical-align:top;">
        <div style="background:#fff7ed;border-radius:10px;padding:20px;text-align:center;min-height:120px;">
          <div style="font-size:28px;margin-bottom:8px;">📅</div>
          <h3 style="margin:0 0 6px;font-size:14px;color:#ea580c;font-weight:600;">Scheduling</h3>
          <p style="margin:0;font-size:13px;color:#64748b;">Plan sessions with calendar integration</p>
        </div>
      </td>
      <td style="width:50%;padding:8px;vertical-align:top;">
        <div style="background:#eff6ff;border-radius:10px;padding:20px;text-align:center;min-height:120px;">
          <div style="font-size:28px;margin-bottom:8px;">🤖</div>
          <h3 style="margin:0 0 6px;font-size:14px;color:#2563eb;font-weight:600;">AI Insights</h3>
          <p style="margin:0;font-size:13px;color:#64748b;">Get AI-powered training recommendations</p>
        </div>
      </td>
    </tr>
  </table>
</td></tr>
<tr><td style="padding:24px 40px 12px;text-align:center;">
  <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 8px;">
    Try it free for <strong style="color:#7c3aed;">7 days</strong> — no credit card required.
  </p>
  ${ctaButton("Start Training Smarter →", "{{signupLink}}", "#7c3aed")}
</td></tr>
<tr><td style="padding:0 40px 32px;text-align:center;">
  <p style="margin:0;font-size:13px;color:#94a3b8;">Join hundreds of equestrians managing their horses professionally.</p>
</td></tr>
`, "#f5f3ff");
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3: Feature Spotlight — Stable Management
// ─────────────────────────────────────────────────────────────────────────────

function template3_stableManagement(): string {
  return wrapEmail(`
${headerBlock("linear-gradient(135deg, #065f46 0%, #10b981 100%)")}
<tr><td style="padding:40px 40px 0;">
  <h1 style="margin:0 0 8px;font-size:26px;color:#1e293b;font-weight:700;">
    Run Your Yard Like a Pro, {{firstName}} 🏠
  </h1>
  <p style="margin:0 0 20px;font-size:16px;color:#64748b;line-height:1.6;">
    EquiProfile's Stable Plan gives yard owners and managers everything they need to run a professional operation.
  </p>
</td></tr>
<tr><td style="padding:0 40px;">
  <div style="background:#ecfdf5;border-left:4px solid #10b981;border-radius:0 10px 10px 0;padding:24px;margin-bottom:16px;">
    <h2 style="margin:0 0 12px;font-size:18px;color:#065f46;">What You Get</h2>
    <p style="margin:4px 0;font-size:14px;color:#334155;">🐴 <strong>Multi-horse management</strong> across all clients</p>
    <p style="margin:4px 0;font-size:14px;color:#334155;">👥 <strong>Staff & role management</strong> — assign tasks and permissions</p>
    <p style="margin:4px 0;font-size:14px;color:#334155;">📋 <strong>Client portal</strong> — owners see their horse's progress</p>
    <p style="margin:4px 0;font-size:14px;color:#334155;">📆 <strong>Yard calendar</strong> — appointments, farrier visits, events</p>
    <p style="margin:4px 0;font-size:14px;color:#334155;">💬 <strong>Messaging</strong> — communicate with staff and owners</p>
    <p style="margin:4px 0;font-size:14px;color:#334155;">📄 <strong>Reports & exports</strong> — PDF and CSV for everything</p>
  </div>
</td></tr>
<tr><td style="padding:16px 40px;text-align:center;">
  ${ctaButton("Try Stable Plan Free →", "{{signupLink}}", "#10b981")}
  <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">7-day free trial. No credit card. No strings.</p>
</td></tr>
<tr><td style="padding:0 40px 32px;">
  <div style="background:#f0fdf4;border-radius:8px;padding:16px;text-align:center;">
    <p style="margin:0;font-size:14px;color:#065f46;font-weight:600;">
      "EquiProfile transformed how we run our yard." — Stable Owner
    </p>
  </div>
</td></tr>
`, "#f0fdf4");
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 4: Feature Spotlight — AI Assistant & Weather
// ─────────────────────────────────────────────────────────────────────────────

function template4_aiAndWeather(): string {
  return wrapEmail(`
${headerBlock("linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)")}
<tr><td style="padding:40px 40px 0;">
  <h1 style="margin:0 0 8px;font-size:26px;color:#1e293b;font-weight:700;">
    Meet Your AI Horse Assistant, {{firstName}} 🤖
  </h1>
  <p style="margin:0 0 20px;font-size:16px;color:#64748b;line-height:1.6;">
    EquiProfile includes an intelligent AI assistant and real-time weather analysis — built right into your dashboard.
  </p>
</td></tr>
<tr><td style="padding:0 40px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding-bottom:16px;">
      <div style="background:linear-gradient(135deg,#eef2ff,#faf5ff);border-radius:12px;padding:24px;border:1px solid #e0e7ff;">
        <h3 style="margin:0 0 8px;font-size:16px;color:#4f46e5;">🧠 AI Chat Assistant</h3>
        <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">
          Ask questions about horse care, get training suggestions, understand health records, and manage your stable — all through natural conversation.
        </p>
      </div>
    </td></tr>
    <tr><td>
      <div style="background:linear-gradient(135deg,#ecfeff,#f0f9ff);border-radius:12px;padding:24px;border:1px solid #cffafe;">
        <h3 style="margin:0 0 8px;font-size:16px;color:#0891b2;">🌤️ Smart Weather Analysis</h3>
        <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">
          Get AI-powered riding suitability forecasts based on your stable's location. Know exactly when conditions are ideal for training, hacking, or turnout.
        </p>
      </div>
    </td></tr>
  </table>
</td></tr>
<tr><td style="padding:24px 40px 12px;text-align:center;">
  <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 8px;">
    Experience it free for <strong style="color:#4f46e5;">7 days</strong> — no credit card needed.
  </p>
  ${ctaButton("Try AI Features Free →", "{{signupLink}}", "#4f46e5")}
</td></tr>
<tr><td style="padding:0 40px 32px;text-align:center;">
  <p style="margin:0;font-size:13px;color:#94a3b8;">Powered by advanced AI. Always learning. Always helpful.</p>
</td></tr>
`, "#eef2ff");
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 5: General Campaign / Admin Template
// ─────────────────────────────────────────────────────────────────────────────

function template5_general(): string {
  return wrapEmail(`
${headerBlock("#0f2e6b")}
<tr><td style="padding:40px;">
  <h1 style="margin:0 0 16px;font-size:24px;color:#1e293b;font-weight:700;">
    {{subject}}
  </h1>
  <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
    Hi {{firstName}},
  </p>
  <div style="font-size:15px;color:#475569;line-height:1.7;">
    {{content}}
  </div>
  ${ctaButton("Visit EquiProfile →", SITE_URL, "#3b82f6")}
</td></tr>
<tr><td style="padding:0 40px 32px;">
  <div style="border-top:1px solid #e2e8f0;padding-top:16px;">
    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.5;">
      Questions? Reply to this email or contact us at <a href="mailto:hello@equiprofile.online" style="color:#6366f1;">hello@equiprofile.online</a>
    </p>
  </div>
</td></tr>
`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Template registry & merge-field processing
// ─────────────────────────────────────────────────────────────────────────────

export interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  previewColor: string;
  getHtml: () => string;
}

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    id: "health-tracking",
    name: "Health Tracking Spotlight",
    description:
      "Promotes comprehensive health tracking features — vaccinations, dental, hoof care, and more.",
    previewColor: "#3b82f6",
    getHtml: template1_healthTracking,
  },
  {
    id: "training-performance",
    name: "Training & Performance",
    description:
      "Highlights training logs, performance tracking, scheduling, and AI insights.",
    previewColor: "#7c3aed",
    getHtml: template2_trainingPerformance,
  },
  {
    id: "stable-management",
    name: "Stable Management",
    description:
      "Showcases the Stable Plan — multi-horse, staff, client portal, messaging.",
    previewColor: "#10b981",
    getHtml: template3_stableManagement,
  },
  {
    id: "ai-weather",
    name: "AI Assistant & Weather",
    description:
      "Promotes the AI chat assistant and smart weather-based riding analysis.",
    previewColor: "#4f46e5",
    getHtml: template4_aiAndWeather,
  },
  {
    id: "general",
    name: "General Campaign",
    description:
      "Flexible all-purpose template. Admin fills in subject, greeting, and body content.",
    previewColor: "#0f2e6b",
    getHtml: template5_general,
  },
];

/**
 * Applies merge fields to an HTML template string.
 */
export function applyMergeFields(
  html: string,
  fields: {
    firstName?: string;
    email?: string;
    currentDate?: string;
    trialEndDate?: string;
    signupLink?: string;
    billingLink?: string;
    subject?: string;
    content?: string;
    unsubscribeLink?: string;
  },
): string {
  const safeFields: Record<string, string> = {
    firstName: fields.firstName || "there",
    email: fields.email || "",
    currentDate:
      fields.currentDate ||
      new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    trialEndDate: fields.trialEndDate || "",
    signupLink: fields.signupLink || SIGNUP_URL,
    billingLink: fields.billingLink || BILLING_URL,
    subject: fields.subject || "",
    content: fields.content || "",
    unsubscribeLink: fields.unsubscribeLink || `${SITE_URL}/unsubscribe`,
  };

  let result = html;
  for (const [key, value] of Object.entries(safeFields)) {
    result = result.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, "g"),
      value,
    );
  }
  return result;
}

/**
 * Retrieve a template by ID.
 */
export function getTemplateById(
  templateId: string,
): CampaignTemplate | undefined {
  return CAMPAIGN_TEMPLATES.find((t) => t.id === templateId);
}
