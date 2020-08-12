module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'unused-imports'
  ],
  rules: {
    "no-unused-vars": "off",
    "no-console": "off",
    "react/jsx-filename-extension": [0],
    "prettier/prettier": "error",
    "import/no-cycle": "off",
    "array-callback-return": "off",
    "react/jsx-curly-newline": "off", 
    "react/prop-types": "off",
    "react/jsx-one-expression-per-line": "off",
    "import/no-unresolved": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
  },
};
