<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import '../../components/uofg-back-to-top.svelte';

  const { Story } = defineMeta({
    title: 'Components/BackToTop',
    component: 'uofg-back-to-top',
    parameters: {
      layout: 'padded',
    },
  });
</script>

<Story name="Basic">
  <div style="height: 1000px"></div>

  <uofg-back-to-top></uofg-back-to-top>
</Story>