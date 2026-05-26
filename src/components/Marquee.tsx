"use client";

import { useReducedMotion } from "framer-motion";

const serviceItems = [
  "Research",
  "Embedded Systems",
  "Firmware",
  "Real-Time Systems",
  "Custom Hardware",
  "Sensor Networks",
  "IoT Solutions",
  "Industry 4.0",
  "Industrial Automation",
  "Robotics",
  "Protocol Engineering",
  "Systems Integration",
  "Edge AI",
  "Computer Vision",
  "Predictive Analytics",
  "Data Analysis",
  "AI",
  "Web Development",
  "App Development",
  "Cloud-Based Solutions",
  "Digital Twins",
];

interface MarqueeTrackProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

function MarqueeTrack({ items, speed = 20, reverse = false }: MarqueeTrackProps) {
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
            className="flex-shrink-0 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-d8-text-primary"
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
    <div className="border-y border-d8-border bg-d8-bg py-3.5">
      <MarqueeTrack items={serviceItems} speed={20} />
    </div>
  );
}
