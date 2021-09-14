/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Data} Data
 * @typedef {import('unist-util-visit-parents').Visitor<Data>} Visitor
 * @typedef {import('unist').NodeData<Data>} NodeData
 *
 * @typedef {Object} InspectOptions
 * @property {boolean} [showPositions=true]
 */

import { visitParents } from 'unist-util-visit-parents'
import find from 'unist-util-find'

/**
 * Find Ancestor
 *
 * @param {Node} tree - Root node
 * @param {[Node]} [nodes] - Children of ancestor to find
 * @returns {Node|undefined|boolean}
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

  // @ts-ignore
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
    return false
  }, false)

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
