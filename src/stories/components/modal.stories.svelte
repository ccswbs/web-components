<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import '../../components/uofg-modal.svelte';
  import '../../components/uofg-alert.svelte';

  const { Story } = defineMeta({
    title: 'Components/Modal',
    component: 'uofg-modal',
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<Story name="Basic">
  <button
    id="modal-btn"
    onclick={document.querySelector('#basic-modal').open()}
  >
    Open Modal
  </button>
  <uofg-modal id="basic-modal" label="Basic Modal">
    <uofg-alert>
      <span slot="title">YOUR TITLE HERE</span>
      <span slot="subtitle">YOUR SUBTITLE HERE</span>
      <span slot="message">YOUR ALERT MESSAGE HERE</span>
      <span slot="footer">YOUR FOOTER CONTENT HERE</span>
    </uofg-alert>
  </uofg-modal>
</Story>

<Story name="With Static Backdrop">
  <button
    id="modal-btn"
    onclick={document.querySelector('#basic-modal').open()}
  >
    Open Modal
  </button>
  <uofg-modal id="basic-modal" label="Basic Modal" static-backdrop>
    <uofg-alert>
      <span slot="title">YOUR TITLE HERE</span>
      <span slot="subtitle">YOUR SUBTITLE HERE</span>
      <span slot="message">YOUR ALERT MESSAGE HERE</span>
      <span slot="footer">YOUR FOOTER CONTENT HERE</span>
    </uofg-alert>
  </uofg-modal>
</Story>

<Story name="Centered">
  <button
    id="modal-btn"
    onclick={document.querySelector('#basic-modal').open()}
  >
    Open Modal
  </button>
  <uofg-modal id="basic-modal" label="Basic Modal" centered>
    <uofg-alert>
      <span slot="title">YOUR TITLE HERE</span>
      <span slot="subtitle">YOUR SUBTITLE HERE</span>
      <span slot="message">YOUR ALERT MESSAGE HERE</span>
      <span slot="footer">YOUR FOOTER CONTENT HERE</span>
    </uofg-alert>
  </uofg-modal>
</Story>