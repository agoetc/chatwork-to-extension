'use strict'

const RuleTester = require('eslint').RuleTester
const tester = new RuleTester()

tester.run(
  'not-use-addeventlistener',
  require('../rule/no-use-addeventlistener'),
  {
    valid: [
      { code: 'foo()' },
      { code: 'hogehoge' },
      { code: "document.createElement('button')" },
    ],
    invalid: [
      {
        code: "document.addEventListener('click', function() {})",
        errors: ['Do not use addEventListener'],
      },
    ],
  }
)
