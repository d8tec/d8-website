import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ContactContent } from "@/components/ContactContent";
import { Footer } from "@/components/Footer";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return {
    title: locale === "es" ? "Contacto — D8" : "Contact — D8",
    description:
      locale === "es"
        ? "Contáctanos por email, teléfono o redes sociales. Respondemos en un día hábil."
        : "Contact D8 by email, phone, or social media. We respond within one business day.",
  };
}

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
