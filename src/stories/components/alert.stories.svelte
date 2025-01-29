<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import '../../components/uofg-alert.svelte';

  const { Story } = defineMeta({
    title: 'Components/Alert',
    component: 'uofg-alert',
    parameters: {
      layout: 'padded',
    },
  });
</script>

<Story name="Basic">
  <uofg-alert>
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
  </uofg-alert>
</Story>

<Story name="With Subtitle">
  <uofg-alert>
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
    <span slot="subtitle">YOUR SUBTITLE HERE</span>
  </uofg-alert>
</Story>

<Story name="With Footer">
  <uofg-alert>
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
    <span slot="subtitle">YOUR SUBTITLE HERE</span>
    <span slot="footer">YOUR FOOTER CONTENT HERE</span>
  </uofg-alert>
</Story>


<Story name="Yellow">
  <uofg-alert color="yellow">
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="subtitle">YOUR SUBTITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
    <span slot="footer">YOUR FOOTER CONTENT HERE</span>
  </uofg-alert>
</Story>

<Story name="Blue">
  <uofg-alert color="blue">
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="subtitle">YOUR SUBTITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
    <span slot="footer">YOUR FOOTER CONTENT HERE</span>
  </uofg-alert>
</Story>

<Story name="Green">
  <uofg-alert color="green">
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="subtitle">YOUR SUBTITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
    <span slot="footer">YOUR FOOTER CONTENT HERE</span>
  </uofg-alert>
</Story>