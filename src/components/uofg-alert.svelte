<svelte:options
  customElement={{
    tag: 'uofg-alert',
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
        }
      };
    },
  }}
/>

<script>
  import attachTailwind from '../lib/attach-tailwind.js';
  import FontAwesomeIcon from '../lib/font-awesome-icon.svelte';
  import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex flex-col text-3xl">
  <div
    class="flex items-center bg-uofg-red p-8 text-4xl text-white [&>svg]:mr-4 [&>svg]:h-[1.5em] [&>svg]:fill-current"
  >
    <FontAwesomeIcon icon={faCircleExclamation} />
    <slot name="title" />
  </div>

  <div
    class={`flex flex-col bg-white px-8 py-6 [&>slot[name="message"]::slotted(*)]:text-2xl [&>slot[name="subtitle"]::slotted(*)]:mb-8 [&>slot[name="subtitle"]::slotted(*)]:text-4xl [&>slot[name="subtitle"]::slotted(*)]:font-bold`}
  >
    <slot name="subtitle" />
    <slot name="message" />
  </div>

  <div class="flex bg-uofg-grey px-8 py-4 text-2xl">
    <slot name="footer" />
  </div>
</div>
