# express-postgres-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the purpose of the `pg` NPM package?

It allows Node.js apps to connect to and interact with a PostgreSQL database.

- How do you tell `pg` which database to connect to?

By setting the connectionString when creating a new pg.Pool.

- How do you send SQL to PostgreSQL from your Express server?

Use await db.query(sql) inside an async Express route.

- How do you access the rows that get returned from the SQL query?

Use result.rows, which is always an array of objects.

- What must you always remember to put around your asynchronous route handlers? Why?

A try/catch block to handle errors and pass them to next() for middleware handling.

- What is a SQL Injection Attack and how do you avoid it in `pg`?

It’s when malicious input alters your query; avoid it by using parameterized queries with $1, $2, etc., instead of string interpolation.

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
