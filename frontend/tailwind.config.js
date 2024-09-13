/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      fontFamily:{
        TheJamsil: ['TheJamsil','snas-serif'],
      }
    },
  },
  plugins: [],
}
