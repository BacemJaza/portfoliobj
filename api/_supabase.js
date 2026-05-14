import { createClient } from '@supabase/supabase-js'

export function getAdminClient() {
  const url = process.env.MYSPACE_SUPABASE_URL
  const key = process.env.MYSPACE_SUPABASE_SERVICE_ROLE
  if (!url || !key) {
    throw new Error('MYSPACE_SUPABASE_URL / MYSPACE_SUPABASE_SERVICE_ROLE not configured')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

export function verifyAdminPassword(input) {
  const expected = process.env.MYSPACE_ADMIN_PASSWORD
  if (!expected) throw new Error('MYSPACE_ADMIN_PASSWORD not configured')
  if (input.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}
