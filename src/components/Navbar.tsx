import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { navLinks, profile } from "@/content/portfolio";

function NavItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const cls =
    "relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent/50";
  if (href.startsWith("/")) {
    return (
      <Link to={href} onClick={onClick} className={cls}>
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
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shadow-glow">
              {profile.avatarInitials}
            </span>
            <span className="font-semibold tracking-tight">Portfolio</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavItem href={l.href} label={l.label} />
              </li>
            ))}
          </ul>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:opacity-90 transition-opacity"
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
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-3 animate-[fade-in_0.2s_ease-out]">
            <ul className="flex flex-col">
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
                  className="block mt-1 text-center px-4 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium"
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
