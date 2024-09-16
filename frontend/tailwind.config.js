/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
     'node_modules/tw-elements-react/dist/**/*.{js,jsx,ts,tsx}',
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
