// ============================================================================
//  PORTFOLIO CONTENT — edit this file to update the site.
//  Everything that changes over time (experiences, education, projects,
//  technologies, accomplishments, social links) lives here.
// ============================================================================

export const profile = {
  name: "Your Name",
  role: "Web Developer & CS Student",
  tagline: "Welcome to my digital home!",
  intro:
    "This is where my passions and talents converge. I'm excited to give you a glimpse into my creative world.",
  status:
    "🎓 Officially graduated! Ready for a new adventure and whatever's next ✨",
  resumeUrl: "/resume.pdf",
  email: "hello@example.com",
  avatarInitials: "YN",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/yourname", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourname", icon: "linkedin" },
  { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
] as const;

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Technologies", href: "#technologies" },
  { label: "Accomplishments", href: "#accomplishments" },
  { label: "MySpace", href: "#myspace" },
] as const;

export const about = {
  heading: "About Me",
  bio: "I'm a web developer and Computer Science student with a passion for creating awesome digital experiences. I love turning ideas into clean, functional, and delightful interfaces.",
  highlights: [
    {
      title: "Web Developer",
      description: "Self-taught developer with professional experience building modern web apps.",
      icon: "code",
    },
    {
      title: "Engineering Student",
      description: "Software engineering student focused on full-stack development.",
      icon: "graduation-cap",
    },
  ],
};

export const education = [
  {
    school: "ESPRIT",
    degree: "Software Engineering",
    period: "2023 — Present",
    description: "Engineer to be.",
    url: "https://esprit.tn/",
  },
];

export const experiences = [
  {
    company: "MAON GmbH",
    role: "Web Developer Intern",
    period: "2024",
    location: "Germany",
    description:
      "Built and shipped features for production web apps. Learned a lot, grew a lot, and made great memories.",
  },
];

export const projects = [
  {
    title: "Project One",
    description: "A short description of what this project does and why it's cool.",
    tags: ["React", "TypeScript", "Tailwind"],
    href: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    description: "Another project showcasing your skills with a clear, concise summary.",
    tags: ["Next.js", "Node", "Postgres"],
    href: "#",
    repo: "#",
  },
  {
    title: "Project Three",
    description: "One more entry — replace these with your real work.",
    tags: ["Vue", "Firebase"],
    href: "#",
    repo: "#",
  },
];

export const technologies = [
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Figma", category: "Design" },
];

export const accomplishments = [
  {
    title: "Graduated Software Engineering",
    issuer: "ESPRIT",
    date: "2026",
    description: "Completed a degree in software engineering with a focus on web technologies.",
  },
  {
    title: "Internship at MAON GmbH",
    issuer: "Germany",
    date: "2024",
    description: "Successfully completed a development internship abroad.",
  },
];

export const mySpace = {
  heading: "MySpace",
  description:
    "A few things I love outside of code — replace this with hobbies, interests, or a personal note.",
  items: ["Reading", "Travel", "Coffee", "Music", "Open Source"],
};
