# University of Guelph Web Components Library

It is recommended that you read the [Stencil docs](https://stenciljs.com/docs/overview) before continuing. This will
give you a good understanding of how the components are built and how to develop them.

## Getting Started

To start, clone this repo to a new directory:

```bash
git clone git@github.com:ccswbs/web-components.git
cd web-components
```

### Setting up Font Awesome

The components use [Font Awesome](https://fontawesome.com/) for icons. As we use the pro version, you will need to do some setup to get it working.

1. Login to the C&M Web Team Font Awesome account or another account with access to the pro version.
2. Navigate to this [page](https://fontawesome.com/account) and copy the Package Manager Token.
3. Set the FONTAWESOME_NPM_AUTH_TOKEN environment variable to the token value. [Here is a good guide for how to do so](https://www.twilio.com/blog/how-to-set-environment-variables-html).

### Installing dependencies

We use [npm](https://www.npmjs.com/) to manage dependencies. If you don't have npm installed, you can download it [here](https://www.npmjs.com/get-npm).

Once installed, run the following command.

```bash
npm install
```

This will install all the dependencies for the project. Note that this may take a while. Once the command is complete, you are ready to start developing the components.

## Folder Structure

There are a few important folders in this repo:

- `src/components`: This is where all the components are stored. Each component has its own directory with the
  component's files inside.
- `src/global.scss`: This is where global styles are stored. This acts as a place to define css variables as well as any
  other styles that are needed outside the shadow dom of any specific component.
- `src/index.html`: This is the html file for the demo page. This is where you can add new components and other markup
  to the demo page.
- `src/index.ts`: This is the entry point for the demo page. This file should not be modified.
- `src/components.d.ts`: This is where the typescript types for the components are stored. This file is automatically
  generated and should not be modified.
- `src/utils`: This is where utility code that is meant to be used by multiple components lives. For example
  the `font-awesome-icon.tsx` file is a functional component ([read more
  here](https://stenciljs.com/docs/functional-components)), it can be used to display font awesome icons in components
  using the Font Awesome JavaScript/SVG library.
- `www`: This is where the demo page is built to. This directory is automatically generated and should not be modified.
- `dist`: This is where the components are built to. This directory is automatically generated and should not be
  modified.

## Building the components

During development, you can start a local development server with the following command:

```bash
npm start
```

This will open a browser window with a demo page for the components. As you make changes to the components, the page
will automatically reload to reflect the changes. (When building a warning will be displayed about the source maps being broken, this can safely be ignored.)

As was mentioned above the html file for the demo page can be found at `src/index.html`.

To build the components for production, run the following command:

```bash
npm run build
```

This will build the components and output them to the `dist` directory.

## Adding a new component

To add a new component, run the following command:

```bash
npm run generate
```

You will be prompted to enter the name of the component. Note that the name must be in kebab-case and should start with
uofg (e.g. `uofg-new-component`).

Finally, you will be prompted to select the additional files that should be generated (i.e. css, unit tests, e2e tests).
Currently unit tests and e2e tests are not setup, so you can skip those for now.

Once the command is complete, a new directory in `src/components` with the name of the component will be created. Inside
this directory you will find the files that you selected to generate alongside a .tsx file which serves as the
component's main file.

And that's it! You can now start developing your new component. For more information on actual development, see
the [Stencil docs](https://stenciljs.com/docs/overview) or take a look at some of the existing component's source code
for examples.
