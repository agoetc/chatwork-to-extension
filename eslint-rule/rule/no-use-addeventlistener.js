'use strict'

const whiteDir = 'app/dom/effecter'

module.exports = {
  create(context) {
    return {
      Identifier(node) {
        const isNotEffecter = context.getFilename().indexOf(whiteDir) === -1

        if (node.name === 'addEventListener' && isNotEffecter) {
          context.report(node, 'Do not use addEventListener')
        }
      },
    }
  },
}
