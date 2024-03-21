import type { Parent, Node, Literal } from 'unist'

type NodeLike = Node | Parent | Literal

/**
 * Find Ancestor
 *
 * @param { Parent } tree - Root node
 * @param { Array<NodeLike | undefined> } nodesToFind - Children of ancestor to find
 * @param { boolean } [includeNodes] - Whether to include target nodes in response
 * @returns { Parent } - Ancestor Parent with data.depth
 */
export default function findAncestor(
    tree: Parent,
    nodesToFind: Readonly<Array<NodeLike | undefined>>,
    includeNodes?: boolean | undefined
): Parent

declare module 'unist' {
  interface Data {
    /**
     * Ancestor depth.
     *
     * Populated by `unist-util-ancestor`.
     */
    depth: number
  }
}

