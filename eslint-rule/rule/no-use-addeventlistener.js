'use strict'

const whiteDir = 'adapter/dom-builder/effector'

module.exports = {
  create(context) {
    return {
      Identifier(node) {
        const isNotEffector = context.getFilename().indexOf(whiteDir) === -1

        if (node.name === 'addEventListener' && isNotEffector) {
          context.report(node, 'Do not use addEventListener')
        }
      },
    }
  },
}
