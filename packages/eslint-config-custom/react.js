/* eslint-env node */
module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "@tanstack/query"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
