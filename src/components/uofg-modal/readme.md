# uofg-modal

This is a utility component, and its content is meant to be styled by the developer using it. It makes it simpler to make accessible and animated modal content in your pages.

## Usage

```html
<uofg-modal>
  <!--YOUR CONTENT HERE-->
</uofg-modal>
```

## Known Issues

- On older browsers (particularly ones who do not support the [inert attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)), VoiceOver on macOS/IPadOS/IOS can focus outside the modal when it is open and the user uses reading mode rather than tabbing.
- If the shadow part for the dismiss button sets styles which would make the button no longer focusable (ex. display: none; visibility: hidden), the component will not trap focus correctly.

<!-- Auto Generated Below -->
