"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { sweepReveal, dropInStagger, dropIn, gradientBorderReveal, useCardTilt, useMagneticButton, arrowNudge } from "@/lib/animations";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const socials = [
  { name: "LinkedIn", handle: "@d8tec", href: "https://linkedin.com/company/d8tec" },
  { name: "Instagram", handle: "@d8tec", href: "https://instagram.com/d8tec" },
];

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rng = seededRng(42);
const STARS = Array.from({ length: 200 }, () => ({
  top:      `${(rng() * 90 + 5).toFixed(1)}%`,
  size:     Math.round(rng() * 4) + 1,
  opacity:  parseFloat((rng() * 0.2 + 0.8).toFixed(2)),
  duration: parseFloat((rng() * 25 + 12).toFixed(1)),
  phase:    parseFloat(rng().toFixed(3)),
  color:    rng() < 0.30 ? "#9900ff" : "#ffffff",
}));

const CARD_SHADOW =
  "0 5px 0 rgba(30,0,60,0.85), 0 12px 24px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.10)";

const CRUMB_DELAYS = [0, 0.15, 0.3] as const;

export function ContactContent() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const shouldReduceMotion = useReducedMotion();

  const tiltEmail    = useCardTilt(6);
  const tiltPhone    = useCardTilt(6);
  const tiltLocation = useCardTilt(6);
  const tiltHours    = useCardTilt(6);
  const tiltSocials  = useCardTilt(6);
  const mag = useMagneticButton(0.3);

  const crumb: Variants = {
    rest: { opacity: 0, scale: 0 },
    hover: (d: number) => shouldReduceMotion ? { opacity: 0 } : ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: { delay: d, duration: 0.5, ease: "easeOut" as const, repeat: Infinity, repeatDelay: 0.4 },
    }),
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("open") === "1") {
      openModal();
      const url = new URL(window.location.href);
      url.searchParams.delete("open");
      window.history.replaceState({}, "", url.toString());
    }
    const handler = () => openModal();
    window.addEventListener("d8:open-contact", handler);
    return () => window.removeEventListener("d8:open-contact", handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) setTimeout(() => nameInputRef.current?.focus(), 50);
  }, [modalOpen]);

  function openModal() {
    setStatus("idle");
    reset();
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setStatus("idle");
    reset();
  }

  async function onSubmit(data: ContactFormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone: data.phone || undefined }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const item: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  const { ref: nameRHFRef, ...nameProps } = register("name", { required: true });

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden px-6 pt-40 pb-16">
        {!shouldReduceMotion && (
          <>
            <style>{`@keyframes d8-traverse{from{transform:translateX(-100px)}to{transform:translateX(2800px)}}`}</style>
            {STARS.map((star, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full"
                style={{
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  backgroundColor: star.color,
                  animation: `d8-traverse ${star.duration}s linear -${(star.duration * star.phase).toFixed(1)}s infinite`,
                }}
              />
            ))}
          </>
        )}
        <div className="mx-auto max-w-7xl">
          <motion.span
            variants={sweepReveal}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
          >
            {t("overline")}
          </motion.span>

          <div className="mt-6 grid grid-cols-1 gap-x-20 gap-y-6 md:grid-cols-[3fr_2fr] md:items-start">
            <motion.h1
              variants={item}
              initial="hidden"
              animate="show"
              className="font-heading text-5xl font-semibold leading-tight tracking-tight text-d8-text-primary sm:text-6xl"
            >
              {t("heading")}
            </motion.h1>

            <motion.div variants={item} initial="hidden" animate="show" className="flex flex-col gap-3 md:pt-2">
              <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                {t("foundationBody")}
              </p>
              <p className="font-body text-sm leading-relaxed text-d8-text-dim italic">
                {t("foundationVerse")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact bento */}
      <section className="border-t border-d8-border px-6 pb-24 pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={dropInStagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            transition={shouldReduceMotion ? undefined : { delayChildren: 0.1, staggerChildren: 0.08 }}
            className="grid grid-cols-1 gap-3 md:grid-cols-3"
          >
            {/* Email — span 2, primary action */}
            <motion.button
              variants={dropIn}
              type="button"
              onClick={openModal}
              whileHover="hover"
              className="relative overflow-hidden md:col-span-2 flex flex-col gap-3 border border-white/[0.10] bg-d8-bg p-8 text-left group transition-colors hover:border-d8-purple/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-d8-purple"
              style={{ boxShadow: CARD_SHADOW, ...(shouldReduceMotion ? {} : { rotateX: tiltEmail.rotateX, rotateY: tiltEmail.rotateY, transformPerspective: 800 }) }}
              onMouseMove={shouldReduceMotion ? undefined : tiltEmail.handleMouseMove}
              onMouseLeave={shouldReduceMotion ? undefined : tiltEmail.handleMouseLeave}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(153,0,255,0.07)_0%,rgba(153,0,255,0)_55%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_30%_at_50%_8%,rgba(153,0,255,0.10)_0%,rgba(153,0,255,0.02)_55%,rgba(153,0,255,0)_70%)]" />
              <motion.div
                variants={gradientBorderReveal}
                initial="rest"
                className="absolute inset-0 pointer-events-none bg-d8-purple/[0.04]"
              />
              <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                {t("rows.emailLabel")}
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary transition-colors group-hover:text-d8-purple-light sm:text-3xl">
                contacto@d8tec.com
              </span>
              <span className="mt-auto font-body text-xs text-d8-text-dim pt-2">
                {t("rows.responseTime")}
              </span>
            </motion.button>

            {/* Phone */}
            <motion.div
              variants={dropIn}
              className="relative overflow-hidden flex flex-col gap-6 border border-white/[0.10] bg-d8-bg p-8 transition-colors hover:border-d8-purple/40"
              style={{ boxShadow: CARD_SHADOW, ...(shouldReduceMotion ? {} : { rotateX: tiltPhone.rotateX, rotateY: tiltPhone.rotateY, transformPerspective: 800 }) }}
              onMouseMove={shouldReduceMotion ? undefined : tiltPhone.handleMouseMove}
              onMouseLeave={shouldReduceMotion ? undefined : tiltPhone.handleMouseLeave}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(153,0,255,0.07)_0%,rgba(153,0,255,0)_55%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_30%_at_50%_8%,rgba(153,0,255,0.10)_0%,rgba(153,0,255,0.02)_55%,rgba(153,0,255,0)_70%)]" />
              {["+506 6048-1496", "+506 7275-3532"].map((number) => (
                <div key={number} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                    {t("rows.phoneLabel")}
                  </span>
                  <a
                    href={`tel:${number.replace(/\s|-/g, "")}`}
                    className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-2xl"
                  >
                    {number}
                  </a>
                </div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              variants={dropIn}
              className="relative overflow-hidden flex flex-col gap-2 border border-white/[0.10] bg-d8-bg p-8 transition-colors hover:border-d8-purple/40"
              style={{ boxShadow: CARD_SHADOW, ...(shouldReduceMotion ? {} : { rotateX: tiltLocation.rotateX, rotateY: tiltLocation.rotateY, transformPerspective: 800 }) }}
              onMouseMove={shouldReduceMotion ? undefined : tiltLocation.handleMouseMove}
              onMouseLeave={shouldReduceMotion ? undefined : tiltLocation.handleMouseLeave}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(153,0,255,0.07)_0%,rgba(153,0,255,0)_55%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_30%_at_50%_8%,rgba(153,0,255,0.10)_0%,rgba(153,0,255,0.02)_55%,rgba(153,0,255,0)_70%)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                {t("rows.locationLabel")}
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary sm:text-2xl">
                {t("rows.locationValue")}
              </span>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={dropIn}
              className="relative overflow-hidden flex flex-col gap-2 border border-white/[0.10] bg-d8-bg p-8 transition-colors hover:border-d8-purple/40"
              style={{ boxShadow: CARD_SHADOW, ...(shouldReduceMotion ? {} : { rotateX: tiltHours.rotateX, rotateY: tiltHours.rotateY, transformPerspective: 800 }) }}
              onMouseMove={shouldReduceMotion ? undefined : tiltHours.handleMouseMove}
              onMouseLeave={shouldReduceMotion ? undefined : tiltHours.handleMouseLeave}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(153,0,255,0.07)_0%,rgba(153,0,255,0)_55%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_30%_at_50%_8%,rgba(153,0,255,0.10)_0%,rgba(153,0,255,0.02)_55%,rgba(153,0,255,0)_70%)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                {t("rows.hoursLabel")}
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary sm:text-2xl">
                {t("rows.hoursValue")}
              </span>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={dropIn}
              className="relative overflow-hidden flex flex-col gap-6 border border-white/[0.10] bg-d8-bg p-8 transition-colors hover:border-d8-purple/40"
              style={{ boxShadow: CARD_SHADOW, ...(shouldReduceMotion ? {} : { rotateX: tiltSocials.rotateX, rotateY: tiltSocials.rotateY, transformPerspective: 800 }) }}
              onMouseMove={shouldReduceMotion ? undefined : tiltSocials.handleMouseMove}
              onMouseLeave={shouldReduceMotion ? undefined : tiltSocials.handleMouseLeave}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(153,0,255,0.07)_0%,rgba(153,0,255,0)_55%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_30%_at_50%_8%,rgba(153,0,255,0.10)_0%,rgba(153,0,255,0.02)_55%,rgba(153,0,255,0)_70%)]" />
              {socials.map(({ name, handle, href }) => (
                <div key={name} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                    {name}
                  </span>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-2xl"
                  >
                    {handle}
                  </Link>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="contact-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-d8-bg/80" aria-hidden="true" />

            <motion.div
              className="relative w-full max-w-lg"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" as const }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <div className="rounded-sm border border-d8-purple/40 bg-d8-surface p-8 shadow-2xl">
                {/* Modal header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <h2
                    id="contact-modal-title"
                    className="font-heading text-xl font-semibold tracking-tight text-white"
                  >
                    {tForm("heading")}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    className="mt-0.5 shrink-0 text-white/50 transition-colors hover:text-white"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-wider text-white">
                        {tForm("fields.name")}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        aria-required="true"
                        placeholder={tForm("fields.namePlaceholder")}
                        {...nameProps}
                        ref={(el) => {
                          nameRHFRef(el);
                          nameInputRef.current = el;
                        }}
                        className={`rounded-sm border bg-d8-bg px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                          errors.name ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                        }`}
                      />
                      {errors.name && (
                        <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-wider text-white">
                        {tForm("fields.email")}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        placeholder="you@example.com"
                        {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        className={`rounded-sm border bg-d8-bg px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
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

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="font-mono text-[11px] uppercase tracking-wider text-white">
                      {tForm("fields.phone")}{" "}
                      <span className="normal-case tracking-normal opacity-60">{tForm("fields.phoneOptional")}</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={tForm("fields.phonePlaceholder")}
                      {...register("phone")}
                      className="rounded-sm border border-d8-border bg-d8-bg px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-d8-purple focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-wider text-white">
                      {tForm("fields.message")}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      aria-required="true"
                      placeholder={tForm("fields.messagePlaceholder")}
                      {...register("message", { required: true, minLength: 10 })}
                      className={`resize-none rounded-sm border bg-d8-bg px-4 py-3 font-body text-sm leading-relaxed text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                        errors.message ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                      }`}
                    />
                    {errors.message && (
                      <p role="alert" className="font-mono text-[11px] text-red-400">
                        {errors.message.type === "minLength" ? "At least 10 characters" : "Required"}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col items-center gap-3 pt-2">
                    <motion.div
                      ref={mag.ref as RefObject<HTMLDivElement>}
                      className="inline-block"
                      initial="rest"
                      whileHover="hover"
                      style={shouldReduceMotion ? {} : { x: mag.x, y: mag.y }}
                      onMouseMove={shouldReduceMotion ? undefined : mag.handleMouseMove}
                      onMouseLeave={shouldReduceMotion ? undefined : mag.handleMouseLeave}
                    >
                      <button
                        type="submit"
                        disabled={status === "sending" || status === "sent"}
                        className="inline-flex items-center gap-2 rounded-sm bg-d8-purple px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status === "sending" ? (
                          tForm("sending")
                        ) : status === "sent" ? (
                          tForm("sent")
                        ) : (
                          <>
                            {tForm("submit")}
                            <motion.span variants={arrowNudge} className="relative inline-block">
                              <span className="absolute right-full top-1/2 flex -translate-y-1/2 items-center gap-[2px] pr-px">
                                {CRUMB_DELAYS.map((d, i) => (
                                  <motion.span key={i} custom={d} variants={crumb} className="h-0.5 w-0.5 bg-white" />
                                ))}
                              </span>
                              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M13.5 2.5l-12 5 5 1.5 1.5 5 5.5-11.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.5 9l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                              </svg>
                            </motion.span>
                          </>
                        )}
                      </button>
                    </motion.div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
