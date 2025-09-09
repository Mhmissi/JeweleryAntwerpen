module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  rules: {
    // Basic rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'warn',
    // Allow apostrophes in JSX text
    'react/no-unescaped-entities': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2020: true,
    node: true
  }
};
