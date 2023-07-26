module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-use-before-define': 'off',
    'prettier/prettier': 0,
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off',
      'padded-blocks': 'off',
      'arrow-body-style': 'off',
      'react-hooks/exhaustive-deps': 0,
      'react-native/split-platform-components': 0,
      'react-native/no-inline-styles': 0,
      'react-native/no-color-literals': 0,
      'react-native/no-raw-text': 0,
      'react-native/no-single-element-style-arrays': 2,
      'react-native/sort-styles':0,
      'react-native/no-unused-vars': 0,
      'react-native/no-explicit-any': 0,
      'react-native/no-unused-styles':0,
  },
};
