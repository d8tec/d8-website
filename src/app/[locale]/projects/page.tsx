import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ProjectsContent } from "@/components/ProjectsContent";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return {
    title: locale === "es" ? "Proyectos — D8" : "Projects — D8",
    description:
      locale === "es"
        ? "Cinco proyectos reales: cómo D8 investiga, modela, diseña y prototipa soluciones en hardware, software e IA."
        : "Five real projects: how D8 researches, models, designs, and prototypes solutions across hardware, software, and AI.",
  };
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ProjectsContent />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
