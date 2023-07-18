# University of Guelph Web Components Library

It is recommended that you read the [Stencil docs](https://stenciljs.com/docs/overview) and read about the various technologies under [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) before continuing. This will give you a good understanding of how the components are built and how to develop them.

## Getting Started

To start, clone this repo to a new directory:

```bash
git clone git@github.com:ccswbs/web-components.git
cd web-components
```

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
- `src/styles/global.scss`: This is where global styles are stored. This acts as a place to define css variables as well as any
  other styles that are needed outside the shadow dom of any specific component.
- `src/styles`: This is where any scss files that are meant to be imported into a component's stylesheet, for example `src/styles/theme.scss` contains variables, mixins, etc that make it easier for a consistent style between components.
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
- `docs`: This is where documentation of each individual component lives, this should not be modified directly, instead follow the guide [here](#documenting-a-component).

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

## Documenting a component

Its important the whenever a new component is added, or an older one has new features, that there is good documentation explaining the additions/changes.

To document a component, create a readme.md file in the component's src folder (ex. `src/components/YOURCOMPONENT`) following this template.

```markdown
# COMPONENT NAME

GIVE A GOOD DESCRIPTION OF THE COMPONENT

## Usage

GIVE AN EXAMPLE OF HOW TO USE THE COMPONENT

<!-- Auto Generated Below -->

```

Ensure the last line ```markdown <!-- Auto Generated Below --> ``` is included, as Stencil uses it for the documentation it automatically generates itself.

Some documentation will live inside the .tsx or .css/.scss file of a component, for example properties, methods, and events, are all done inside the .tsx, and for css variables inside the .css/.scss. See existing components for examples, or [read the Stencil documentation](https://stenciljs.com/docs/doc-generation).

Once, the documentation is made/updated, run ```bash npm run build```, and the documentation will be generated in the `docs` folder.

## Publishing to npm

The University of Guelph Web Components Library is hosted as a npm package, making it simpler for development teams to use it. As a result when changes are made, the package must be republished to npm, here's how to do that: 

1. You must have a npm account with organization access to [https://www.npmjs.com/package/@uoguelph/web-components](https://www.npmjs.com/package/@uoguelph/web-components).
2. You must update the package version using the command ```bash npm version NEW_VERSION_NUMBER_HERE```. Note the version number must follow the semantic version guidelines outlined [here](https://docs.npmjs.com/about-semantic-versioning)
3. Do a final check, make sure the changes made haven't broken anything, ensure all the components have documentation, etc.
4. Finally, publish the package using the command ```bash npm publish ```. 
