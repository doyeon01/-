/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        TheJamsil: ['TheJamsil', 'sans-serif'],
      },
      animation: {
        round: 'round 120s infinite linear',
      },
      keyframes: {
        round: {
          '0%': {
            transform: 'perspective(1000px) rotateY(0deg) rotateX(15deg)',
          },
          '100%': {
            transform: 'perspective(1000px) rotateY(3600deg) rotateX(15deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
