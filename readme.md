# unist-util-ancestor

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Types][types-badge]][types]
[![David][david-badge]][david]
[![Size][size-badge]][size]

[Unist](https://github.com/wooorm/unist) utility for finding a common ancestor for multiple nodes. Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

## Installation

```
npm install unist-util-ancestor
```

## Usage

```js
import { u } from 'unist-builder'
import { inspect } from 'unist-util-inspect'
import findAncestor from 'unist-util-ancestor'

const tree =
  u('root', { id: 0 }, [
    u('node', { id: 1 }, [
      u('leaf', 'leaf 0')
    ]),
    u('node', { id: 2 }, [
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

const nodesToFind = [
  { value: 'leaf 1' },
  { value: 'leaf 2' }
]

console.log(inspect(findAncestor(tree, nodesToFind)))
```

Running the above yields:

```
node[2]
│ id: 2
├─0 node[1]
│   └─0 leaf "leaf 1"
└─1 node[2]
    ├─0 leaf "leaf 2"
    └─1 node[1]
        └─0 leaf "leaf 3"
```

### API

#### `findAncestor(tree, nodesToFind)`

Return the closest node that contains all `nodesToFind`.

- `tree` ([`Node`](https://github.com/wooorm/unist#node)) - Node to search
- `nodesToFind` (`array`) - Array of [unist](https://github.com/wooorm/unist) nodes

# Tests

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
[david-badge]: https://status.david-dm.org/gh/gorango/unist-util-ancestor.svg
[david]: https://david-dm.org/gorango/unist-util-ancestor
[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-ancestor.svg
[size]: https://bundlephobia.com/result?p=unist-util-ancestor
[license]: license
[author]: https://github.com/gorango
