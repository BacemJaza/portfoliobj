# Plan

## 1. Fix the submission bug

**Root cause** (confirmed from the network log):
```
new row for relation "content" violates check constraint "content_category_check"
```
The Supabase `content` table was created with a `CHECK` constraint on `category` that does not include the app's values (`Thoughts`, `Books`, `Movies`, `Videos`, `Lectures`). The form data, validation, and server function are all fine — the database itself is rejecting the row.

**Fix**:
- Add a migration that drops the existing `content_category_check` and re-adds it with the canonical 5 values:
  ```sql
  alter table public.content drop constraint if exists content_category_check;
  alter table public.content add constraint content_category_check
    check (category in ('Thoughts','Books','Movies','Videos','Lectures'));
  ```
- Make sure RLS is enabled with a public read policy for `published = true` (needed for the landing-page "latest" preview to show without admin auth). Writes stay server-only via the service role.

**Make errors visible**:
- In `MySpaceCuration` / new `EntryForm`, replace the silent `setErr` with a visible inline alert at the top of the form (red glass panel, dismiss-on-edit) plus a `toast.error(...)` using the existing Sonner `Toaster`.
- Same treatment for delete / toggle-featured (currently `alert(...)` — swap to toasts).
- On the landing-page list fetch, show the actual Supabase error message instead of the generic "make sure the table exists" hint.

## 2. Restructure pages

### New `/mySpace` route
Create `src/routes/mySpace.tsx` with its own `head()` metadata (title, description, og tags). It renders the full curation experience that lives in `MySpaceCuration` today: header, search, category filters, full grid, admin login, create/edit/delete, featured toggle.

The existing `MySpaceCuration` component moves wholesale into this route (kept as a component so the page file stays thin). The discreet "Admin" lock button stays on this page only.

### Slimmed-down landing page (`/`)
Replace the current `<MySpaceCuration />` mount in `src/routes/index.tsx` with a new lightweight component `MySpacePreview`:
- Section header "From My Space" with a short blurb.
- Search input + category filter chips (All + 5 categories).
- "Latest updates" grid showing the **6 most recent published** entries (fetched via `supabasePublic` with `.eq('published', true).order('created_at', { ascending: false }).limit(6)`).
- Search/filter operates only over those latest entries (purely client-side narrowing of what's shown).
- Prominent CTA button: `Explore My Space →` linking to `/mySpace` via TanStack `<Link to="/mySpace">`.
- No admin controls, no create form, no edit/delete on the landing page.

### Navigation
Add a "My Space" link to the navbar pointing at `/mySpace` (replacing the current `#myspace` hash anchor in `src/content/portfolio.ts`). Other in-page anchors stay as hashes since they're true on-page sections.

## Files

- **migration** (new): drops & recreates `content_category_check`; ensures RLS + public-read policy for `published = true`.
- **src/routes/mySpace.tsx** (new): route with `head()` + renders `<MySpaceCuration />`.
- **src/components/MySpaceCuration.tsx** (edit): swap `alert()` → toast, surface real errors inline in the form, keep behavior otherwise identical.
- **src/components/MySpacePreview.tsx** (new): light landing-page version (search + filters + latest 6 + CTA to `/mySpace`).
- **src/routes/index.tsx** (edit): replace `<MySpaceCuration />` with `<MySpacePreview />`.
- **src/content/portfolio.ts** (edit): change the My Space nav entry from `#myspace` to `/mySpace`.
- **src/components/Navbar.tsx** (edit): render `/`-prefixed nav items as `<Link to=...>` instead of `<a href="#...">` so SPA navigation works.

## Out of scope
- No schema changes beyond the constraint + RLS read policy.
- Admin password flow, server functions, and Supabase clients stay as-is.
