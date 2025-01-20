<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import '../../components/uofg-footer/uofg-footer.svelte';

  const { Story } = defineMeta({
    title: 'Components/Footer',
    component: 'uofg-footer',
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<Story name="Basic">
  <uofg-footer></uofg-footer>
</Story>

<Story name="With Links">
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
