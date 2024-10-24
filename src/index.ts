import eslint from "@eslint/js"
import tsEslint from "typescript-eslint"
import airBnb from "eslint-config-airbnb"
import importPlugin from "eslint-plugin-import"
import { FlatCompat } from "@eslint/eslintrc"
import reactPlugin from "eslint-plugin-react"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const flatConfig = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...compat.extends(airBnb),
  {
    // in main config for TSX/JSX source files
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: { react: reactPlugin },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    rules: {
      "no-use-before-define": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: ["jsx", "tsx"],
        },
      ],
      "no-underscore-dangle": "off",
      "import/no-cycle": "off",
      "react/prop-types": "off",
      "no-shadow": "off",
      "react/jsx-props-no-spreading": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",
      "import/prefer-default-export": "off",
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
  },
)

export default {
  recommended: flatConfig,
}
