module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-console': 0,
    'import/extensions': 0,
    'no-unused-vars': 0,
    'import/no-unresolved': 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'prefer-destructuring': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react/prefer-stateless-function': 0,
    'implicit-arrow-linebreak': 0,
    'react/prop-types': 0,
    'object-curly-newline': 0
  }
};
