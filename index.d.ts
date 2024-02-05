import type { Node } from 'unist'

/**
 * Find Ancestor
 *
 * @param { Node } tree - Root node
 * @param { Readonly<Array<Node | undefined>> } nodesToFind - Children of ancestor to find
 * @param { boolean } [includeNodes] - Whether to include target nodes in response
 * @returns { Node } - Ancestor Node with data.depth
 */
export default function findAncestor(
    tree: Node,
    nodesToFind: Readonly<Array<Node | undefined>>,
    includeNodes?: boolean | undefined
): Node

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

