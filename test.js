import test from 'tape'
import { u } from 'unist-builder'
import find from 'unist-util-find'
import findAncestor from './index.js'

test('unist-util-ancestor', function (t) {
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

  t.throws(function () {
    // @ts-expect-error runtime
    findAncestor()
  }, 'should fail without tree')

  t.throws(function () {
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

  t.test('should find ancestor with one node', function (st) {
    const nodesToFind = [
      find(tree, { value: 'leaf 5' })
    ]
    const actual = findAncestor(tree, nodesToFind)
    const expected = find(tree, { id: 6 })

    st.equal(actual, expected, 'should work with 1')
    st.end()
  })

  t.test('should find ancestor with two nodes', function (st) {
    const nodesToFind = [
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' })
    ]
    const actual = findAncestor(tree, nodesToFind)
    const expected = find(tree, { id: 5 })

    st.equal(actual, expected, 'should work with 2')
    st.end()
  })

  t.test('should find ancestor with more than two nodes', function (st) {
    const nodesToFind = [
      find(tree, { value: 'leaf 1' }),
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' }),
      find(tree, { value: 'leaf 6' })
    ]
    const actual = findAncestor(tree, nodesToFind)
    const expected = find(tree, { id: 3 })

    st.equal(actual, expected, 'should work with more than 2 nodes')
    st.end()
  })

  t.end()
})
