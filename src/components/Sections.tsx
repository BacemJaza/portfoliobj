import { FileText, Sparkles, Code2, GraduationCap, Briefcase, Trophy, Heart, ArrowUpRight } from "lucide-react";
import {
  about,
  accomplishments,
  education,
  experiences,
  mySpace,
  profile,
  projects,
  socials,
  technologies,
} from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./SocialIcon";

const highlightIcons = {
  code: Code2,
  "graduation-cap": GraduationCap,
} as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary-glow" />
              Available for new opportunities
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              {profile.tagline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gradient">
                {profile.tagline.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              {profile.intro}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-sm text-muted-foreground/80 max-w-lg italic">
              {profile.status}
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4" /> View Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover-lift font-medium"
              >
                See my work <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-8 flex lg:hidden items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center w-10 h-10 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SocialIcon name={s.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 animate-[float_6s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-soft blur-2xl" />
            <div className="relative w-full h-full rounded-[2.5rem] glass shadow-elegant grid place-items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-soft opacity-60" />
              <span className="relative text-7xl sm:text-8xl font-bold text-gradient">
                {profile.avatarInitials}
              </span>
            </div>
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-2xl bg-gradient-primary blur-xl opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-primary-glow/40 blur-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="About" title={about.heading} />
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {about.bio}
          </p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {about.highlights.map((h, i) => {
            const Icon = highlightIcons[h.icon as keyof typeof highlightIcons] ?? Code2;
            return (
              <Reveal key={h.title} delay={i * 100}>
                <div className="glass rounded-2xl p-6 hover-lift h-full">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EducationExperience() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid md:grid-cols-2 gap-12">
        <div>
          <Reveal>
            <SectionHeading eyebrow="Journey" title="Education" icon={GraduationCap} />
          </Reveal>
          <ul className="mt-8 space-y-5">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 100}>
                <li className="glass rounded-2xl p-5 hover-lift">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold">{e.degree}</h3>
                    <span className="text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary-glow hover:underline"
                  >
                    @{e.school}
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal>
            <SectionHeading eyebrow="Career" title="Experience" icon={Briefcase} />
          </Reveal>
          <ul className="mt-8 space-y-5">
            {experiences.map((x, i) => (
              <Reveal key={x.company} delay={i * 100}>
                <li className="glass rounded-2xl p-5 hover-lift">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold">{x.role}</h3>
                    <span className="text-xs text-muted-foreground">{x.period}</span>
                  </div>
                  <p className="text-sm text-primary-glow">
                    {x.company} · {x.location}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Work" title="Projects" />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group block glass rounded-2xl p-6 hover-lift h-full"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold group-hover:text-gradient transition-colors">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-glow group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs bg-accent/60 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Technologies() {
  return (
    <section id="technologies" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Stack" title="Technologies" />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-3">
            {technologies.map((t, i) => (
              <span
                key={t.name}
                style={{ animationDelay: `${i * 40}ms` }}
                className="px-4 py-2 rounded-full glass hover-lift text-sm animate-[fade-in-up_0.6s_ease-out_both]"
              >
                <span className="text-foreground font-medium">{t.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{t.category}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Accomplishments() {
  return (
    <section id="accomplishments" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Wins" title="Accomplishments" icon={Trophy} />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {accomplishments.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <div className="glass rounded-2xl p-6 hover-lift h-full">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <p className="text-sm text-primary-glow">{a.issuer}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MySpace() {
  return (
    <section id="myspace" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Personal" title={mySpace.heading} icon={Heart} />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 glass rounded-3xl p-8 sm:p-10 max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {mySpace.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {mySpace.items.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-gradient-soft text-sm"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Crafted with care.
        </p>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid place-items-center w-9 h-9 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
            >
              <SocialIcon name={s.icon} className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.2em] text-primary-glow">{eyebrow}</span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
        {Icon && <Icon className="w-7 h-7 text-primary" />}
        {title}
      </h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-primary" />
    </div>
  );
}
