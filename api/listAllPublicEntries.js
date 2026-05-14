import { getAdminClient } from './_supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const supabase = getAdminClient()
    const { data, error } = await supabase.from('content').select('*').order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data ?? [])
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
