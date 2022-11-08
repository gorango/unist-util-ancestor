/**
 * @typedef {import('unist').Node} Node
 */

import { visitParents } from 'unist-util-visit-parents'

/**
 * Find Ancestor
 *
 * @param {Node} tree - Root node
 * @param {Node[]} nodesToFind - Children of ancestor to find
 * @param {boolean} [includeNodes] - Whether to include target nodes in response
 * @returns {Node}
 */
export default function findAncestor (tree, nodesToFind, includeNodes) {
  if (!tree) {
    throw new Error('unist-util-ancestor requires a tree to search')
  }

  if (!nodesToFind?.length) {
    throw new Error('unist-util-ancestor requires nodes to find the ancestor')
  }

  let depth = 0
  const stacks = new Map()

  visitParents(tree, (node, parents) => {
    if (includeNodes) {
      // @ts-ignore
      parents = [...parents, node]
    }
    if (nodesToFind.includes(node)) {
      depth = Math.max(depth, parents.length)
      stacks.set(node, parents)
    }
  })

  nodesToFind.forEach(node => {
    if (!stacks.has(node)) {
      throw new Error('unist-util-ancestor requires all nodes be contained in the tree')
    }
  })

  let ancestor = tree

  while (--depth) {
    const nextAncestor = stacks.get(nodesToFind[0])[depth]
    const shared = nextAncestor && nodesToFind.every(node => stacks.get(node)[depth] === nextAncestor)

    if (shared) {
      ancestor = nextAncestor
      break
    }
  }

  return ancestor
}
