import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { AboutHeader } from "@/components/AboutHeader";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return {
    title: locale === "es" ? "Nosotros — D8" : "About Us — D8",
    description:
      locale === "es"
        ? "D8 es una startup de ingeniería de producto en R&D, hardware, software e IA. Un equipo, stack completo, sin transferencias."
        : "D8 is a product engineering startup operating across R&D, hardware, software, and AI. One team, full stack, no handoffs.",
  };
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <AboutHeader />
        <Projects />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
