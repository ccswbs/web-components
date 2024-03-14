# University of Guelph Web Components Library

It is recommended that you read/go through the following before continuing. This will give you a good understanding of how the components are built and how to develop them.

- [Svelte Tutorial](https://learn.svelte.dev/tutorial/welcome-to-svelte)
- [Svelte Docs](https://svelte.dev/docs/introduction)
- [TailwindCSS docs](https://tailwindcss.com)
- [Svelte Custom Elements Docs](https://svelte.dev/docs/custom-elements-api)
- [Web Components Explained](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

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

- `src/components`: This is where all the components are stored. Each component is a single svelte file.
- `src/styles/global.css`: This is where global styles are stored. This acts as a place to define css variables as well as any
  other styles that are needed outside the shadow dom of the components.
- `src/styles/tailwind.css`: This is the base TailwindCSS stylesheet. You can define layers here, for more information see [here](https://tailwindcss.com/docs/functions-and-directives#layer).
- `index.html`: This is the html file for the demo page. This is where you can add new components and other markup
  to the demo page to test.
- `src/main.js`: This is the main entry point for the components library. When you add a new component, you must import it
  and then export it here, unless you do not want the new component to be included in the main library and wish for it to be included separately.
- `src/lib`: This is where utility code that is meant to be used by multiple components lives. For example
  the `font-awesome-icon.tsx` file is a svelte component that used to display font awesome icons using the Font Awesome JavaScript/SVG library.
- `tailwind.config.js`: This is our TailwindCSS config file, it contains the definition of our TailwindCSS theme. For the most part this file should be left untouched unless you need to modify a theme value.
- `dist/uofg-web-components`: This is where the components are built to. This directory is automatically generated and should not be
  modified.
- `docs`: This is where documentation of each individual component lives.

## Building the components

During development, you can start a local development server with the following command:

```bash
npm dev
```

This will open a browser window with a demo page for the components. As you make changes to the components, the page
will automatically reload to reflect the changes.

As was mentioned above the html file for the demo page can be found at `index.html`.

To build the components for production, run the following command:

```bash
npm run build
```

This will build the components and output them to the `dist/uofg-web-components` directory.

## Adding a new component

To add a new component, create a svelte file in the `src/components` directory. The name of the file should be the name of the component in kebab case and must begin with `uofg` (ex. `uofg-my-component.svelte`).

Below is an example of the bare minimum needed for a component:

```svelte
<svelte:options
  customElement={{
    tag: 'uofg-my-component',
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
        }
      }
    }
  }}
/>

<script lang="ts">
  import { attachTailwind } from '../../utils/tailwind';
</script>
```

For more information on how to build components, see the source code of the existing components.

## Documenting a component

Its important the whenever a new component is added, or an older one has new features, that there is good documentation explaining how the component is actually used.

To document a component, create a folder named after your component in the docs folder and create a readme.md file in that folder (ex. `docs/YOURCOMPONENT/readme.md`). For your readme.md file follow this template.

```markdown
# COMPONENT NAME

GIVE A GOOD DESCRIPTION OF THE COMPONENT

## Usage

GIVE AN EXAMPLE OF HOW TO USE THE COMPONENT

## Properties

| Property | Attribute | Description | Type | Default |
| -------- | --------- | ----------- | ---- | ------- |

## Events

| Event | Description | Type |
| ----- | ----------- | ---- |

## Methods

### `methodName(parameter: parameterType) => returnType`

DESCRIPTION OF THE METHOD

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Returns

Type: `RETURN_TYPE`

## CSS Custom Properties

| Property | Description | Default |
| -------- | ----------- | ------- |

## Shadow Parts

| Part               | Description                       |
| ------------------ | --------------------------------- |


---

[University of Guelph Web Components](https://github.com/ccswbs/web-components)
```

## Publishing to npm

The University of Guelph Web Components Library is hosted as a npm package, making it simpler for development teams to use it. As a result when changes are made, the package must be republished to npm.

To publish you must do the following:

1. Ensure you have a npm account with organization access to [https://www.npmjs.com/package/@uoguelph/web-components](https://www.npmjs.com/package/@uoguelph/web-components).
2. Update the package version using the command `npm version NEW_VERSION_NUMBER_HERE`. Note the version number must follow the semantic version guidelines outlined [here](https://docs.npmjs.com/about-semantic-versioning) or instead of specifying the version your self use one of the following `major | minor | patch | premajor | preminor | prepatch` (NOTE: `premajor | preminor | prepatch` must be followed with `--preid rc` )
3. Finally, publish the package using the command `npm publish `.

Before publishing a new production version of the package, it is important to do the following:

1. Test the package on the demo page.
2. Ensure all the components have documentation.
3. Publish a beta version of the package first (e.g. `npm version {premajor | preminor | prepatch}`) and test it on other environments. For example, if you have access to [Netlify](https://app.netlify.com/sites/ugconthub), you can modify the environment variable UOFG_WC_VERSION from 1.x.x to whatever your beta version is and test the package on content hub pages.
