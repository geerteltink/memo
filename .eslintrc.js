module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'app.e2e-spec.ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'error',
    'import/order': ['error', {
      'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      'newlines-between': 'never',
      'warnOnUnassignedImports': true
    }],
  },
  settings: {
    //'alwaysTryTypes': true,
    'import/extensions': ['.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "tsconfig.json",
      }
    }
  }
};
