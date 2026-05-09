"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const principles = [
  {
    tag: "01",
    name: "Ownership over permission",
    desc: "Everyone at D8 owns something real. Not a ticket queue — a problem. You define the approach, you make it work, you see it deployed. If you need someone to tell you what to do next, this isn't the place.",
  },
  {
    tag: "02",
    name: "Depth over breadth",
    desc: "We go as deep as the problem requires. We don't stop at 'working' — we stop at 'correct, robust, and fast'. Curiosity isn't a nice-to-have, it's the job.",
  },
  {
    tag: "03",
    name: "No handoffs",
    desc: "Hardware talks to firmware. Firmware talks to the cloud. The cloud talks to the UI. You'll understand the full stack, even the parts that aren't yours. That's how you build things that actually work.",
  },
  {
    tag: "04",
    name: "Credentials optional. Mediocrity isn't.",
    desc: "We don't care about degrees or years of experience. Self-taught, still in school, switching fields — all welcome. We care about how you think, how you learn, and how you handle being wrong. Someone who ships beats someone who coasts, every time.",
  },
];

const areas = [
  "Embedded & Firmware",
  "Full-Stack Development",
  "ML & AI",
  "Hardware / PCB Design",
  "R&D / Prototyping",
  "Other",
];

type FormValues = {
  name: string;
  email: string;
  area: string;
  intro: string;
  link: string;
};

export function CareersContent() {
  const shouldReduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const headerFade: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  };

  const headerItem: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" as const },
    },
  };

  async function onSubmit(data: FormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Page header */}
      <section className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={headerFade}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.span
              variants={headerItem}
              className="font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              Careers
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-5xl"
            >
              We&apos;re building hard things.
              <br />
              We want people who want that.
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="max-w-2xl font-body text-base leading-relaxed text-d8-text-secondary"
            >
              D8 is a small team with a wide scope — hardware, software, AI, and the
              R&D that connects them. We don&apos;t have career ladders or quarterly OKRs.
              We have problems that need solving and the autonomy to solve them.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-d8-border bg-d8-surface px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-d8-text-dim">
            How we work
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-d8-border border-y border-d8-border"
          >
            {principles.map(({ tag, name, desc }) => (
              <motion.div
                key={tag}
                variants={itemVariants}
                className="group -mx-4 grid cursor-default grid-cols-[3rem_1fr] gap-x-6 gap-y-3 px-4 py-8 transition-colors duration-200 hover:bg-d8-bg md:-mx-6 md:grid-cols-[3rem_2fr_3fr] md:items-start md:gap-x-14 md:gap-y-0 md:px-6"
              >
                <span className="mt-[0.25rem] font-mono text-sm font-semibold text-d8-purple-light md:mt-[0.45rem]">
                  {tag}
                </span>
                <h2 className="font-heading text-lg font-semibold leading-tight tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-xl">
                  {name}
                </h2>
                <p className="col-span-2 pl-[4.5rem] font-body text-sm leading-relaxed text-d8-text-secondary md:col-auto md:pl-0">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application form */}
      <section className="border-t border-d8-border px-6 pb-32 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
            {/* Left: context */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-widest text-d8-text-dim">
                Get in touch
              </p>
              <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-d8-text-primary">
                No open roles right now. There&apos;s always a problem worth solving. Tell us about yourself.
              </h2>
              <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                We hire when we find the right person, not when a slot opens.
                If you build things and want harder problems, send us a note.
                We read everything.
              </p>
              <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                Students and recent grads: especially welcome. Show us something
                you&apos;ve made — even if it&apos;s rough.
              </p>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    placeholder="Your name"
                    {...register("name", { required: true })}
                    className={`rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                      errors.name ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                    }`}
                  />
                  {errors.name && <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    placeholder="you@example.com"
                    {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    className={`rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                      errors.email ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                    }`}
                  />
                  {errors.email && <p role="alert" className="font-mono text-[11px] text-red-400">{errors.email.type === "pattern" ? "Valid email required" : "Required"}</p>}
                </div>
              </div>

              {/* Area */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="area" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                  What you do
                </label>
                <div className="relative">
                  <select
                    id="area"
                    aria-required="true"
                    {...register("area", { required: true })}
                    className={`w-full appearance-none rounded-sm border bg-d8-surface px-4 py-3 pr-10 font-body text-sm text-d8-text-primary focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                      errors.area ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                    }`}
                  >
                    <option value="" className="text-d8-text-dim">Select an area</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-d8-text-dim"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {errors.area && (
                  <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>
                )}
              </div>

              {/* Intro */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="intro" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                  Brief intro
                </label>
                <textarea
                  id="intro"
                  rows={4}
                  aria-required="true"
                  placeholder="Tell us what you're working on, what problems interest you, and what you'd want to build at D8."
                  {...register("intro", { required: true, minLength: 20 })}
                  className={`resize-none rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm leading-relaxed text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                    errors.intro ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                  }`}
                />
                {errors.intro && <p role="alert" className="font-mono text-[11px] text-red-400">{errors.intro.type === "minLength" ? "At least 20 characters" : "Required"}</p>}
              </div>

              {/* Link */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="link" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                  Link to your work{" "}
                  <span className="normal-case tracking-normal text-d8-text-dim opacity-60">— optional</span>
                </label>
                <input
                  id="link"
                  type="url"
                  placeholder="GitHub, LinkedIn, portfolio, anything"
                  {...register("link")}
                  className="rounded-sm border border-d8-border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:border-d8-purple focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="rounded-sm bg-d8-purple px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
                </button>

                {status === "sent" && (
                  <p role="status" className="font-body text-sm text-d8-purple-light">
                    Got it. We&apos;ll be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="font-body text-sm text-red-400">
                    Something went wrong. Email us directly at contacto@d8tec.com.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
