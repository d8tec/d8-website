import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { ServicesMarquee, ProcessMarquee, TechMarquee } from "@/components/Marquee";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <ServicesMarquee />
        <ProcessMarquee />
        <ContactCTA />
        <TechMarquee />
      </main>
      <Footer />
    </>
  );
}
