Required environment variables for Vercel deployment

- `MYSPACE_SUPABASE_URL` — your Supabase project URL (e.g. `https://xyz.supabase.co`)
- `MYSPACE_SUPABASE_SERVICE_ROLE` — Supabase service-role key (server-only secret)
- `MYSPACE_ADMIN_PASSWORD` — admin password used by the app for write operations

Notes:
- Add these in your Vercel Project Settings → Environment Variables.
- Keep the service role key and admin password secret — mark them as "Environment Variable" and set the appropriate scope (Preview/Production).
- The API routes under `/api/*` use these variables at runtime.
