import nodemailer from 'nodemailer'

export default async function sendEmails(req, res) {
  if (req.method !== 'POST') return

  const { from, to } = req.body ?? {}
  const { name, email: fromEmail, password } = from ?? {}

  if (!name || !fromEmail || !password || !to)
    return res.status(400).json({ error: 'Some fields are missing.' })

  if (to.length < 1)
    return res.status(400).json({ error: 'No destination emails provided.' })

  const domain = fromEmail.split('@')[1]
  let emailSentCount = 0

  try {
    const transporter = nodemailer.createTransport({
      service: getEmailServiceFromDomain(domain),
      auth: { user: fromEmail, pass: password }
    })

    to.forEach(async toItem => {
      const { email: toEmail, subject, body } = toItem

      await transporter.sendMail({
        from: `${name} <${fromEmail}>`,
        to: toEmail,
        subject,
        text: body
      })

      emailSentCount++
    })

    return res.status(200).json({
      success: true,
      message: `Sent ${emailSentCount} emails successfully.`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error sending emails. Sent ${emailSentCount} emails before failing.`
    })
  }
}

function getEmailServiceFromDomain(domain) {
  const services = {
    'gmail.com': 'Gmail',
    'googlemail.com': 'Gmail',
    'yahoo.com': 'Yahoo',
    'ymail.com': 'Yahoo',
    'rocketmail.com': 'Yahoo',
    'aol.com': 'AOL',
    'outlook.com': 'Outlook',
    'hotmail.com': 'Outlook',
    'live.com': 'Outlook',
    'msn.com': 'Outlook',
    'icloud.com': 'iCloud',
    'me.com': 'iCloud',
    'mac.com': 'iCloud',
    'mail.com': 'Mail.com',
    'zoho.com': 'Zoho',
    'protonmail.com': 'ProtonMail',
    'fastmail.com': 'FastMail',
    'gmx.com': 'GMX',
    'yandex.com': 'Yandex'
  }

  return services[domain] || null
}
