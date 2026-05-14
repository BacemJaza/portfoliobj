import { getAdminClient, verifyAdminPassword } from './_supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { password, entry } = req.body ?? {}
    if (!verifyAdminPassword(password)) return res.status(401).json({ error: 'Unauthorized' })
    const supabase = getAdminClient()
    const { data, error } = await supabase.from('content').insert(entry).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
