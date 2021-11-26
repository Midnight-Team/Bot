module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "@casper124578/eslint-config",
    "@casper124578/eslint-config-react",
    "@casper124578/eslint-config-next",
    "eslint-config",
    "eslint-config-next",
    "eslint-config-react"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-template-curly-in-string": "off",
  },
};
