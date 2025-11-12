// File: /api/quickstart.js — Vercel Serverless Function
// Sends you a notification email (via Resend or SendGrid) and a client confirmation email
// that includes Full Intake + Upload links.

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
      company = '', // honeypot
      pagePath = '',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      timezone = '',
      userAgent = '',
      referrer = ''
    } = body || {};

    if (company) return res.status(200).json({ ok: true }); // bot ignored

    // basic validation
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!propertyName || !websiteUrl || !contactName || !isEmail(email) || !bookingSystem || !goal || !launchTiming) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // ENV
    const TO    = process.env.RESEND_NOTIFICATIONS || process.env.QS_TO_EMAIL || 'vinnie@keyturn.studio';
    const FROM  = process.env.RESEND_FROM || process.env.QS_FROM_EMAIL || 'Keyturn Studio <hello@updates.keyturn.studio>';
    const TALLY = process.env.TALLY_FULL_INTAKE || '';
    const DROPB = process.env.DROPBOX_REQUEST || '';

    const subject = `Quick Start — ${propertyName}`;
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
      <hr style="margin:16px 0;border:0;border-top:1px solid #eee">
      <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#777">
        Meta — page: ${escapeHtml(pagePath)} | utm: ${escapeHtml(utm_source)}/${escapeHtml(utm_medium)}/${escapeHtml(utm_campaign)} |
        tz: ${escapeHtml(timezone)} | referrer: ${escapeHtml(referrer)} | UA: ${escapeHtml(userAgent)}
      </p>
      ${(TALLY || DROPB) ? `
        <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#777">
          Links: ${TALLY ? `Full intake: <a href="${TALLY}">${TALLY}</a>` : ''}${TALLY && DROPB ? ' · ' : ''}${DROPB ? `Uploads: <a href="${DROPB}">${DROPB}</a>` : ''}
        </p>` : ''
      }
    `;

    // client confirmation email (with buttons)
    const btn = (href, label) =>
      `<a href="${href}" target="_blank" style="display:inline-block;padding:10px 14px;border-radius:8px;background:#4f7cff;color:#fff;text-decoration:none;font-weight:600">${label}</a>`;

    const htmlClient = `
      <div style="font:14px/1.6 Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1220">
        <p>Hi ${escapeHtml(contactName)},</p>
        <p>Thanks for sending your details — we’ll review and follow up shortly.</p>

        <p><strong>Next steps:</strong></p>
        <ol>
          ${TALLY ? `<li>Complete the full intake (5–10 min): ${btn(TALLY,'Open full intake')}</li>` : ''}
          ${DROPB ? `<li>Upload brand assets (logos, menus, photos): ${btn(DROPB,'Upload assets')}</li>` : ''}
          <li>Book your kickoff call in Step 3 on the onboarding page (or reply with times that work).</li>
        </ol>

        ${TALLY || DROPB ? `
        <p style="margin-top:16px;font-size:12px;color:#6b7280">
          Plain links: ${TALLY ? `<br>${TALLY}` : ''}${DROPB ? `<br>${DROPB}` : ''}
        </p>` : ''}

        <hr style="border:none;border-top:1px solid #e5eaf2;margin:16px 0">
        <p style="font-size:12px;color:#6b7280">Security: never email passwords. We’ll request DNS access via a secure method (see Step 2 on the onboarding page).</p>
        <p>— Keyturn Studio</p>
      </div>
    `;

    // Prefer Resend; fallback to SendGrid
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

// ---------- helpers ----------
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

// --- Email providers ---
async function sendViaResend(from, to, subject, htmlAdmin, replyTo, htmlClient){
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  // admin notification
  const r1 = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo ? [replyTo] : undefined,
      subject,
      html: htmlAdmin
    })
  });
  if (!r1.ok) throw new Error(`Resend admin error: ${await r1.text()}`);

  // client confirmation
  if (replyTo) {
    const r2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [replyTo],
        subject: 'Thanks — we’ve received your Quick Start',
        html: htmlClient
      })
    });
    if (!r2.ok) throw new Error(`Resend client error: ${await r2.text()}`);
  }
  return true;
}

async function sendViaSendGrid(from, to, subject, htmlAdmin, replyTo, htmlClient){
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return false;

  // admin notification
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

  // client confirmation
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
