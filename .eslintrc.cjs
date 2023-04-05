module.exports = {
  root: true,
  extends: ['@yelo/eslint-config'],
  parserOptions: {
    // @ts-ignor
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
  }
}
