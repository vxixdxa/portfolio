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
        background: "#FAFAFA",
        foreground: "#09090B",
        primary: "#18181B",
        secondary: "#3F3F46",
        accent: "#1500FF",
        "accent-soft": "#E8F5E9",
        muted: "#E8ECF0",
        "muted-fg": "#475569",
        border: "#E4E4E7",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-3px) scale(1.015)" },
        },
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-8px)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "pop-bounce": {
          "0%, 100%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.15)" },
          "60%": { transform: "scale(0.95)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        "bounce-dot": "bounce-dot 1.4s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        "pop-bounce": "pop-bounce 500ms ease-out",
        "fade-in-up": "fade-in-up 200ms ease-out",
      },
      fontFamily: {
        heading: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading-1": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-2": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-3": ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "500" }],
        "body-lg": ["1.25rem", { lineHeight: "1.7" }],
        "body": ["1.125rem", { lineHeight: "1.7" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6" }],
        "caption": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      maxWidth: {
        content: "1200px",
        prose: "720px",
      },
      spacing: {
        section: "clamp(4rem, 10vw, 8rem)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
export default config;
