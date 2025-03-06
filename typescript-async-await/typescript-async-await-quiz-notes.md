# typescript-async-await-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the `async` and `await` keywords used for?
  notating a function as async and a promise.

- How do `async` and `await` differ from `Promise.then` and `Promise.catch`?
  They streamline the code making .then and .catch unnecessary.

- When do you use `async`?
  when defining a function that returns a promise.

- When do you use `await`? When do you _not_ use `await`? (What happens if you `await` a synchronous function?)
  inside an async function to wait for a promise to resolve.
  on sync functions it does nothing. Dont use await when you dont need to wait for the result.

- How do you handle errors with `await`?
  use try...catch

- What do `try`, `catch` and `throw` do? When do you use them?
  try runs code that might fail.
  catch handles errors
  throw creates a custom error

- What happens if you forget to use `await` on a Promise? In that case, what happens to the Promise rejection?
  the function continues running without waiting
  the promise rejection is unhandled unless caught later

- Which style of asynchronous programming do you prefer — callbacks, `Promise.then`, or `async/await`? Why?
  async/await
  It just kind of seemed to click with me. Promise.then seemed clumsy.

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
