// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  extends: ['airbnb-base', 'preact', 'prettier', 'prettier/prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-unused-vars': ['warn'],
  },
  globals: {
    document: true,
    jQuery: true,
    $: true,
    theme: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './build/project.config.js'),
      },
    },
  },
};
