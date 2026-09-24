/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark-tech surfaces
        bg: {
          DEFAULT: "#070b16",
          soft: "#0b1120",
        },
        surface: {
          DEFAULT: "#101a30",
          raised: "#16223c",
        },
        // Brand (indigo → cyan)
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        accent: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        ink: {
          DEFAULT: "#e6edf7",
          muted: "#9fb0c9",
          dim: "#6f8199",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(120deg, #6366f1 0%, #4f46e5 40%, #06b6d4 100%)",
        "brand-text":
          "linear-gradient(120deg, #ffffff 0%, #c7d2fe 45%, #67e8f9 100%)",
      },
      boxShadow: {
        glow: "0 18px 45px -15px rgba(99,102,241,.55)",
        "glow-lg": "0 26px 55px -15px rgba(99,102,241,.7)",
        panel: "0 30px 60px -22px rgba(0,0,0,.7)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,1,.36,1) both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
