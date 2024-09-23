<script context="module">

  export const meta = {
    title: "Header",
    component: 'uofg-header',
    parameters: {
      layout: 'fullscreen',
    },
  }
</script>

<script>
  import '../components/uofg-header/uofg-header.svelte';
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Story name="Basic">
  <uofg-header></uofg-header>
</Story>

<Story name="With Page Title">
  <uofg-header page-title="Example Department"></uofg-header>
</Story>

<Story name="With Page Link">
  <uofg-header page-title="Example Department" page-url="#example"></uofg-header>
</Story>

<Story name="With Menu">
  <uofg-header page-title="Example Department">
    <a href="#example">Example Menu Link</a>
    <a href="#example">Example Menu Link 2</a>

    <ul data-title="Example Menu">
      <li><a href="#example">Example Menu Link 1</a></li>
      <li><a href="#example">This is a really long Example Menu Link 2</a></li>
      <li><a href="#example">Example Menu Link 3</a></li>
    </ul>
  </uofg-header>
</Story>

<Story name="Dual Brand Variant">
  <uofg-header variant="dual-brand" page-title="Example Department"></uofg-header>
</Story>