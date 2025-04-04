# typescript-modal-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the `<dialog>` element used for?
  create modal dialogs that can be shown or hidden with built in browser behavior.

- How do you show and hide a modal dialog?

showModal() and close()

- How do you manipulate child components in React? Why will that no work for the `<dialog>` element?

Props, but they dont work because its methods are only available through direct dom access.

- How do you call the dialog element's functions in React?

ref.current inside useEffect or event handlers.

- How can you render nested components or JSX elements in React?

passing them as children to a parent component.

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
