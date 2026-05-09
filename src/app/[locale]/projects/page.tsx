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
        ? "D8 opera en seis industrias con el ciclo completo de ingeniería: modelado, diseño, creación y prototipado."
        : "D8 operates across six industries with the full engineering cycle: model, design, create, prototype.",
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
