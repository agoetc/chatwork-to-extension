'use strict'

module.exports = {
  create: function (content) {
    console.log(content)
    return {
      AddEventListener: function (node) {
        console.log('あああああああああああ')
        context.report(node, 'Do not use addEventListener')
      },
    }
  },
}
