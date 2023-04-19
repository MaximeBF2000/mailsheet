import { google } from 'googleapis'

const processSheetData = data => {
  const headers = data[0]
  const rows = data.slice(1).map(row => {
    return headers.reduce((acc, header, index) => {
      acc[header] = row[index] || null
      return acc
    }, {})
  })

  return { headers, rows }
}

const fetchSheetData = async (spreadsheetUrl, googleAuth) => {
  const sheets = google.sheets({ version: 'v4', auth: googleAuth })
  const match = spreadsheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  const spreadsheetId = match && match[1]

  if (!spreadsheetId) throw new Error('Invalid spreadsheet URL')

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A:Z'
  })

  return processSheetData(response.data.values)
}

export default async function handler(req, res) {
  const { spreadsheetUrl } = req.body

  const googleAuth = await google.auth.getClient({
    credentials: {
      client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  if (!spreadsheetUrl) {
    res.status(400).json({ error: 'spreadsheetUrl is required' })
    return
  }

  try {
    const data = await fetchSheetData(spreadsheetUrl, googleAuth)
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch sheet data' })
  }
}
