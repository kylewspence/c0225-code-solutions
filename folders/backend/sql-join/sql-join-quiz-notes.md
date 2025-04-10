# sql-join-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is a foreign key?

A foreign key is a column that creates a link between two tables by referencing the primary key in another table.

- How do you join two SQL tables? (Provide at least two syntaxes.)

JOIN "customers" USING ("customerId")
JOIN customers c ON p.customerId = c.customerId

- How do you temporarily rename columns or tables in a SQL statement?

SELECT "cities"."name" AS "city", "countries"."name" AS "country"

- How do you create a one-to-many relationship between two tables?

JOIN "castMembers" USING ("filmId")

- How do you create a many-to-many relationship between two tables?

FROM "actors"
JOIN "castMembers" USING ("actorId")
JOIN "films" USING ("filmId")

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
