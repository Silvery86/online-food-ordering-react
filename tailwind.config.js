const { darkTheme } = require('./src/Theme/DarkTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: darkTheme.palette.primary.main,
        secondary: darkTheme.palette.secondary.main,
      },
      textColor: {
        primary: darkTheme.palette.textColor.main, 
      },
    },
  },
  plugins: [],
}