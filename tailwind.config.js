/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // ✅ for Vite's HTML
    "./src/**/*.{js,ts,jsx,tsx}" // ✅ for all your component files
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Press Start 2P"', "monospace"], // ✅ custom font
      },
    },
  },
  plugins: [],
}
