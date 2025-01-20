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

<div class="flex flex-col">
  <div
    class="flex items-center bg-red p-4 text-lg text-white [&>svg]:mr-4 [&>svg]:h-[1.5em] [&>svg]:fill-current"
  >
    <FontAwesomeIcon icon={faCircleExclamation} />
    <slot name="title" />
  </div>

  <div
    class={`flex flex-col bg-white px-6 py-3 [&>slot[name="message"]::slotted(*)]:text-base [&>slot[name="subtitle"]::slotted(*)]:mb-4 [&>slot[name="subtitle"]::slotted(*)]:text-xl [&>slot[name="subtitle"]::slotted(*)]:font-bold`}
  >
    <slot name="subtitle" />
    <slot name="message" />
  </div>

  <div class="flex bg-light-grey px-4 py-2 text-lg">
    <slot name="footer" />
  </div>
</div>
