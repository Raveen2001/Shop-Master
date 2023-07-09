/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#00AB55",
        primaryDark: "#005249",
      },
    },
  },
  plugins: [],
};
