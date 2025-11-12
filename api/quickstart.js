// File: /api/quickstart.js — Vercel Serverless Function
// Sends admin + client emails with brand styling and dynamic Next Steps (Intake, Uploads, Secure, Book).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
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
      company = '',
      pagePath = '',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      timezone = '',
      userAgent = '',
      referrer = ''
    } = body || {};

    if (company) return res.status(200).json({ ok: true }); // honeypot

    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!propertyName || !websiteUrl || !contactName || !isEmail(email) || !bookingSystem || !goal || !launchTiming) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // ENV
    const TO    = process.env.RESEND_NOTIFICATIONS || process.env.QS_TO_EMAIL || 'hello@keyturn.studio';
    const FROM  = process.env.RESEND_FROM || process.env.QS_FROM_EMAIL || 'Keyturn Studio <hello@updates.keyturn.studio>';
    const TALLY = process.env.TALLY_FULL_INTAKE || '';  // e.g. https://tally.so/r/XXXX?email={email}&property={property}
    const DROPB = process.env.DROPBOX_REQUEST || 'https://www.dropbox.com/request/OOsRAkmpSTVmnnAX6jJg';

    // Build absolute URLs (prefer PUBLIC_BASE_URL)
    const xfHost  = req.headers['x-forwarded-host']  || req.headers.host || 'keyturn.studio';
    const xfProto = req.headers['x-forwarded-proto'] || 'https';
    const BASE    = (process.env.PUBLIC_BASE_URL || `${xfProto}://${xfHost}`).replace(/\/$/, '');
    const SECURE  = `${BASE}/secure.html`;
    const ONBOARD = `${BASE}/onboarding.html#step3`;

    // Prefill Tally placeholders if present
    const intakeUrl = (TALLY || '')
      .replace('{email}', encodeURIComponent(email))
      .replace('{property}', encodeURIComponent(propertyName));

    const subject = `Quick Start — ${propertyName}`;

    // ----- Admin email -----
    const htmlAdmin = `
      <h2>Quick Start submission</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:Inter,Arial,sans-serif">
        ${row('Property', propertyName)}
        ${row('Website', websiteUrl)}
        ${row('Contact', contactName)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Booking system', bookingSystem)}
        ${row('Goal', goal)}
        ${row('Ideal timing', launchTiming)}
        ${row('Assets folder', assetsLink)}
        ${row('Notes', notes)}
      </table>
      <hr style="margin:16px 0;border:0;border-top:1px solid #e5eaf2">
      <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#6b7280">
        Meta — page: ${escapeHtml(pagePath)} | utm: ${escapeHtml(utm_source)}/${escapeHtml(utm_medium)}/${escapeHtml(utm_campaign)} |
        tz: ${escapeHtml(timezone)} | referrer: ${escapeHtml(referrer)} | UA: ${escapeHtml(userAgent)}
      </p>
      ${(intakeUrl || DROPB || SECURE || ONBOARD) ? `
        <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#6b7280">
          Links:
          ${intakeUrl ? ` Full intake: <a href="${intakeUrl}">${intakeUrl}</a>` : ''}
          ${(intakeUrl && (DROPB || SECURE || ONBOARD)) ? ' · ' : ''}
          ${DROPB ? ` Uploads: <a href="${DROPB}">${DROPB}</a>` : ''}
          ${(DROPB && (SECURE || ONBOARD)) ? ' · ' : ''}
          ${SECURE ? ` Secure creds: <a href="${SECURE}">${SECURE}</a>` : ''}
          ${(SECURE && ONBOARD) ? ' · ' : ''}
          ${ONBOARD ? ` Onboarding: <a href="${ONBOARD}">${ONBOARD}</a>` : ''}
        </p>` : ''
      }
    `;

    // ----- Client email (brand styling) -----
    const COLORS = { bg: '#0a1220', text: '#0b1220', muted: '#6b7280', border: '#e5eaf2', accent: '#5aa2ff', card: '#ffffff' };
    const btn = (href, label) =>
      `<a href="${href}" target="_blank" rel="noopener"
         style="background:${COLORS.accent};border-radius:12px;padding:12px 16px;color:#fff;text-decoration:none;font-weight:700;display:inline-block;">${label}</a>`;

    // Helper: list item with embedded CTA (keeps ordered numbering correct)
    const step = (text, href, ctaLabel) => {
      if (!href) return '';
      return `
        <li style="margin:0 0 14px 0">
          <div>${text}</div>
          <div style="margin:8px 0 0 0">${btn(href, ctaLabel)}</div>
        </li>`;
    };

    const htmlClient = `
      <div style="background:${COLORS.bg};padding:24px 12px;">
        <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;">
          <tr><td style="text-align:center;color:#e6ebf5;font:700 18px Inter,Arial,sans-serif;padding-bottom:12px">Keyturn Studio</td></tr>
          <tr><td>
            <div style="background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:16px;padding:24px">
              <h1 style="margin:0 0 12px;font:700 20px Inter,Arial,sans-serif;color:${COLORS.text}">Thanks — we’ve received your Quick Start</h1>
              <p style="margin:0 0 16px;font:14px/1.6 Inter,Arial,sans-serif;color:${COLORS.text}">
                Hi ${escapeHtml(contactName)}, thanks for sending your details — we’ll review and follow up shortly.
              </p>

              <h2 style="margin:0 0 10px;font:700 16px Inter,Arial,sans-serif;color:${COLORS.text}">Next steps</h2>

              <ol style="margin:0 0 16px 20px;padding:0;font:14px/1.7 Inter,Arial,sans-serif;color:${COLORS.text}">
                ${step('Complete the full intake (5–10 min):', intakeUrl, 'Open full intake')}
                ${step('Upload brand assets (logos, menus, photos):', DROPB, 'Upload assets')}
                ${step('Share DNS credentials securely (Bitwarden Send):', SECURE, 'Share credentials securely')}
                ${step('Book your kickoff call:', ONBOARD, 'Book kickoff call')}
              </ol>

              ${(intakeUrl || DROPB || SECURE || ONBOARD) ? `
              <div style="margin-top:10px;padding:10px 12px;background:#f8fafc;border:1px solid ${COLORS.border};border-radius:10px">
                <div style="font:12px/1.5 Inter,Arial,sans-serif;color:${COLORS.muted}">
                  Plain links:
                  ${intakeUrl ? `<br>${intakeUrl}` : ''}
                  ${DROPB ? `<br>${DROPB}` : ''}
                  ${SECURE ? `<br>${SECURE}` : ''}
                  ${ONBOARD ? `<br>${ONBOARD}` : ''}
                </div>
              </div>` : ''}

              <p style="margin:16px 0 0;font:12px/1.6 Inter,Arial,sans-serif;color:${COLORS.muted}">
                Security: never email passwords. Use the “Share credentials securely” button above (Bitwarden Send).
              </p>
              <p style="margin:16px 0 0;font:14px/1.6 Inter,Arial,sans-serif;color:${COLORS.text}">— Keyturn Studio</p>
            </div>
          </td></tr>
          <tr><td style="text-align:center;color:#cdd6ea;font:12px Inter,Arial,sans-serif;padding-top:12px">
            © ${new Date().getFullYear()} Keyturn Studio
          </td></tr>
        </table>
      </div>
    `;

    // Send (Resend first, then SendGrid fallback)
    const used = await sendViaResend(FROM, TO, subject, htmlAdmin, email, htmlClient)
              || await sendViaSendGrid(FROM, TO, subject, htmlAdmin, email, htmlClient);

    if (!used) {
      return res.status(500).json({ ok: false, error: 'Email provider not configured. Set RESEND_API_KEY or SENDGRID_API_KEY.' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
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

  const r1 = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo ? [replyTo] : undefined, subject, html: htmlAdmin })
  });
  if (!r1.ok) throw new Error(`Resend admin error: ${await r1.text()}`);

  if (replyTo) {
    const r2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [replyTo], subject: 'Thanks — we’ve received your Quick Start', html: htmlClient })
    });
    if (!r2.ok) throw new Error(`Resend client error: ${await r2.text()}`);
  }
  return true;
}

async function sendViaSendGrid(from, to, subject, htmlAdmin, replyTo, htmlClient){
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return false;

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

  if (replyTo) {
    const r2 = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: replyTo }], subject: 'Thanks — we’ve received your Quick Start' }],
        from: { email: extractEmail(from) },
        content: [{ type: 'text/html', value: htmlClient }]
      })
    });
    if (r2.status >= 400) throw new Error(`SendGrid client error: ${await r2.text()}`);
  }
  return true;
}
function extractEmail(v){ return String(v || '').replace(/^.*<|>$/g, '') || v; }
