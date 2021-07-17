'use strict'

module.exports = {
  create(content) {
    return {
      Identifier(node) {
        if (node.name === 'addEventListener') {
          content.report(node, 'Do not use addEventListener')
        }
      },
    }
  },
}
