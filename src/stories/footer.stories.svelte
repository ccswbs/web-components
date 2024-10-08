<script context="module">

  export const meta = {
    title: "Footer",
    component: 'uofg-footer',
    parameters: {
      layout: 'fullscreen',
    },
  }
</script>

<script>
  import '../components/uofg-footer/uofg-footer.svelte';
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Basic">
  <uofg-footer></uofg-footer>
</Story>

<Story name="With Sub Footer">
  <uofg-footer>
    <a href="#example">Example Menu Link</a>
    <a href="#example">Example Menu Link 1</a>
    <a href="#example">Example Menu Link 2</a>
    <a href="#example">Example Menu Link 3</a>
    <a href="#example">Example Menu Link 4</a>
    <a href="#example">Example Menu Link 5</a>
    <a href="#example">Example Menu Link 6</a>
  </uofg-footer>
</Story>