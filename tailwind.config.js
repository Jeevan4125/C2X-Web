/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#111111",
        panel: "#181818",
        border: "#2A2A2A",
        primary: "#FFFFFF",
        secondary: "#A1A1AA",
        accent: {
          DEFAULT: "#007ACC",
          hover: "#1B8FE0",
          dim: "#0A5A96",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "Menlo", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        fadeUp: "fadeUp 0.6s ease forwards",
      },
    },
  },
  // Purge unused styles in production
  plugins: [],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
};
