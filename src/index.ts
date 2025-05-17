import eslint from "@eslint/js"
import tsEslint from "typescript-eslint"
import { flatConfigs as importConfigs } from "eslint-plugin-import"
import { FlatCompat } from "@eslint/eslintrc"
import reactPlugin from "eslint-plugin-react"
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
        projectService: true, // alternative: `project: ['./tsconfig.json']` for older setups
      },
    },
  },

  ...compat.extends("eslint-config-airbnb"),

  importConfigs.recommended,

  {
    name: "@launchware/eslint-config-react/react",
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: (reactPlugin as any).default ?? reactPlugin,
      "jsx-a11y": a11yPlugin,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // General best practices
      "no-shadow": "off",
      "no-use-before-define": "off",
      "no-underscore-dangle": "off",

      // TypeScript-specific
      "@typescript-eslint/no-unused-vars": ["error"],

      // React-specific
      "react/prop-types": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/jsx-props-no-spreading": "off",

      // React Refresh
      "react-refresh/only-export-components": "warn",

      // A11y
      // (optional additions depending on your team’s commitment to accessibility)

      // Import rules
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
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
      "import/prefer-default-export": "off",
      "import/no-cycle": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
    },
  }
)

export default {
  meta: {
    name: "@launchware/eslint-config-react",
    version: "0.1.1",
  },
  configs: {
    recommended: flatConfig,
  },
}
