# dom-events-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- Why do we log things to the console?
  To check our work
- What is the purpose of events and event handling?
  To look at what users are doing on the web page dynamically.
- Are all possible parameters required to use a JavaScript method or function?
  No, only required parameters need to be passed. Some are optional or default.
- What method of element objects lets you set up a function to be called when a specific type of event occurs?
  .addEventListner()
- What is a callback function?
  A callback function is a function that is passed as an argument to another function and is executed later.
- What object is passed into an event listener callback when the event fires?
  The event object
- What is the `event.target`? If you weren't sure, how would you check? Where could you get more information about it?
  logging event.target
- What is the difference between these two snippets of code?
  ```js
  element.addEventListener('click', handleClick);
  ```
  ```js
  element.addEventListener('click', handleClick());
  ```
  The first one is passing handleClick only once the event occurs.
  Second one sends it immediately which would likely cause an error.

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
