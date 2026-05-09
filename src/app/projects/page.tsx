import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ProjectsContent } from "@/components/ProjectsContent";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Industries — D8",
  description:
    "Six industries where D8 applies the full engineering cycle — from modeling to prototyping.",
};

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
