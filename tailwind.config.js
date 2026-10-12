/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07080f",
        paper: "#f6efe0",
        straw: "#f4c95d",
        flame: "#ff7a3d",
        crimson: "#e63946",
        sea: "#2f6bff",
      },
      fontFamily: {
        display: ["Dela Gothic One", "system-ui", "sans-serif"],
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
