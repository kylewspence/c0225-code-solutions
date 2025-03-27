# react-state-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are _hooks_ in React?
  Special functions that allow access React features.

- What are the "Rules of Hooks"? (if necessary, re-read the "Pitfall" box in [State](https://react.dev/learn/state-a-components-memory))

must start with the word use followed by Uppercase.
Hooks can only be called by React components and other hooks.
All hooks must be called at the top level of a component.

- What is the purpose of state in React?
  Store the state of a component between renders.

- Why can't we just maintain state in a local variable?
  local variables get reset on re-render.

- What two actions happen when you call a `state setter` function?
  Updates the cache.
  Schedules re-render.

- When does the local `state variable` get updated with the new value?
  Re-Render > calls function again and thats when it updates.

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
