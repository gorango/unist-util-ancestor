const visit = require('unist-util-visit-parents')
const find = require('unist-util-find')

/**
 * Common Ancestor
 *
 * @param {Node} tree - Root node
 * @param {array} [nodes] - Children of ancestor to find
 */
function commonAncestor (tree, nodes) {
  if (!tree) {
    throw new Error('unist-common-ancestor requires a tree to search')
  }

  if (!nodes || !nodes.length) {
    throw new Error('unist-common-ancestor requires nodes to find ancestor in tree')
  }

  const target = find(tree, nodes[0])

  if (!target) {
    throw new Error('unist-common-ancestor requires all nodes be contained in the tree')
  }

  const targets = nodes.slice(1).map(child => find(tree, child))
    .filter(node => {
      if (!node) {
        throw new Error('unist-common-ancestor requires all nodes be contained in the tree')
      }
      return node
    })

  const result = getParents(tree, target).reduce((found, parent) => {
    if (found) {
      return found
    }
    const containsAllChildren = targets.reduce((bool, target) => {
      return bool && !!find(parent, target)
    }, true)
    if (containsAllChildren) {
      return parent
    }
    return false
  }, false)

  return result || undefined
}

/**
 * @param {Node} tree - Root node
 * @param {Object} target - Target node
 */
function getParents (tree, target) {
  let result
  visit(tree, target, (_, parents) => {
    result = parents.reverse()
  })
  return result
}

/*
 * Expose.
 */
module.exports = commonAncestor
