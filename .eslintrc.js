const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended', // Disable base rules
    'plugin:@typescript-eslint/recommended', // Enable ts rules
    'prettier',
    'plugin:prettier/recommended',
  ],

  plugins: ['prettier', '@typescript-eslint'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.ts'],
      },
    },
  },

  ignorePatterns: ['**/*.css', '**/*.png'],

  rules: {
    'prettier/prettier': WARN,

    'no-use-before-define': OFF,
    'no-shadow': OFF,
    'prefer-destructuring': WARN,
    'no-unused-expressions': OFF,
    'lines-between-class-members': [
      WARN,
      'always',
      { exceptAfterSingleLine: true },
    ],

    '@typescript-eslint/no-use-before-define': [ERROR, { functions: false }],
    '@typescript-eslint/no-unused-expressions': ERROR,
    '@typescript-eslint/no-shadow': ['error'],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': WARN,
    'import/prefer-default-export': OFF,
    'import/no-unresolved': OFF, // Using typescript resolver instead

    'react/jsx-filename-extension': OFF,
    'react/prop-types': OFF,
    'react/jsx-props-no-spreading': [
      WARN,
      {
        custom: 'ignore',
      },
    ],

    'jsx-a11y/control-has-associated-label': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
  },
};
