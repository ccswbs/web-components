# uofg-modal

This is a utility component, and its content is meant to be styled by the developer using it. It makes it simpler to make accessible and animated modal content in your pages.

## Usage

```html
<uofg-modal>
  <!--YOUR CONTENT HERE-->
</uofg-modal>
```

## CSS Shadow Parts

Certain parts of this component use [CSS Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part). This allows you to style elements of the component that appear in the Shadow DOM.

| Part           | Description                                    |
| -------------- | ---------------------------------------------- |
| content        | Allows for styling the modal content container |
| dismiss-button | Allows for styling the modal dismiss button    |

For example, by default the dismiss button of the modal is colored white, you may have content which has a white background and subsequently the button blends into it. So you could use CSS Shadow Parts to change the button into a different color (let's say black).

You can change the color of the button using the following css:

```css
uofg-modal::part(dismiss-button) {
  color: black;
}
```

This works for any CSS property, but make note that changing the style too much may cause issues with the default styles.

Also, make sure the dismiss button is always visible, this is not only important for accessibility but internally, the component relies on the button being focusable to trap the focus inside the modal when it is open (ONLY ON BROWSERS WITHOUT INERT SUPPORT).

For example, this is bad and under no circumstances should be done:

```css
uofg-modal::part(dismiss-button) {
  display: none;
}
```

While browser support for CSS Shadow Parts is wide, the component does have a fallback for styling certain parts of the Shadow DOM using CSS Custom Properties (see below)

## CSS Custom Properties

This component uses [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to define styles for some of its Shadow DOM content

| Property                   | Description                                     | Type                                                                      | Default |
| -------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- | ------- |
| --uofg-modal-dismiss-color | Determines the color of the dismiss button icon | [CSS Color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) | `#fff`  |


# Known Issues

- On older browsers (particularly ones who do not support the [inert attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)), VoiceOver on macOS/IPadOS/IOS can focus outside the modal when it is open and the user uses reading mode rather than tabbing. 

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


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"content"`        |             |
| `"dismiss-button"` |             |


----------------------------------------------

[University of Guelph Web Components](https://github.com/ccswbs/web-components)
