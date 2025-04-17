# fetch-in-react-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What JavaScript function in the browser can be used in React to make HTTP requests to a server?

The `fetch()` function can be used in React to make HTTP requests to a server.

- What two things need to be done to properly handle HTTP request errors? Why?

You should check `res.ok` and wrap the request in a `try/catch` block. This ensures both HTTP and network errors are handled.

- How can `useEffect` be used to load data for a component?

Call `useEffect` with a data-fetching function inside it. Set state with the result once the data is fetched.

- How do you use `useEffect` to load component data just once when the component mounts?

Pass an empty array `[]` as the second argument to `useEffect` so it only runs once when the component mounts.

- How do you use `useEffect` to load component data every time the data key changes?

Add the data key (like `[userId]`) to the dependency array in `useEffect` so it re-runs whenever that key changes.

- In a large-scale production app, what are some better alternatives for loading and managing backend data?

React Query and SWR are better alternatives that handle caching, deduping, background updates, and error states automatically.

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
