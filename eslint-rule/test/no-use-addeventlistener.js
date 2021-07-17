'use strict'

const RuleTester = require('eslint').RuleTester
const tester = new RuleTester()

tester.run(
  'not-use-addeventlistener',
  require('../rule/no-use-addeventlistener'),
  {
    valid: [{ code: 'foo()' }, { code: 'hogehoge' }],
    invalid: [
      { code: 'addEventListener', errors: ['Do not use addEventListener'] },
    ],
  }
)
