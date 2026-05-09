import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { CareersContent } from "@/components/CareersContent";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers — D8",
  description:
    "D8 is hiring across hardware, software, and AI. We want people who build things and want harder problems.",
};

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CareersContent />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
