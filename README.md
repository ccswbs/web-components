# University of Guelph Web Components Library

This is a collection of web components for use on various University of Guelph web pages. These components are
built using [Stencil](https://stenciljs.com/), a compiler which makes developing component libraries fast and simple.

## Including the components in a page

The best way to include the components in a page is to use [unpkg](https://www.unpkg.com), a fast and global CDN for everything on npm.

Put the following in the head of your HTML to always load the latest version

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@uoguelph/web-components/dist/uofg-web-components/uofg-web-components.css"
/>
<script
  type="module"
  src="https://unpkg.com/@uoguelph/web-components/dist/uofg-web-components/uofg-web-components.esm.js"
></script>
```

If you want to load a specific version, follow the guide on [the unpkg website](https://www.unpkg.com).

## Using the components

[See the documentation for each component](/docs/components)

## Developing the components

[See the development guide](/development-guide.md)
