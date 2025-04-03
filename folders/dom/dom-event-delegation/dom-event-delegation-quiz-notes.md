# dom-event-delegation-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the `event.target`?
  It is the exact element that was clicked (or triggered the event).
- Why is it possible to listen for events on one element that actually happen its descendent elements?
  Event bubbling allows events to propagate up from child elements to their ancestors.
- What DOM element property tells you what type of element it is?
  The .tagName property (e.g., "BUTTON", "DIV", "LI").
- What does the `element.closest()` method take as its argument and what does it return?
  It takes a css selector as an agument and returns the nearest ancestor that matches it.
- How can you remove an element from the DOM?
  .remove()
- If you wanted to insert new clickable DOM elements into the page using JavaScript, how could you avoid adding an event listener to every new element individually?
  adding the event listener to the parent

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
