import eslint from "@eslint/js"
import tsEslint from "typescript-eslint"
import { FlatCompat } from "@eslint/eslintrc"
import reactPlugin from "eslint-plugin-react"
import a11yPlugin from "eslint-plugin-jsx-a11y"
import globals from "globals"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export const getConfiguration = ({
  tsconfigRootDirectory,
  project,
  allowDefaultProject,
}: {
  tsconfigRootDirectory: string
  project?: string | boolean | string[] | null
  allowDefaultProject?: string[]
}) => {
  const flatConfig = tsEslint.config(
    eslint.configs.recommended,
    //...tsEslint.configs.strictTypeChecked,

    ...compat.extends("eslint-config-airbnb"),

    {
      name: "@launchware/eslint-config-react/react",
      files: ["src/**/*.ts", "src/**/*.tsx"],
      languageOptions: {
        globals: globals.browser,
        parserOptions: {
          tsconfigRootDir: tsconfigRootDirectory,
          project,
          ecmaFeatures: { jsx: true },
          projectService: {
            allowDefaultProject,
          },
        },
      },
      plugins: {
        react: (reactPlugin as any).default ?? reactPlugin,
        "jsx-a11y": a11yPlugin,
      },
      rules: {
        // General best practices
        "no-shadow": "off",
        "no-use-before-define": "off",
        "no-underscore-dangle": "off",
        semi: "off",

        // TypeScript-specific
        //"@typescript-eslint/no-unused-vars": ["error"],

        // React-specific
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
        "react/jsx-props-no-spreading": "off",

        // A11y
        // (optional additions depending on your team’s commitment to accessibility)

        // Import rules
        "import/extensions": ["off"],
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

  const config = {
    meta: {
      name: "@launchware/eslint-config-react",
      version: "0.2.0",
    },
    configs: {
      recommended: flatConfig,
    },
  }

  return config
}
