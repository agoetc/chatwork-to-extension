const rulesDirPlugin = require('eslint-plugin-rulesdir')
rulesDirPlugin.RULES_DIR = './eslint-rule/rule'

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['rulesdir'],
  rules: {
    'rulesdir/no-use-addeventlistener': 'error',
    'rulesdir/no-use-getelement': 'error',
  },
}
