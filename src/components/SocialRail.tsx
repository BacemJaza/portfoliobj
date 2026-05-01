import { socials } from "@/content/portfolio";
import { SocialIcon } from "./SocialIcon";

export function SocialRail() {
  return (
    <aside className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="group grid place-items-center w-10 h-10 rounded-full glass hover-lift text-muted-foreground hover:text-foreground transition-colors"
        >
          <SocialIcon name={s.icon} className="w-4 h-4" />
        </a>
      ))}
    </aside>
  );
}
