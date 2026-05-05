import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sztlencyxggrlkihqzbf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dGxlbmN5eGdncmxraWhxemJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTI3NDYsImV4cCI6MjA5MzUyODc0Nn0.-eVKA-50pwxFtBPwHpN4ioaZmjLKiIxpAOjBONIWCyo";
const SUPABASE_SERVICE_ROLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dGxlbmN5eGdncmxraWhxemJmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk1Mjc0NiwiZXhwIjoyMDkzNTI4NzQ2fQ.iUVY7UCrWGz0z5FAwO9gLz73XT13RaGEoMTFOYzdfkg";

export const ADMIN_PASSWORD = "Jackdaw77!";

export const supabasePublic = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
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

export const CATEGORIES = ["Thoughts", "Books", "Movies", "Videos", "Lectures"] as const;
export type Category = (typeof CATEGORIES)[number];
