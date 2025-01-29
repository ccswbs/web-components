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
    <span slot="title">Alert title</span>
    <span slot="message">Alert message</span>
  </uofg-alert>
</Story>

<Story name="With Subtitle">
  <uofg-alert>
    <span slot="title">Alert title</span>
    <span slot="message">Alert message</span>
    <span slot="subtitle">Alert subtitle</span>
  </uofg-alert>
</Story>

<Story name="With Footer">
  <uofg-alert>
    <span slot="title">Alert title</span>
    <span slot="message">Alert message</span>
    <span slot="subtitle">Alert subtitle</span>
    <span slot="footer">Alert footer content</span>
  </uofg-alert>
</Story>

<Story name="With Message Containing Link">
  <uofg-alert>
    <span slot="title">Alert title</span>

    <!-- Make sure the a tag is not wrapped otherwise it will not be correctly styled. -->
    <span slot="message">Alert message&nbsp;</span>
    <a href="#example" slot="message">Example Link</a>

    <span slot="subtitle">Alert subtitle</span>
    <span slot="footer">Alert footer content</span>
  </uofg-alert>
</Story>

<Story name="Yellow">
  <uofg-alert color="yellow">
    <span slot="title">Alert title</span>
    <span slot="subtitle">Alert subtitle</span>
    <span slot="message">Alert message</span>
    <span slot="footer">Alert footer content</span>
  </uofg-alert>
</Story>

<Story name="Blue">
  <uofg-alert color="blue">
    <span slot="title">Alert title</span>
    <span slot="subtitle">Alert subtitle</span>
    <span slot="message">Alert message</span>
    <span slot="footer">Alert footer content</span>
  </uofg-alert>
</Story>

<Story name="Green">
  <uofg-alert color="green">
    <span slot="title">Alert title</span>
    <span slot="subtitle">Alert subtitle</span>
    <span slot="message">Alert message</span>
    <span slot="footer">Alert footer content</span>
  </uofg-alert>
</Story>
