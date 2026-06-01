import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        cream: {
          DEFAULT: "#FAF8F2",
          50: "#FFFFFF",
          100: "#FAF8F2",
          200: "#F6F1E8",
        },
        // Ink / text
        ink: {
          DEFAULT: "#4A4035", // primary text
          soft: "#7A6D5D", // secondary text
        },
        // Gold system
        gold: {
          DEFAULT: "#B89542",
          light: "#C9A646",
          soft: "#E8D7A8",
        },
        line: "#E6DDCC", // borders / dividers
      },
      fontFamily: {
        sans: ["var(--font-body)", "var(--font-thai)", "system-ui", "sans-serif"],
        heading: [
          "var(--font-heading)",
          "var(--font-thai)",
          "system-ui",
          "sans-serif",
        ],
        thai: ["var(--font-thai)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.75rem", // 28px
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(74, 64, 53, 0.12)",
        card: "0 18px 50px -20px rgba(74, 64, 53, 0.18)",
        gold: "0 14px 34px -14px rgba(184, 149, 66, 0.45)",
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(110deg, #C9A646 0%, #B89542 45%, #E8D7A8 100%)",
        "cream-radial":
          "radial-gradient(120% 120% at 50% 0%, #FFFFFF 0%, #FAF8F2 45%, #F6F1E8 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.92)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 4s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
