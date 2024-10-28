# LaunchWare's eslint-config-react

This is the default eslint configuration for LaunchWare's React projects.

## Installation

```bash
yarn add -D @launchware/eslint-config-react
```

## Usage

You need to add the following to your `eslint.config.js` (or equivalent) file:

```javascript
const launchEslint = require("@launchware/eslint-config-node")

module.exports = [
  // ... existing ESLint configs
  ...launchEslint.default.configs.recommended,
  {
    settings: {
      "files": ["**/*.{ts}"],
      "import/resolver": { typescript: { project: "./tsconfig.test.json" } },
    },
  },
]
```
