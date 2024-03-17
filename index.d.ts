import type { Parent } from 'unist'

/**
 * Find Ancestor
 *
 * @param { Parent } tree - Root node
 * @param { Readonly<Array<Parent | undefined>> } nodesToFind - Children of ancestor to find
 * @param { boolean } [includeNodes] - Whether to include target nodes in response
 * @returns { Parent } - Ancestor Parent with data.depth
 */
export default function findAncestor(
    tree: Parent,
    nodesToFind: Readonly<Array<Parent | undefined>>,
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

