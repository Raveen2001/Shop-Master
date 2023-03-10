module.exports = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {},
};
