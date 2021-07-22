'use strict'

const RuleTester = require('eslint').RuleTester
const tester = new RuleTester()

tester.run('no-instanced-element', require('../rule/no-instanced-element.js'), {
  valid: [
    { code: 'foo()' },
    { code: 'hogehoge' },
    { code: "document.addEventListener('click', function() {})" },
  ],
  invalid: [
    {
      code: "document.getElementById('_toList')",
      errors: ['Do not instanced element'],
    },
    {
      code: "document.createElement('button')",
      errors: ['Do not instanced element'],
    },
  ],
})
