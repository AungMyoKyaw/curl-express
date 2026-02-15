module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: false,
    es2020: true,
    jest: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist', 'node_modules', 'coverage'],
  rules: {
    'comma-dangle': 'off',
    'quotes': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'arrow-parens': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-import-module-exports': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }]
  }
};
