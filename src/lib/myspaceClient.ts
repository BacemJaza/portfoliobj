import { createClient } from "@supabase/supabase-js";

const url =
  import.meta.env.VITE_MYSPACE_SUPABASE_URL ??
  import.meta.env.MYSPACE_SUPABASE_URL;
const anonKey =
  import.meta.env.VITE_MYSPACE_SUPABASE_ANON_KEY ??
  import.meta.env.MYSPACE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Set VITE_MYSPACE_SUPABASE_URL and VITE_MYSPACE_SUPABASE_ANON_KEY (see .env.example)",
  );
}

export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type ContentEntry = {
  id: string;
  title: string;
  category: string;
  statement: string;
  url: string | null;
  thumbnail: string | null;
  author: string | null;
  tags: string[] | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export const CATEGORIES = ["News"] as const;
export type Category = (typeof CATEGORIES)[number];
