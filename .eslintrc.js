module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 1,
    'default-case': 2,
    'no-console': 1,
    'prefer-const': 2,
    'no-new-object': 2,
    'no-array-constructor': 2,
    'prefer-object-spread': 2,
    'array-callback-return': 2,
    'object-shorthand': 2,
    'prefer-destructuring': 2,
    'prefer-template': 2,
    'func-style': ['error', 'expression'],
    'prefer-rest-params': 2,
    'default-param-last': 2,
    'space-before-blocks': 2,
    'prefer-spread': 2
  }
};
