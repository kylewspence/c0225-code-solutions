# ds-bst-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- Briefly describe the Binary Search Tree data structure.

A Binary Search Tree is a tree data structure where each node has at most two children, and left children are less than the parent while right children are greater.

- What are some examples of when you would use a Binary Search Tree?

You would use a BST when you need to store data in a way that allows for fast lookup, insertion, and deletion in sorted order.

- How do you determine if an element is in a Binary Search Tree? What is its time complexity?

Start at the root and traverse left or right based on comparisons until you find the value or reach a dead end; time complexity is O(log n) in a balanced tree.

- How do you add an element into a Binary Search Tree? What is its time complexity?

Start at the root and recursively or iteratively insert the new value in the correct left or right position; time complexity is O(log n) in a balanced tree.

- How do you remove an element from a Binary Search Tree? What is its time complexity?

Find the node to remove and restructure the tree depending on whether it has zero, one, or two children; time complexity is O(log n) in a balanced tree.

## Notes

All student notes should be written here.

How to write `Code Examples` in markdown

for JS:

```javascript
const data = 'Howdy';
```

for HTML:

```html
<div>
  <p>This is text content</p>
</div>
```

for CSS:

```css
div {
  width: 100%;
}
```
