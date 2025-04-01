# react-effects-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- When is a component "mounted" to the DOM?

When react finishes rendering.

- What is a React Effect?

code that runs after component renders.

- When should you use an Effect and when should you not use an Effect?

Use it when running logic that interacts with the outside world or when
wanting something to happen after render.

Dont use it when calculating something based on props or state.
Dont use it when trying to synchronize state.

- When do Effects run?

After the component renders to the DOM.

- What function is used to declare an Effect?

UseEffect(() => {}, []);

- What are Effect dependencies and how do you declare them?

Dependencies are values like state or props that your effect depends on.
List them in the Array brackets - the depedency array.

- Why would you want to clean up from an Effect?

Prevent memory leaks.
Avoid bugs from multiple versions of something running at once.
Keep app performant and predictable.

- How do you clean up from an Effect?

Return a cleanup function.

- When does the cleanup function run?

Before the Effect runs again. When component unmounts.

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
