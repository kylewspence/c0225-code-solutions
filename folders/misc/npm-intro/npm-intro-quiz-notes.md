# npm-intro-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is NPM?
  Tool for managing javascript packages.

- What is a package?
  Resuable piece of code ("Addons" - WoW??)

- What are some other popular package managers?
  Yarn, pnpm ("CurseForge" - WoW??)

- How can you create a `package.json` with `npm`?
  npm init -y

- What is a dependency and how do you add one to a package?
  package that a project needs to work. npm install package-name

- What happens when you add a dependency to a package with `npm`?
  The package is downloaded into node_modules/.'
  Its listed under dependencies in package.json
  a reference is added to package-lock.json

- What is a devDependency and how do you add one to a package?
  Dependency only used for development.
  npm install package-name --save-dev

- How do you define and run `npm` scripts? Why are these useful?
  Define a script in package.json under "scripts".
  They are useful for automating tasks.

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
