import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Heart, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { CATEGORIES, type Category, type ContentEntry } from "@/lib/myspaceClient";
import { listLatestPublished } from "@/server/myspace.functions";

type Filter = "All" | Category;

const LATEST_LIMIT = 6;

export function MySpacePreview() {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const rows = await listLatestPublished({ data: { limit: LATEST_LIMIT } });
        if (cancelled) return;
        setEntries(rows as ContentEntry[]);
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        toast.error("Couldn't load latest entries", { description: msg });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
      });
  }, [entries, query, filter]);

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
                <Heart className="w-7 h-7 text-primary" /> From My Space
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-primary" />
              <p className="mt-4 text-muted-foreground max-w-xl">
                The latest things that moved me — books, films, videos, lectures, and stray
                thoughts.
              </p>
            </div>
            <Link
              to="/mySpace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:scale-[1.02] transition"
            >
              Explore My Space <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search latest entries…"
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
            <div className="glass rounded-2xl p-6 text-sm text-destructive">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">
                {entries.length === 0
                  ? "Nothing here yet, Come back tommorow"
                  : "No latest entries match your filter."}
              </p>
              <Link
                to="/mySpace"
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary-glow hover:text-primary"
              >
                Open My Space <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
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
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-4">
                        {e.statement}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/mySpace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover-lift text-sm font-medium"
          >
            See everything in My Space <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
