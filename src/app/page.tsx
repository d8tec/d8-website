import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
