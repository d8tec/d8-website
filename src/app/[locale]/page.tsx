import { Nav } from "@/components/Nav";
import { Hero, ServicePanels } from "@/components/Hero";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { ServicesMarquee } from "@/components/Marquee";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <ServicesMarquee />
        <ServicePanels />
        <ServicesMarquee />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
