import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Lock,
  ExternalLink,
  Heart,
  Loader2,
} from "lucide-react";
import { Reveal } from "./Reveal";
import {
  ADMIN_PASSWORD,
  CATEGORIES,
  supabaseAdmin,
  supabasePublic,
  type Category,
  type ContentEntry,
} from "@/lib/myspaceClient";

type Filter = "All" | Category;

const emptyDraft = {
  title: "",
  category: "Thoughts" as Category,
  statement: "",
  url: "",
  thumbnail: "",
  author: "",
  tags: "",
  featured: false,
  published: true,
};

export function MySpaceCuration() {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState("");

  const [editing, setEditing] = useState<ContentEntry | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    void load();
  }, [isAdmin]);

  async function load() {
    setLoading(true);
    setError(null);
    const client = isAdmin ? supabaseAdmin : supabasePublic;
    let q = client.from("content").select("*").order("created_at", { ascending: false });
    if (!isAdmin) q = q.eq("published", true);
    const { data, error } = await q;
    if (error) setError(error.message);
    else setEntries((data ?? []) as ContentEntry[]);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => filter === "All" || e.category === filter)
      .filter((e) => {
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.statement.toLowerCase().includes(q) ||
          (e.author ?? "").toLowerCase().includes(q) ||
          (e.tags ?? []).some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [entries, query, filter]);

  function tryLogin() {
    if (pwd === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setPwd("");
      setPwdError("");
    } else {
      setPwdError("Incorrect password");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabaseAdmin.from("content").delete().eq("id", id);
    if (error) alert(error.message);
    else setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  async function toggleFeatured(e: ContentEntry) {
    const { error } = await supabaseAdmin
      .from("content")
      .update({ featured: !e.featured })
      .eq("id", e.id);
    if (error) alert(error.message);
    else
      setEntries((prev) =>
        prev.map((p) => (p.id === e.id ? { ...p, featured: !e.featured } : p)),
      );
  }

  return (
    <section id="myspace" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary-glow">
                Personal
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
                <Heart className="w-7 h-7 text-primary" /> My Space
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-primary" />
              <p className="mt-4 text-muted-foreground max-w-xl">
                A living shelf of thoughts, books, films, videos, and lectures that move me —
                each with my take on why.
              </p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary-glow">
                  Admin mode
                </span>
                <button
                  onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:scale-[1.02] transition"
                >
                  <Plus className="w-4 h-4" /> New entry
                </button>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles, statements, tags…"
                className="w-full pl-11 pr-4 py-3 rounded-full glass bg-transparent outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", ...CATEGORIES] as Filter[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    filter === c
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "glass hover-lift text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </div>
          ) : error ? (
            <div className="glass rounded-2xl p-6 text-sm text-destructive">
              {error}
              <p className="mt-2 text-muted-foreground">
                Make sure the <code>content</code> table exists in your Supabase project.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground">No entries match.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i * 50, 300)}>
                  <article className="group glass rounded-2xl overflow-hidden hover-lift h-full flex flex-col">
                    {e.thumbnail && (
                      <div className="aspect-video overflow-hidden bg-gradient-soft">
                        <img
                          src={e.thumbnail}
                          alt={e.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-primary-glow">
                          {e.category}
                          {e.featured && " · ★"}
                          {!e.published && " · draft"}
                        </span>
                        {e.url && (
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{e.title}</h3>
                      {e.author && (
                        <p className="text-xs text-muted-foreground mt-0.5">by {e.author}</p>
                      )}
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                        {e.statement}
                      </p>
                      {e.tags && e.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {e.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full text-[10px] bg-accent/60 text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {isAdmin && (
                        <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
                          <button
                            onClick={() => toggleFeatured(e)}
                            className={`p-2 rounded-full glass hover-lift ${
                              e.featured ? "text-yellow-400" : "text-muted-foreground"
                            }`}
                            title="Toggle featured"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditing(e);
                              setShowForm(true);
                            }}
                            className="p-2 rounded-full glass hover-lift text-muted-foreground hover:text-foreground"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => remove(e.id)}
                            className="p-2 rounded-full glass hover-lift text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Discreet admin toggle */}
        <div className="mt-12 flex justify-end">
          {!isAdmin && (
            <button
              onClick={() => setShowLogin(true)}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3" /> Admin
            </button>
          )}
        </div>
      </div>

      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <h3 className="text-lg font-semibold">Admin access</h3>
          <p className="mt-1 text-sm text-muted-foreground">Enter password to manage entries.</p>
          <input
            type="password"
            autoFocus
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tryLogin()}
            className="mt-4 w-full px-4 py-3 rounded-xl glass bg-transparent outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Password"
          />
          {pwdError && <p className="mt-2 text-xs text-destructive">{pwdError}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={() => setShowLogin(false)}
              className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={tryLogin}
              className="px-5 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow"
            >
              Unlock
            </button>
          </div>
        </Modal>
      )}

      {showForm && isAdmin && (
        <EntryForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSaved={async () => {
            setShowForm(false);
            await load();
          }}
        />
      )}
    </section>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4 animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg glass rounded-3xl p-6 sm:p-8 shadow-elegant animate-[scale-in_0.25s_ease-out]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-accent/50 text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function EntryForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: ContentEntry | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState(
    initial
      ? {
          title: initial.title,
          category: initial.category as Category,
          statement: initial.statement,
          url: initial.url ?? "",
          thumbnail: initial.thumbnail ?? "",
          author: initial.author ?? "",
          tags: (initial.tags ?? []).join(", "),
          featured: initial.featured,
          published: initial.published,
        }
      : emptyDraft,
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setErr(null);
    const payload = {
      title: draft.title.trim(),
      category: draft.category,
      statement: draft.statement.trim(),
      url: draft.url.trim() || null,
      thumbnail: draft.thumbnail.trim() || null,
      author: draft.author.trim() || null,
      tags: draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: draft.featured,
      published: draft.published,
    };
    const { error } = initial
      ? await supabaseAdmin.from("content").update(payload).eq("id", initial.id)
      : await supabaseAdmin.from("content").insert(payload);
    setSaving(false);
    if (error) setErr(error.message);
    else onSaved();
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold">{initial ? "Edit entry" : "New entry"}</h3>
      <div className="mt-5 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
        <Field label="Title">
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Category">
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-background">
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Your statement">
          <textarea
            value={draft.statement}
            onChange={(e) => setDraft({ ...draft, statement: e.target.value })}
            rows={4}
            className={inputCls}
          />
        </Field>
        <Field label="Author / creator (optional)">
          <input
            value={draft.author}
            onChange={(e) => setDraft({ ...draft, author: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="URL (optional)">
          <input
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Thumbnail URL (optional)">
          <input
            value={draft.thumbnail}
            onChange={(e) => setDraft({ ...draft, thumbnail: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Tags (comma separated)">
          <input
            value={draft.tags}
            onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
            className={inputCls}
            placeholder="philosophy, stoicism"
          />
        </Field>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
            />
            Published
          </label>
        </div>
        {err && <p className="text-xs text-destructive">{err}</p>}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={save}
          disabled={saving || !draft.title || !draft.statement}
          className="px-5 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow disabled:opacity-50 inline-flex items-center gap-2"
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {initial ? "Save" : "Create"}
        </button>
      </div>
    </Modal>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl glass bg-transparent outline-none focus:ring-2 focus:ring-primary/50 text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
