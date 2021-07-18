'use strict'

const whiteDir = 'getter'

module.exports = {
  create(context) {
    return {
      Identifier(node) {
        const isNotGetter = context.getFilename().indexOf(whiteDir) === -1
        const iGetElement = node.name.indexOf('getElement') > -1
        if (iGetElement && isNotGetter) {
          context.report(node, 'Do not use getElement')
        }
      },
    }
  },
}
