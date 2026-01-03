/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sierra-dark': '#4a5544',
        'sierra': '#656B5B',
        'sierra-light': '#7d8475',
        'tierra': '#8B6F47',
        'tierra-light': '#A68A5F',
        'naranja': '#D97642',
        'naranja-light': '#E89563',
      },
    },
  },
  plugins: [],
}