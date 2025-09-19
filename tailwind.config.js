/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Add Hero UI–style tokens if you want
      colors: {
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          900: "#18181b",
        },
      },
    },
  },
  plugins: [],
};