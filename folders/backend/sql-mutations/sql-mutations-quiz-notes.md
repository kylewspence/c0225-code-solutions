# sql-mutations-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the SQL _CRUD_ operations?

Create, Read, Update, Delete.

- How do you add a row to a SQL table?

INSERT INTO table (...) VALUES (...);

- How do you add multiple rows to a SQL table at once?

INSERT INTO table (...) VALUES (...), (...), (...);

- How do you update rows in a database table?

UPDATE table SET column = value WHERE condition;

- How do you delete rows from a database table?

DELETE FROM table WHERE condition;

- Why is it important to include a `where` clause in your `update` and `delete` statements?

Prevents unintentional changes to all rows.

- How do you accidentally delete or update all rows in a table?

Omitting WHERE.

- How do you get back the modified row without a separate `select` statement?

Returning \*

- Why did you get an error when trying to delete certain films?

Foreign Key constraint.

Adding some stuff to push again.

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
