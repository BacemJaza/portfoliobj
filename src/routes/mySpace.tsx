import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { SocialRail } from "@/components/SocialRail";
import { Footer } from "@/components/Sections";
import { MySpaceCuration } from "@/components/MySpaceCuration";
import { profile } from "@/content/portfolio";

export const Route = createFileRoute("/mySpace")({
  component: MySpacePage,
  head: () => ({
    meta: [
      { title: `My Space — ${profile.name}` },
      {
        name: "description",
        content:
          "A personal curation of news and fresh updates — each with my take on why they matter.",
      },
      { property: "og:title", content: `My Space — ${profile.name}` },
      {
        property: "og:description",
        content:
          "A personal curation of news and fresh updates — each with my take on why they matter.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function MySpacePage() {
  return (
    <div className="min-h-screen relative overflow-x-clip">
      <Navbar />
      <SocialRail />
      <main className="pt-24">
        <MySpaceCuration />
      </main>
      <Footer />
    </div>
  );
}
