"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type FormValues = {
  name: string;
  email: string;
  area: string;
  intro: string;
  link: string;
};

type Principle = { tag: string; name: string; desc: string };

export function CareersContent() {
  const t = useTranslations("careers");
  const tForm = useTranslations("careers.form");
  const principles = t.raw("principles") as Principle[];
  const areas = tForm.raw("areas") as string[];

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
              {t("overline")}
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-5xl"
            >
              {t("heading1")}
              <br />
              {t("heading2")}
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="max-w-2xl font-body text-base leading-relaxed text-d8-text-secondary"
            >
              {t("body")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-d8-border bg-d8-surface px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-d8-text-dim">
            {t("howWeWork")}
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
                {tForm("overline")}
              </p>
              <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-d8-text-primary">
                {tForm("heading")}
              </h2>
              <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                {tForm("body1")}
              </p>
              <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                {tForm("body2")}
              </p>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                    {tForm("fields.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    placeholder={tForm("fields.namePlaceholder")}
                    {...register("name", { required: true })}
                    className={`rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                      errors.name ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                    }`}
                  />
                  {errors.name && <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                    {tForm("fields.email")}
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
                  {errors.email && (
                    <p role="alert" className="font-mono text-[11px] text-red-400">
                      {errors.email.type === "pattern" ? "Valid email required" : "Required"}
                    </p>
                  )}
                </div>
              </div>

              {/* Area */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="area" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                  {tForm("fields.area")}
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
                    <option value="" className="text-d8-text-dim">
                      {tForm("fields.areaPlaceholder")}
                    </option>
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
                  {tForm("fields.intro")}
                </label>
                <textarea
                  id="intro"
                  rows={4}
                  aria-required="true"
                  placeholder={tForm("fields.introPlaceholder")}
                  {...register("intro", { required: true, minLength: 20 })}
                  className={`resize-none rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm leading-relaxed text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                    errors.intro ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                  }`}
                />
                {errors.intro && (
                  <p role="alert" className="font-mono text-[11px] text-red-400">
                    {errors.intro.type === "minLength" ? "At least 20 characters" : "Required"}
                  </p>
                )}
              </div>

              {/* Link */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="link" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                  {tForm("fields.link")}{" "}
                  <span className="normal-case tracking-normal text-d8-text-dim opacity-60">
                    {tForm("fields.linkOptional")}
                  </span>
                </label>
                <input
                  id="link"
                  type="url"
                  placeholder={tForm("fields.linkPlaceholder")}
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
                  {status === "sending"
                    ? tForm("sending")
                    : status === "sent"
                    ? tForm("sent")
                    : tForm("submit")}
                </button>

                {status === "sent" && (
                  <p role="status" className="font-body text-sm text-d8-purple-light">
                    {tForm("successMsg")}
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="font-body text-sm text-red-400">
                    {tForm("errorMsg")}
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
