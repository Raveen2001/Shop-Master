/* eslint-env node */

module.exports = {
  env: {
    browser: false,
    es2022: true,
  },

  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],

  rules: {},
};
