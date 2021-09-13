# unist-util-common-ancestor

[Unist](https://github.com/wooorm/unist) node finder utility. Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

## Installation

```
npm install --save unist-util-common-ancestor
```

## Usage

### Example

### API

#### `commonAncestor(tree, nodes)`

Return the first node that contains all `nodes`, or `undefined` if no node matches.

- `tree` ([`Node`](https://github.com/wooorm/unist#node)) - Node to search
- `nodes` (`array`) - Array of [unist](https://github.com/wooorm/unist) nodes

## License

MIT
