# react-routing-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- How does the browser URL change when navigating through a Single Page App? How does a user expect the URL to change as they navigate through a browser app?

When not using a routing library, navigating between views in a Single Page App (SPA) using useState or conditional rendering does not change the browser URL — it always stays the same, even though the content updates. Users expect the URL to change with each view or “page” — like /about, /details/42, etc. — so they can bookmark pages, use the back/forward buttons, and reload the page without losing their place.

- What NPM package can be used to make navigating a React app behave as users expect?

react-router-dom

- Which React Router component(s) can be used to set up your app's navigation?

BrowserRouter Routes and Route

- How does React Router match the browser URL to one of your app's React components?

React Router compares the current URL path to your defined route paths and renders the matching component.

- What is the purpose of React Router's `Outlet` component?

Placeholder for nested routes to render their child content.

- What React component is used to statically navigate to another page? What HTML element does it render to?

Link - static navigation and renders an anchor element.

- What React Router hook is used to access route path dynamic segments (those that start with `:` in the `path`)?

useParams hook is use to access dynamic segments from the route path.

- What React Router hook is used to navigate programmatically?

useNavigate hook is used to programmatically navigate to different routes.

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
