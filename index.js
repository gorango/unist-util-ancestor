/**
 * @typedef {import('unist').Node} Node
 */

import { visitParents } from 'unist-util-visit-parents'

/**
 * Find Ancestor
 *
 * @param {Node} tree - Root node
 * @param {Node[]} [nodesToFind] - Children of ancestor to find
 * @returns {Node}
 */
export default function findAncestor (tree, nodesToFind) {
  if (!tree) {
    throw new Error('unist-util-ancestor requires a tree to search')
  }

  if (!nodesToFind || !nodesToFind.length) {
    throw new Error('unist-util-ancestor requires nodes to find ancestor in tree')
  }

  const stacks = new Map()
  let index = 0

  visitParents(tree, (node, parents) => {
    if (nodesToFind.includes(node)) {
      index = Math.max(index, parents.length)
      stacks.set(node, parents)
    }
  })

  nodesToFind.forEach(node => {
    if (!stacks.has(node)) {
      throw new Error('unist-util-ancestor requires all nodes be contained in the tree')
    }
  })

  let ancestor = tree

  while (--index) {
    const nextAncestor = stacks.get(nodesToFind[0])[index]
    const shared = nodesToFind.every(node => stacks.get(node)[index] === nextAncestor)

    if (shared) {
      ancestor = nextAncestor
      break
    }
  }

  return ancestor
}
