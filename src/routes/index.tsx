import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { SocialRail } from "@/components/SocialRail";
import {
  About,
  Accomplishments,
  EducationExperience,
  Footer,
  Hero,
  Projects,
  Technologies,
} from "@/components/Sections";
import { MySpacePreview } from "@/components/MySpacePreview";
import { profile } from "@/content/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${profile.name} — Portfolio` },
      {
        name: "description",
        content: `${profile.role}. ${profile.intro}`,
      },
      { property: "og:title", content: `${profile.name} — Portfolio` },
      { property: "og:description", content: profile.intro },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-x-clip">
      <Navbar />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <EducationExperience />
        <Projects />
        <Technologies />
        <Accomplishments />
        <MySpacePreview />
      </main>
      <Footer />
    </div>
  );
}
