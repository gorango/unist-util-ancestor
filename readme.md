# unist-util-ancestor

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Types][types-badge]][types]
[![Size][size-badge]][size]

[Unist](https://github.com/wooorm/unist) utility for finding the closest common ancestor for multiple nodes. Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

## Install

```
npm install unist-util-ancestor
```

## Use

```js
import { u } from 'unist-builder'
import { inspect } from 'unist-util-inspect'
import findAncestor from 'unist-util-ancestor'

const tree =
  u('root', [
    u('node', [
      u('leaf', 'leaf 0')
    ]),
    u('node', [
      u('node', [
        u('leaf', 'leaf 1'),
      ]),
      u('node', [
        u('leaf', 'leaf 2'),
        u('node', [
          u('leaf', 'leaf 3'),
        ])
      ])
    ]),
    u('leaf', 'leaf 4')
  ])

const nodesToFind = [{ value: 'leaf 1' }, { value: 'leaf 2' }]

console.log(inspect(findAncestor(tree, nodesToFind)))
```

Yields:

```
node[2]
├─0 node[1]
│   └─0 leaf "leaf 1"
└─1 node[2]
    ├─0 leaf "leaf 2"
    └─1 node[1]
        └─0 leaf "leaf 3"
```

### API

#### `findAncestor(tree, nodesToFind[, includeNodes])`

Return the closest node that contains all `nodesToFind` along with `data.depth` containing the distance between the deepest node.

- `tree` ([`Node`](https://github.com/wooorm/unist#node)) - Unist node to search
- `nodesToFind` ([`Node[]`](https://github.com/wooorm/unist#node)) - Array of unist nodes
- `includeNodes` (`boolean`) - Whether to include target nodes in response

## Test

Run `npm test` to run tests.

Run `npm run coverage` to produce a test coverage report.

## License

[MIT][license] © [Goran Spasojevic][author]

<!-- Definitions -->

[build-badge]: https://github.com/gorango/unist-util-ancestor/workflows/main/badge.svg
[build]: https://github.com/gorango/unist-util-ancestor/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/gorango/unist-util-ancestor.svg
[coverage]: https://codecov.io/github/gorango/unist-util-ancestor
[types-badge]: https://badgen.net/npm/types/unist-util-ancestor
[types]: https://www.npmjs.com/package/unist-util-ancestor
[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-ancestor.svg
[size]: https://bundlephobia.com/result?p=unist-util-ancestor
[license]: license
[author]: https://github.com/gorango
