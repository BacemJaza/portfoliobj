import { verifyAdminPassword } from './_supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { password } = req.body ?? {}
    if (typeof password !== 'string' || !password) return res.status(400).json({ error: 'password required' })
    return res.json({ ok: verifyAdminPassword(password) })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
