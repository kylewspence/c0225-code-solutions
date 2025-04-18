# react-context-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the purpose of React "context"?

The purpose of React context is to share data between components without passing props manually through every level of the component tree.

- What values can be stored in context?

Any value can be stored in context, including objects, arrays, functions, strings, numbers, etc.

- How do you create context and make it available to the components?

You create context with createContext, then use a Context.Provider to supply the value to components inside its tree.

- How do you access the context values?

You access context values using the useContext hook.

- When would you use context? (in addition to the best answer: "rarely")

You use context when data needs to be accessible by many components at different nesting levels, like for themes, authentication, or global state.

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
