// File: /api/links.js
export default async function handler(_req, res) {
    // Only return non-sensitive URLs meant to be public in emails/UI.
    res.status(200).json({
      fullIntake: process.env.TALLY_FULL_INTAKE || '',
      upload: process.env.DROPBOX_REQUEST || ''
    });
  }
  