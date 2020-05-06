const test = require('tape')
const u = require('unist-builder')
const find = require('unist-util-find')
const commonAncestor = require('./index')

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

  t.test('should find with one node', function (st) {
    const targets = [
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, targets)
    const expected = find(tree, { id: 6 })

    st.equal(actual, expected)
    st.end()
  })

  t.test('should find with two nodes', function (st) {
    const targets = [
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, targets)
    const expected = find(tree, { id: 5 })

    st.equal(actual, expected)
    st.end()
  })

  t.test('should find with four nodes', function (st) {
    const targets = [
      find(tree, { value: 'leaf 0' }),
      find(tree, { value: 'leaf 1' }),
      find(tree, { value: 'leaf 3' }),
      find(tree, { value: 'leaf 5' })
    ]
    const actual = commonAncestor(tree, targets)
    const expected = tree

    st.equal(actual, expected)
    st.end()
  })
})
