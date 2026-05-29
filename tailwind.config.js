/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
          DEFAULT: "rgb(var(--color-primary-600) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          secondary: "rgb(var(--color-surface-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-surface-tertiary) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--color-card) / <alpha-value>)",
        },
        accent: {
          glow: "rgb(var(--color-accent-glow) / <alpha-value>)",
        },
        content: {
          DEFAULT: "rgb(var(--color-content) / <alpha-value>)",
          secondary: "rgb(var(--color-content-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-content-tertiary) / <alpha-value>)",
          inverse: "rgb(var(--color-content-inverse) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          strong: "rgb(var(--color-border-strong) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 180, 216, 0.08)",
        card: "0 4px 24px rgba(15, 23, 42, 0.06)",
        "card-dark": "0 4px 24px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
