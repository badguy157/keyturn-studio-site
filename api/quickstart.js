// /api/quickstart.js — Quote request intake
// - Validates fields
// - Emails you a detailed admin copy
// - Emails the client a short confirmation (no onboarding steps)
// - Soft-fails email so the UI can still show success

export default async function handler(req, res) {
  // Preflight + method guard
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = await readJson(req);
    const {
      propertyName = '',
      websiteUrl = '',
      contactName = '',
      email = '',
      phone = '',
      bookingSystem = '',
      goal = '',
      launchTiming = '',
      assetsLink = '',
      notes = '',
      company = '',          // honeypot
      pagePath = '',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      timezone = '',
      userAgent = '',
      referrer = ''
    } = body || {};

    // Honeypot: bots get OK (no emails)
    if (company) return res.status(200).json({ ok: true });

    // Minimal validation
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (
      !propertyName || !websiteUrl || !contactName ||
      !isEmail(email) || !bookingSystem || !goal || !launchTiming
    ) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // ---- Env
    // Send TO your inbox. Use RESEND_NOTIFICATIONS if set; falls back to hello@keyturn.studio
    const TO   = process.env.RESEND_NOTIFICATIONS || process.env.QS_TO_EMAIL || 'hello@keyturn.studio';
    // Verified sender on Resend (you’ve already verified updates.keyturn.studio)
    const FROM = process.env.RESEND_FROM || process.env.QS_FROM_EMAIL || 'Keyturn Studio <hello@updates.keyturn.studio>';

    // ---- Admin email (to you)
    const subject = `Quote request — ${propertyName}`;
    const htmlAdmin = `
      <h2>New Quote Request</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:Inter,Arial,sans-serif">
        ${row('Property', propertyName)}
        ${row('Website', websiteUrl)}
        ${row('Contact', contactName)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Booking system', bookingSystem)}
        ${row('Primary goal', goal)}
        ${row('Ideal timing', launchTiming)}
        ${row('Assets link', assetsLink)}
        ${row('Notes', notes)}
      </table>
      <hr style="margin:16px 0;border:0;border-top:1px solid #e5eaf2">
      <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#6b7280">
        Meta — page: ${escapeHtml(pagePath)} | utm: ${escapeHtml(utm_source)}/${escapeHtml(utm_medium)}/${escapeHtml(utm_campaign)} |
        tz: ${escapeHtml(timezone)} | referrer: ${escapeHtml(referrer)} | UA: ${escapeHtml(userAgent)}
      </p>
    `;

    // ---- Client email (short confirmation only)
    const htmlClient = `
      <div style="background:#0a1220;padding:24px 12px;">
        <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;">
          <tr><td>
            <div style="background:#ffffff;border:1px solid #e5eaf2;border-radius:16px;padding:24px">
              <h1 style="margin:0 0 12px;font:700 20px Inter,Arial,sans-serif;color:#0b1220">
                Thanks — we’ve received your quote request
              </h1>
              <p style="margin:0 0 12px;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                Hi ${escapeHtml(contactName)}, thanks for the details. We’ll send a <b>1-page quote within 1 business day</b>.
              </p>
              <p style="margin:0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                If anything else would be helpful in the meantime, just reply to this email.
              </p>
              <p style="margin:16px 0 0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">— Keyturn Studio</p>
            </div>
          </td></tr>
          <tr><td style="text-align:center;color:#cdd6ea;font:12px Inter,Arial,sans-serif;padding-top:12px">
            © ${new Date().getFullYear()} Keyturn Studio
          </td></tr>
        </table>
      </div>
    `;

    // Try Resend, then SendGrid; soft-fail
    let emailSent = false;
    try {
      emailSent =
        (await sendViaResend(FROM, TO, subject, htmlAdmin, email, htmlClient)) ||
        (await sendViaSendGrid(FROM, TO, subject, htmlAdmin, email, htmlClient));
    } catch (e) {
      console.error('Email send error (continuing):', e);
    }

    return res.status(200).json({ ok: true, emailSent });
  } catch (e) {
    console.error('Quickstart error:', e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

/* ------------ helpers ------------- */
function row(label, value){
  return `<tr><td><b>${escapeHtml(label)}</b></td><td>${escapeHtml(value || '')}</td></tr>`;
}
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (m) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;'
  }[m]));
}
async function readJson(req){
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return JSON.parse(raw); } catch { return {}; }
}

/* -------- Email providers ---------- */
async function sendViaResend(from, to, subject, htmlAdmin, replyTo, htmlClient){
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  // Admin message → you
  const r1 = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo || undefined, subject, html: htmlAdmin })
  });
  if (!r1.ok) throw new Error(`Resend admin error: ${await r1.text()}`);

  // Client confirmation
  if (replyTo) {
    const r2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [replyTo], subject: 'Thanks — we’ve received your quote request', html: htmlClient })
    });
    if (!r2.ok) throw new Error(`Resend client error: ${await r2.text()}`);
  }
  return true;
}

async function sendViaSendGrid(from, to, subject, htmlAdmin, replyTo, htmlClient){
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return false;

  // Admin message → you
  const r1 = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }], subject }],
      from: { email: extractEmail(from) },
      reply_to: replyTo ? { email: replyTo } : undefined,
      content: [{ type: 'text/html', value: htmlAdmin }]
    })
  });
  if (r1.status >= 400) throw new Error(`SendGrid admin error: ${await r1.text()}`);

  // Client confirmation
  if (replyTo) {
    const r2 = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: replyTo }], subject: 'Thanks — we’ve received your quote request' }],
        from: { email: extractEmail(from) },
        content: [{ type: 'text/html', value: htmlClient }]
      })
    });
    if (r2.status >= 400) throw new Error(`SendGrid client error: ${await r2.text()}`);
  }
  return true;
}
function extractEmail(v){ return String(v || '').replace(/^.*<|>$/g, '') || v; }
