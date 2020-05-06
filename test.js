const test = require('tape')
const u = require('unist-builder')
const find = require('unist-util-find')
const commonAncestor = require('./index')

test('unist-common-ancestor', function (t) {
  const tree = u('root', [
    u('subtree', {id: 1}, [
      u('node', [
        u('leaf', 'leaf 0')
      ])
    ]),
    u('subtree', {id: 2}, [
      u('node', [
        u('leaf', 'leaf 1'),
        u('leaf', 'leaf 2')
      ]),
      u('node', [
        u('leaf', 'leaf 3'),
        u('node', [
          u('leaf', 'leaf 4'),
          u('leaf', 'leaf 5')
        ])
      ]),
      u('leaf', {id: 3}, 'leaf 6'),
      u('void', {id: 4})
    ])
  ])
  // console.log(tree)

  t.throws(function () {
    find()
  }, 'should fail without tree')

  t.throws(function () {
    find(tree)
  }, 'should fail without child')

  t.test('should find with string child', function (st) {
    const targets = [
      // find(tree, {value: 'leaf 0'}),
      // find(tree, {value: 'leaf 1'}),
      find(tree, {value: 'leaf 3'}),
      find(tree, {value: 'leaf 5'})
    ]
    const result = commonAncestor(tree, targets)
    console.log(result)

    // st.equal(result, tree.children[0].children[0])

    st.end()
  })
})
