import test from 'tape'
import { u } from 'unist-builder'
import find from 'unist-util-find'

import commonAncestor from './index.js'

test('unist-common-ancestor', function (t) {
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
    commonAncestor()
  }, 'should fail without tree')

  t.throws(function () {
    commonAncestor(tree)
  }, 'should fail without nodes')

  t.throws(function () {
    commonAncestor(tree, [])
  }, 'should fail with empty nodes')

  t.throws(function () {
    const nodes = [{ type: 'leaf', value: 'leaf 55' }]
    commonAncestor(tree, nodes)
  }, 'should fail with non-existing node')

  t.throws(function () {
    const nodes = [
      { type: 'leaf', value: 'leaf 5' },
      { type: 'leaf', value: 'leaf 53' }
    ]
    commonAncestor(tree, nodes)
  }, 'should fail with non-existing nodes')

  t.test('should find ancestor with one node', function (st) {
    const nodes = [
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, nodes)
    const expected = find(tree, { id: 6 })

    st.equal(actual, expected, 'should work with 1')
    st.end()
  })

  t.test('should find ancestor with two nodes', function (st) {
    const nodes = [
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, nodes)
    const expected = find(tree, { id: 5 })

    st.equal(actual, expected, 'should work with 2')
    st.end()
  })

  t.test('should find ancestor with three nodes', function (st) {
    const nodes = [
      find(tree, { value: 'leaf 1' }),
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, nodes)
    const expected = find(tree, { id: 3 })

    st.equal(actual, expected, 'should work with 3')
    st.end()
  })

  t.test('should find ancestor with four nodes', function (st) {
    const nodes = [
      find(tree, { value: 'leaf 0' }),
      find(tree, { value: 'leaf 1' }),
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, nodes)
    const expected = tree

    st.equal(actual, expected, 'should work with 4')
    st.end()
  })

  t.end()
})
