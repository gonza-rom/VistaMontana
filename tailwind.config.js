/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};