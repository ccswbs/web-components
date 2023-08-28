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

Loading the latest version is not best practice, as a new version of the package may be released which has breaking changes and may result in your page being affected.

Instead, it's best to specify a semver range. As the package follows semantic versioning, versions follow this syntax:
`x.x.x` where the first x represents major releases with potentially breaking changes, the second is minor releases with new features but maintains backwards compatibility, and finally the third which represents small bug fixes which are also backwards compatible.

For example `1.x.x` represents the latest version of the v1 major release.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components/uofg-web-components.css"
/>
<script
  type="module"
  src="https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components/uofg-web-components.esm.js"
></script>
```

Including the components this way, ensures that your page will run as expected, until you are ready to update to the latest major release.

For more information, check out the guide on [the unpkg website](https://www.unpkg.com).

### Fonts

Some of the components were designed with specific fonts in mind, for example the uofg-header uses Roboto Condensed, a web font that is not included in most browsers/systems. As a result, it is recommended you include these fonts using the Google Fonts API:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />
```

Note the components will still function exactly as expected if these fonts are not included, but may differ slightly in looks.

## Using the components

[See the documentation for each component](/docs/components)

## Developing the components

[See the development guide](/development-guide.md)
