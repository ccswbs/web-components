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

Also, make sure the dismiss button is always visible, this is not only important for accessibility but internally, the component relies on the button being focusable to trap the focus inside the modal when it is open.

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

<!-- Auto Generated Below -->
