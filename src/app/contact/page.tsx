import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ContactContent } from "@/components/ContactContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — D8",
  description:
    "Work with D8. We take on hard problems across hardware, software, and AI.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
