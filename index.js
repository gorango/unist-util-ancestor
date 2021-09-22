/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Data} Data
 */

import { visitParents } from 'unist-util-visit-parents'
import find from 'unist-util-find'

/**
 * Find Ancestor
 *
 * @param {Node} tree - Root node
 * @param {[Node]} [nodes] - Children of ancestor to find
 * @returns {Node|undefined}
 */
export default function findAncestor (tree, nodes) {
  if (!tree) {
    throw new Error('unist-util-ancestor requires a tree to search')
  }

  if (!nodes || !nodes.length) {
    throw new Error('unist-util-ancestor requires nodes to find ancestor in tree')
  }

  const target = find(tree, nodes[0])

  if (!target) {
    throw new Error('unist-util-ancestor requires all nodes be contained in the tree')
  }

  const targets = nodes.slice(1).map(child => find(tree, child))
    .filter(node => {
      if (!node) {
        throw new Error('unist-util-ancestor requires all nodes be contained in the tree')
      }
      return node
    })

  const result = getParents(tree, target).reduce((found, parent) => {
    if (found) {
      return found
    }
    const containsAllChildren = targets.reduce((bool, target) => {
      return bool && Boolean(find(parent, target))
    }, true)
    if (containsAllChildren) {
      return parent
    }
  }, undefined)

  return result
}

/**
 * @param {Node} tree - Root node
 * @param {Data} target - Target node
 * @returns {Node[]}
 */
function getParents (tree, target) {
  let result = [tree]
  visitParents(tree, target, (_, parents) => {
    result = parents.reverse()
  })
  return result
}
