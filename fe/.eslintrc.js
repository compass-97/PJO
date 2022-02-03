module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-param-reassign': 0,
    'linebreak-style': 0,
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'eslint no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'import/no-named-as-default': 0,
  },
};
