/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#18181b", // Zinc-900
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#71717a", // Zinc-500
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#09090b", // Zinc-950
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#09090b",
            primary: {
              DEFAULT: "#18181b",
              foreground: "#ffffff",
            },
            focus: "#18181b",
          },
        },
      },
    }),
  ],
};
