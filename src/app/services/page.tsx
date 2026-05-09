import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us — D8",
  description:
    "D8 is a product engineering startup operating across R&D, hardware, software, and AI. One team, full stack, no handoffs.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Philosophy + who we are */}
        <section className="px-6 pt-40 pb-28 border-b border-d8-border">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <span className="font-mono text-xs uppercase tracking-widest text-d8-purple-light">
                About D8
              </span>
              <h1 className="mt-6 font-heading text-2xl font-semibold leading-snug tracking-tight text-d8-text-primary text-balance md:text-3xl lg:text-4xl">
                We don&apos;t reinvent the wheel. We combine the ones already
                spinning to move something that never could before.
              </h1>
              <div className="mt-10 flex flex-col gap-4 max-w-2xl">
                <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                  D8 is a product engineering startup. We scan industries where
                  existing solutions are fragmented, overpriced, or simply
                  missing — and we build what should exist. Our own products and
                  client work are held to the same standard: if it ships from
                  D8, it works.
                </p>
                <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                  We operate across R&D, hardware and embedded systems, web and
                  app development, and AI — in one team, without the handoffs or
                  coordination overhead of managing multiple vendors. Most
                  projects touch more than one domain. That&apos;s by design.
                </p>
                <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                  The name is the philosophy: D8 is Day 8. After the seven days
                  of creation, Day 8 is when humans start building on what
                  already exists — not reinventing, but synthesizing and
                  advancing. That&apos;s how we work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected work */}
        <Projects />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
