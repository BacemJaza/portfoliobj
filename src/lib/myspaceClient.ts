import { createClient } from "@supabase/supabase-js";

// Public anon client — safe to ship to the browser. Used for read-only fetches
// of published entries. RLS in Supabase enforces what's visible.
const SUPABASE_URL = "https://sztlencyxggrlkihqzbf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dGxlbmN5eGdncmxraWhxemJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTI3NDYsImV4cCI6MjA5MzUyODc0Nn0.-eVKA-50pwxFtBPwHpN4ioaZmjLKiIxpAOjBONIWCyo";

export const supabasePublic = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
