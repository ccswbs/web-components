# uofg-modal

This is a utility component, and is meant to be styled by the developer using it. It makes it simpler to make accessible and animated modal content in your pages.

## Usage

```html
<uofg-modal>
  <!--YOUR CONTENT HERE-->
</uofg-modal>
```

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                                                                                                                                                       | Type      | Default     |
| ---------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `alertDialog`    | `alert-dialog`    | Used to determine whether the modal should be rendered as an alert dialog. This is useful for when you want to use the modal to alert the user of something, rather than to ask the user to make a decision. If this is set to true, the modal will be rendered with a role of "alertdialog" instead of "dialog". | `boolean` | `false`     |
| `autoOpen`       | `auto-open`       | Used to determine whether the modal should open automatically when the component is first rendered. It is important to ensure this is only set to true for ONE modal on the page.                                                                                                                                 | `boolean` | `false`     |
| `centered`       | `centered`        | Used to determine whether the modal content is centered vertically.                                                                                                                                                                                                                                               | `boolean` | `false`     |
| `label`          | `label`           | The label for the modal. It is recommended that you set this to describe the modal's content. This is required for accessibility.                                                                                                                                                                                 | `string`  | `undefined` |
| `staticBackdrop` | `static-backdrop` | Used to determine whether clicking on the backdrop of the modal will close the modal. If this is set to true, clicking on the backdrop will NOT close the modal.                                                                                                                                                  | `boolean` | `false`     |


## Methods

### `close() => Promise<void>`

Closes the modal.

#### Returns

Type: `Promise<void>`

empty Promise.

### `getState() => Promise<boolean>`

Get the current state of the modal.

#### Returns

Type: `Promise<boolean>`

A promise which will resolve to true when the modal is open, or false when the modal is closed.

### `open() => Promise<void>`

Opens the modal.

#### Returns

Type: `Promise<void>`

empty Promise.

### `setState(value: boolean) => Promise<void>`

Set the state of the modal.

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<boolean>`

Toggle the state of the modal.

#### Returns

Type: `Promise<boolean>`

A promise which will resolve to true (if the modal opened) or false (if the modal closed).


----------------------------------------------

[University of Guelph Web Components](https://github.com/ccswbs/web-components)
