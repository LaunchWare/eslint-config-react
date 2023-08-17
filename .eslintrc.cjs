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
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ["jsx", "tsx"],
      },
    ],
    "no-use-before-define": 0,
    "no-underscore-dangle": 0,
    "import/no-cycle": 0,
    "react/prop-types": 0,
    "no-shadow": 0,
    "react/jsx-props-no-spreading": 0,
    "import/no-named-as-default-member": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/extensions": ["error", "never"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "react-refresh/only-export-components": "warn",
  },
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
