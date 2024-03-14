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

## Properties

| Property         | Attribute         | Description                                                                                                                                                                                                                                                                                                       | Type      | Default     |
| ---------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `alertDialog`    | `alert-dialog`    | Used to determine whether the modal should be rendered as an alert dialog. This is useful for when you want to use the modal to alert the user of something, rather than to ask the user to make a decision. If this is set to true, the modal will be rendered with a role of "alertdialog" instead of "dialog". | `boolean` | `false`     |
| `autoOpen`       | `auto-open`       | Used to determine whether the modal should open automatically when the component is first rendered. It is important to ensure this is only set to true for ONE modal on the page.                                                                                                                                 | `boolean` | `false`     |
| `centered`       | `centered`        | Used to determine whether the modal content is centered vertically.                                                                                                                                                                                                                                               | `boolean` | `false`     |
| `label`          | `label`           | The label for the modal. It is recommended that you set this to describe the modal's content. This is required for accessibility.                                                                                                                                                                                 | `string`  | `undefined` |
| `staticBackdrop` | `static-backdrop` | Used to determine whether clicking on the backdrop of the modal will close the modal. If this is set to true, clicking on the backdrop will NOT close the modal.                                                                                                                                                  | `boolean` | `false`     |


## Events

| Event    | Description                                                                                             | Type                |
| -------- | ------------------------------------------------------------------------------------------------------- | ------------------- |
| `closed` | Dispatched whenever the modal is closed whether by user interaction or programmatically (e.g. close()). | `CustomEvent<void>` |
| `opened` | Dispatched whenever the modal is opened whether by user interaction or programmatically (e.g. open()).  | `CustomEvent<void>` |


## Methods

### `close() => void`

Closes the modal.

#### Returns

Type: `void`

### `getState() => boolean`

Get the current state of the modal.

#### Returns

Type: `boolean`

A boolean which is true when the modal is open, or false when the modal is closed.

### `open() => void`

Opens the modal.

#### Returns

Type: `void`

### `setState(value: boolean) => void`

Set the state of the modal.

#### Parameters

| Name    | Type      | Description                                                                   |
| ------- | --------- | ----------------------------------------------------------------------------- |
| `value` | `boolean` | The new state, set it to true to open the modal, or false to close the modal. |

#### Returns

Type: `void`

### `toggle() => boolean`

Toggle the state of the modal.

#### Returns

Type: `boolean`

A boolean which is true if the modal opened or false if the modal closed.


## Shadow Parts

| Part               | Description                       |
| ------------------ | --------------------------------- |
| `"content"`        | The modal content container.      |
| `"dismiss-button"` | The button that closes the modal. |


----------------------------------------------

[University of Guelph Web Components](https://github.com/ccswbs/web-components)
