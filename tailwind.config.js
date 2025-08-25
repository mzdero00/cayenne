// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_blue: "#0077b6",
        secondary_orange: "#f4a261",
        primary_orange: "#cd7530",
        brand: "#d78340",
        primary_green: "#6a994e",
        custom_black: "#343a40",
        custom_white: "#f8f9fa",
        custom_lightgray: "#ececec",
        brandColors: {
          light: "#a5d8ff",
          DEFAULT: "#339af0",
          dark: "#1c7ed6",
        },
        highlight: "#ffd43b",
      },
      fontFamily: {
        josefin: ["var(--font-josefin)"],
        sansita: ["var(--font-sansita)"],
        jomolhari: ["var(--font-jomolhari)"],
      },
    },
  },
  plugins: [],
};
