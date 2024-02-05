import test from 'tape'
import { u } from 'unist-builder'
import { find } from 'unist-util-find'
import findAncestor from './index.js'

const tree =
  u('root', [
    u('node', { id: 1 }, [
      u('node', { id: 2 }, [
        u('leaf', 'leaf 0')
      ])
    ]),
    u('node', { id: 3 }, [
      u('node', { id: 4 }, [
        u('leaf', 'leaf 1'),
        u('leaf', 'leaf 2')
      ]),
      u('node', { id: 5 }, [
        u('leaf', 'leaf 3'),
        u('node', { id: 6 }, [
          u('leaf', 'leaf 4'),
          u('leaf', 'leaf 5')
        ])
      ]),
      u('leaf', 'leaf 6')
    ])
  ])

test('throws useful errors', function (t) {
  t.throws(function () {
    // @ts-expect-error runtime
    findAncestor()
  }, 'should fail without tree')

  t.throws(function () {
    // @ts-expect-error runtime
    findAncestor(tree)
  }, 'should fail without nodes')

  t.throws(function () {
    findAncestor(tree, [])
  }, 'should fail with empty nodes')

  t.throws(function () {
    const nodesToFind = [{ type: 'leaf', value: 'leaf 55' }]
    findAncestor(tree, nodesToFind)
  }, 'should fail with non-existent node')

  t.throws(function () {
    const nodesToFind = [
      { type: 'leaf', value: 'leaf 5' },
      { type: 'leaf', value: 'leaf 53' }
    ]
    findAncestor(tree, nodesToFind)
  }, 'should fail with non-existent nodes')

  t.end()
})

test('should find ancestor with single node', function (t) {
  const nodesToFind = [
    find(tree, { value: 'leaf 5' })
  ]
  const actual = findAncestor(tree, nodesToFind)
  const expected = find(tree, { id: 6 })

  t.equal(actual, expected, 'should work with one node')
  t.equal(actual.data?.depth, 1, `should store depth of 1`)
  t.end()
})

test('should find ancestor with two nodes', function (t) {
  /* @type {Array<Node>} */
  const nodesToFind = [
    find(tree, { value: 'leaf 3' }),
    find(tree, { value: 'leaf 5' })
  ]
  const actual = findAncestor(tree, nodesToFind)
  const expected = find(tree, { id: 5 })

  t.equal(actual, expected, 'should work with two nodes')
  t.equal(actual.data?.depth, 2, `should store depth of 2`)
  t.end()
})

test('should find ancestor with more than two nodes', function (t) {
  const nodesToFind = [
    find(tree, { value: 'leaf 1' }),
    find(tree, { value: 'leaf 3' }),
    find(tree, { value: 'leaf 5' }),
    find(tree, { value: 'leaf 6' })
  ]
  const actual = findAncestor(tree, nodesToFind)
  const expected = find(tree, { id: 3 })

  t.equal(actual, expected, 'should work with more than two nodes')
  t.equal(actual.data?.depth, 3, `should store depth of 3`)
  t.end()
})

test('should include ancestor in response', function (t) {
  const nodesToFind = [
    find(tree, { id: 3 }),
    find(tree, { id: 4 }),
    find(tree, { id: 5 }),
  ]
  const actual = findAncestor(tree, nodesToFind, true)
  const expected = find(tree, { id: 3 })

  t.equal(actual, expected, 'should return node if ancestor')
  t.equal(actual.data?.depth, 2, `should store depth of 2`)
  t.end()
})
