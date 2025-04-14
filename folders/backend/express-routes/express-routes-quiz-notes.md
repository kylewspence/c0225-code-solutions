# express-routes-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the conventional HTTP methods for each of the CRUD operations? Is the server required to implement the methods according to this convention?

  • Create → POST
  • Read → GET
  • Update → PUT or PATCH
  • Delete → DELETE

  Not required, but standard.

- What is Express middleware?

A function that handles request/response before the final route.

- What is Express middleware useful for?

Logging, auth, parsing, error handling.

- How do you mount a middleware with an Express application?

app.use() or app.METHOD(path, middleware).

- Which objects does an Express application pass to your middleware to manage the request/response lifecycle of the server?

req, res, next.

- How do you specify and retrieve route parameters?

Use :param in the path, access with req.params.param.

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
