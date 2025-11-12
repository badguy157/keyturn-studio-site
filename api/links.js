// File: /api/links.js
export default async function handler(_req, res) {
    res.status(200).json({
      fullIntake: process.env.TALLY_FULL_INTAKE || '',
      upload: process.env.DROPBOX_REQUEST || 'https://www.dropbox.com/request/OOsRAkmpSTVmnnAX6jJg'
    });
  }
  