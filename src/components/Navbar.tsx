import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { navLinks, profile } from "@/content/portfolio";

function NavItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const cls =
    "relative inline-flex items-center px-4 py-2 text-sm text-muted-foreground bg-background/80 border border-border/60 rounded-full shadow-sm transition duration-200 hover:bg-accent/30 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  if (href.startsWith("/") || href.startsWith("#")) {
    const to = href.startsWith("#") ? `/${href}` : href;
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={cls}>
      {label}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        <nav
          className={`flex w-full flex-wrap items-center justify-between gap-2 rounded-full px-4 py-3 transition-all duration-500 sm:px-5 ${
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex min-w-0 flex-shrink-0 items-center gap-2 group">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shadow-glow overflow-hidden">
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} avatar`}
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            <span className="truncate font-semibold tracking-tight">Portfolio</span>
          </Link>

          <ul className="hidden lg:flex flex-wrap items-center gap-2 lg:gap-3 xl:gap-4 min-w-0">
            {navLinks.map((l) => (
              <li key={l.href} className="min-w-0">
                <NavItem href={l.href} label={l.label} />
              </li>
            ))}
          </ul>

          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex shrink-0 items-center justify-center px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-sm transition duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Resume
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 rounded-full hover:bg-accent/50 transition-colors"
            >
              <span className="block w-5 h-0.5 bg-foreground mb-1.5" />
              <span className="block w-5 h-0.5 bg-foreground mb-1.5" />
              <span className="block w-5 h-0.5 bg-foreground" />
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-3 shadow-xl animate-[fade-in_0.2s_ease-out]">
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <NavItem href={l.href} label={l.label} onClick={() => setOpen(false)} />
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-1 text-center px-4 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-sm transition duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
