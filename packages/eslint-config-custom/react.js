/* eslint-env node */
module.exports = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "@tanstack/query"],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
  },
};
