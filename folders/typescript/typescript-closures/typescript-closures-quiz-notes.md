# javascript-conditionals-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- In JavaScript, when is scope determined?

Scope is determined at the time the code is written (compile time), based on where functions and variables are declared.

- What allows JavaScript functions to "remember" variables from their surroundings?

Closures allow functions to remember variables from their lexical scope.

- What values does a closure contain?

A closure contains references to variables from its outer (enclosing) scope.

- When is a closure created?

A closure is created whenever a function is defined inside another function and accesses variables from the outer function.

- How can you tell if a function will be created with a closure?

If the function uses variables that were not passed to it but come from an outer scope, it creates a closure.

- In React, what is one important case where you need to know if a closure was created?

In useEffect, closures can cause stale values if dependencies aren’t correctly set.

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
