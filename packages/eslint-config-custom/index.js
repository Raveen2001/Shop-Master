/* eslint-env node */

module.exports = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],

  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
