import eslint from "@eslint/js"
import tsEslint from "typescript-eslint"
import airBnb from "eslint-config-airbnb"
import { flatConfigs as importConfigs } from "eslint-plugin-import"
import { FlatCompat } from "@eslint/eslintrc"
import reactPlugin from "eslint-plugin-react"
import reactRefresh from "eslint-plugin-react-refresh"
import a11yPlugin from "eslint-plugin-jsx-a11y"

import globals from "globals"

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const flatConfig = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  //...compat.extends(airBnb),
  {
    name: "@launchware/eslint-config-react/jsx-ally",
    plugins: {
      "jsx-a11y": a11yPlugin,
    },
  },
  {
    name: "@launchare/eslint-config-react/react-refresh",
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  importConfigs.recommended,
  {
    name: "@launchware/eslint-config-react/react",
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: { react: reactPlugin },
    rules: {
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: ["jsx", "tsx"],
        },
      ],
    },
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
    name: "@launchware/eslint-config-react/rules",
    rules: {
      "no-use-before-define": "off",
      "no-underscore-dangle": "off",
      "import/no-cycle": "off",
      "no-shadow": "off",
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

const config = {
  meta: {
    name: "@launchware/eslint-config-react",
    version: "0.1.0",
  },
  configs: {
    recommended: flatConfig,
  },
}

export default config
