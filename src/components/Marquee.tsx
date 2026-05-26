"use client";

import { useReducedMotion } from "framer-motion";

const servicesItems = [
  "R&D", "Hardware Integration", "Firmware", "Embedded Systems",
  "Web Development", "App Development", "AI & Data", "Cloud Infrastructure",
  "ESP32", "React", "Next.js", "FastAPI", "Python", "TypeScript",
];

const processItems = [
  "01 Discovery", "02 Architecture", "03 Build", "04 Delivery",
  "01 Discovery", "02 Architecture", "03 Build", "04 Delivery",
];

const techItems = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL",
  "ESP32", "STM32", "MQTT", "Docker", "Vercel", "Node.js", "TailwindCSS", "Framer Motion",
];

interface MarqueeTrackProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

function MarqueeTrack({ items, speed = 25, reverse = false }: MarqueeTrackProps) {
  const shouldReduceMotion = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={shouldReduceMotion ? "flex gap-8" : reverse ? "flex gap-8 animate-marquee-reverse" : "flex gap-8 animate-marquee"}
        style={shouldReduceMotion ? undefined : { animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-d8-text-dim"
          >
            <span className="h-[3px] w-[3px] rounded-full bg-d8-purple flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ServicesMarquee() {
  return (
    <div className="border-y border-d8-border bg-d8-surface py-3.5">
      <MarqueeTrack items={servicesItems} speed={32} />
    </div>
  );
}

export function ProcessMarquee() {
  return (
    <div className="border-y border-d8-border py-3.5">
      <MarqueeTrack items={processItems} speed={18} reverse />
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="border-t border-d8-border bg-d8-surface py-3.5">
      <MarqueeTrack items={techItems} speed={26} />
    </div>
  );
}
