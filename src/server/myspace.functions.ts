import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient, verifyAdminPassword } from "./myspace.server";

const CATEGORIES = ["Thoughts", "Books", "Movies", "Videos", "Lectures"] as const;

const entrySchema = z.object({
  title: z.string().trim().min(1).max(200),
  category: z.enum(CATEGORIES),
  statement: z.string().trim().min(1).max(4000),
  url: z.string().trim().max(2000).nullable().optional(),
  thumbnail: z.string().trim().max(2000).nullable().optional(),
  author: z.string().trim().max(200).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

const withAuth = <T extends z.ZodRawShape>(shape: T) =>
  z.object({ password: z.string().min(1).max(200), ...shape });

function assertAuth(password: string) {
  if (!verifyAdminPassword(password)) {
    throw new Error("Unauthorized");
  }
}

export const verifyPassword = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => ({ ok: verifyAdminPassword(data.password) }));

export const createEntry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => withAuth({ entry: entrySchema }).parse(d))
  .handler(async ({ data }) => {
    assertAuth(data.password);
    const { error, data: row } = await getAdminClient()
      .from("content")
      .insert(data.entry)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateEntry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    withAuth({ id: z.string().uuid(), entry: entrySchema.partial() }).parse(d),
  )
  .handler(async ({ data }) => {
    assertAuth(data.password);
    const { error, data: row } = await getAdminClient()
      .from("content")
      .update(data.entry)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteEntry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => withAuth({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    assertAuth(data.password);
    const { error } = await getAdminClient().from("content").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleFeatured = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    withAuth({ id: z.string().uuid(), featured: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    assertAuth(data.password);
    const { error } = await getAdminClient()
      .from("content")
      .update({ featured: data.featured })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Public listing of latest published entries — uses the admin client so it
// works regardless of RLS configuration.
export const listLatestPublished = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) =>
    z.object({ limit: z.number().int().min(1).max(50).optional() }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const { data: rows, error } = await getAdminClient()
      .from("content")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 6);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

// Admin-only listing (includes drafts).
export const listAllEntries = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    assertAuth(data.password);
    const { data: rows, error } = await getAdminClient()
      .from("content")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });
