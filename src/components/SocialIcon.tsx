import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Mail;
  return <Icon className={className} />;
}
