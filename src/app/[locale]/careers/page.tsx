import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { CareersContent } from "@/components/CareersContent";
import { Footer } from "@/components/Footer";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return {
    title: locale === "es" ? "Únete — D8" : "Careers — D8",
    description:
      locale === "es"
        ? "D8 busca personas que quieran problemas difíciles. Sin escaleras corporativas, solo problemas reales y autonomía para resolverlos."
        : "D8 is looking for people who want hard problems. No career ladders, just real problems and the autonomy to solve them.",
  };
}

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CareersContent />
      </main>
      <Footer />
    </>
  );
}
