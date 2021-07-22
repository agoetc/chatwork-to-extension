'use strict'

const whiteDir = 'dom'

module.exports = {
  create(context) {
    return {
      Identifier(node) {
        const isNotDomDir = context.getFilename().indexOf(whiteDir) === -1
        const isGetElement = node.name.indexOf('getElement') > -1
        const isCreateElement = node.name.indexOf('createElement') > -1

        if ((isGetElement || isCreateElement) && isNotDomDir) {
          context.report(node, 'Do not instanced element')
        }
      },
    }
  },
}
