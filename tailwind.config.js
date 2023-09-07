/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transp: "#ffffff00",
      richBlack: "#161D29",
      midBlack: "#161D29",
      softBlack: "#2C333F",
      richBlue: "#4c50d3",
      softBlue: "#c3e1ff"
    },
    extend: {},
  },
  plugins: [],
}