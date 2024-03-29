/**
 * @typedef { import('unist').Parent } Parent
 * @typedef { import('unist').Literal } Literal
 * @typedef { import('unist').Node } Node
 */

import { visitParents } from 'unist-util-visit-parents'

/**
 * @typedef { Node | Parent | Literal } NodeLike
 */

/**
 * Find Ancestor
 *
 * @param { Parent } tree - Root node
 * @param { Array<NodeLike | undefined> } nodesToFind - Children of ancestor to find
 * @param { boolean } [includeNodes] - Whether to include target nodes in response
 * @returns { Parent } - Ancestor Parent with data.depth
 */
export default function findAncestor (tree, nodesToFind, includeNodes) {
  if (!tree) {
    throw new Error('unist-util-ancestor requires a tree to search')
  }

  if (!nodesToFind?.length) {
    throw new Error('unist-util-ancestor requires nodes to find the ancestor')
  }

  let depth = 0
  let maxDepth = 0
  const stacks = new Map()

  visitParents(tree, (node, ancestors) => {
    if (includeNodes) {
      // @ts-ignore
      ancestors = [...ancestors, node]
    }
    if (nodesToFind.includes(node)) {
      depth = maxDepth = Math.max(depth, ancestors.length)
      stacks.set(node, ancestors)
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
      ancestor.data = ancestor.data || {}
      ancestor.data.depth = maxDepth - depth
      break
    }
  }

  return ancestor
}
