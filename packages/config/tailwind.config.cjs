/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../apps/**/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00AB55",
        primaryDark: "#005249",
      },
    },
  },
  important: true,
  plugins: [],
};
