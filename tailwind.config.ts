import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        d8: {
          purple: "#9900ff",
          "purple-light": "#b84dff",
          "purple-dim": "#6600bb",
          bg: "#080808",
          surface: "#111111",
          border: "#1e1e1e",
          "text-primary": "#f0f0f0",
          "text-secondary": "#888888",
          "text-dim": "#555555",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-ibm-plex-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "purple-glow":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(153,0,255,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
