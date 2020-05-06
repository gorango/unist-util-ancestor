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

  const targets = nodes.slice(1).map(child => find(tree, child))

  let candidates
  const target = find(tree, nodes[0])
  visit(tree, target, (_, parents) => { candidates = parents.reverse() })

  const result = candidates.reduce((found, candidate) => {
    if (found) {
      return found
    }
    const containsAll = targets.reduce((bool, target) => {
      return bool && !!find(candidate, target)
    }, true)
    if (containsAll) {
      return candidate
    }
    return false
  }, false)

  return result || undefined
}

/*
 * Expose.
 */
module.exports = commonAncestor
