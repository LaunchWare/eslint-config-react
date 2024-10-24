const rules = require("./src/rules.js");

module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint", "react-refresh"],
  rules: rules,
  env: {
    browser: true,
  },
  settings: {},
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: "@typescript-eslint/parser",
  root: true,
};
