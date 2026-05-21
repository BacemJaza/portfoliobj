import { FileText, Sparkles, Code2, GraduationCap, Briefcase, Trophy, Heart, ArrowUpRight, Github, Video, ExternalLink, Award } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGit,
  SiFigma,
  SiPostman,
} from "react-icons/si";
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

const techIcons = {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGit,
  SiFigma,
  SiPostman,
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
          <Reveal delay={350}>
            <div className="mt-6 flex flex-wrap gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover-lift text-sm font-medium transition-colors"
                >
                  <SocialIcon name={s.icon} className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </div>
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
          <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 animate-float">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-soft blur-2xl" />
            <div className="relative w-full h-full rounded-[2.5rem] glass shadow-elegant grid place-items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-soft opacity-60" />
              <span className="relative text-7xl sm:text-8xl font-bold text-gradient">
                <img
                src={profile.avatarUrl}
                alt={`${profile.name} avatar`}
                className="w-full h-full object-cover rounded-full"
              />
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
    <section id="about" className="py-20 sm:py-24 scroll-mt-24">
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

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Career" title="Experience" icon={Briefcase} />
        </Reveal>
        <ul className="mt-8 space-y-5">
          {experiences.map((x, i) => (
            <Reveal key={x.company} delay={i * 100}>
              <li className="glass rounded-2xl p-5 hover-lift">
                <div className="flex items-start gap-4 flex-col sm:flex-row">
                  <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-muted/20 ring-1 ring-muted/30 overflow-hidden">
                    {x.logoUrl ? (
                      <img
                        src={x.logoUrl}
                        alt={`${x.company} logo`}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <span className="text-sm font-semibold uppercase text-muted-foreground">
                        {x.company
                          .split(/\s+/)
                          .filter(Boolean)
                          .map((part) => part[0] ?? "")
                          .join("")
                          .slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-3">
                      <h3 className="text-lg font-semibold">{x.role}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{x.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-primary-glow">
                      {x.company} · {x.location}
                    </p>
                  </div>
                </div>
                {x.stack ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {x.stack
                      .split(/[·,]/)
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-full text-xs bg-accent/60 text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                ) : null}
                <p className="mt-4 text-sm text-muted-foreground">{x.description}</p>
                  {(x.vidSrc || x.pdf || x.certificate) && (
                  <div className="mt-5 border-t border-border/50 pt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
                      Experience resources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {x.vidSrc && x.vidSrc !== "#" ? (
                        <a
                          href={x.vidSrc}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <Video className="w-4 h-4" />
                          Video
                        </a>
                      ) : null}
                      {x.pdf && x.pdf !== "#" ? (
                        <a
                          href={x.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Documentation
                        </a>
                      ) : null}
                      {x.certificate && x.certificate !== "#" ? (
                        <a
                          href={x.certificate}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <Award className="w-4 h-4" />
                          Certificate
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </li>

            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Journey" title="Education" icon={GraduationCap} />
        </Reveal>
        <ul className="mt-8 space-y-5">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 100}>
              <li className="glass rounded-2xl p-5 hover-lift">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-3">
                  <h3 className="text-lg font-semibold">{e.degree}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{e.period}</span>
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
                {(e.certificate) && (
                  <div className="mt-5 border-t border-border/50 pt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
                      Education resources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {e.certificate && e.certificate !== "#" ? (
                        <a
                          href={e.certificate}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <Award className="w-4 h-4" />
                          Certificate
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </li>
              
            </Reveal>
          ))}
        </ul>
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
              <div className="group block glass rounded-2xl p-6 hover-lift h-full">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold group-hover:text-gradient transition-colors">
                    {p.title}
                  </h3>
                  {p.href && p.href !== "#" ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary-glow uppercase tracking-[0.2em] font-medium"
                    >
                      Visit <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
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
                {(p.repo || p.vidSrc || p.pdf) && (
                  <div className="mt-5 border-t border-border/50 pt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
                      Project resources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.repo && p.repo !== "#" ? (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                      ) : null}
                      {p.vidSrc && p.vidSrc !== "#" ? (
                        <a
                          href={p.vidSrc}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <Video className="w-4 h-4" />
                          Video
                        </a>
                      ) : null}
                      {p.pdf && p.pdf !== "#" ? (
                        <a
                          href={p.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs font-medium hover:bg-accent/50 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          PDF
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
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
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {technologies.map((t, i) => {
              const IconComponent = techIcons[t.icon as keyof typeof techIcons];
              return (
                <span
                  key={t.name}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="px-4 py-2 rounded-full glass hover-lift text-sm animate-[fade-in-up_0.6s_ease-out_both] flex items-center gap-2"
                >
                  {IconComponent && <IconComponent className="w-4 h-4 text-primary-glow" />}
                  <span className="text-foreground font-medium">{t.name}</span>
                  <span className="ml-1 text-xs text-muted-foreground">{t.category}</span>
                </span>
              );
            })}
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
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-3">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{a.date}</span>
                </div>
                <p className="text-sm text-primary-glow">{a.issuer}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
                <div className="mt-6 relative">
                  <div className="relative w-full rounded-2xl shadow-elegant overflow-hidden border border-white/10">
                    <img
                      src={a.imageUrl || "/placeholder-accomplishment.png"}
                      alt={`${a.title} certificate`}
                      className="w-full h-auto object-cover aspect-square"
                    />
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-primary blur-xl opacity-50" />
                    <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-lg bg-primary-glow/30 blur-xl" />
                  </div>
                </div>
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
          <div className="mt-8 glass rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center">
              {mySpace.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
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
