<svelte:options
  customElement={{
    tag: 'uofg-alert',
    props: {
      color: { reflect: true, type: 'String', attribute: 'color' },
    },
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

  let { color = 'red' } = $props();
</script>

<div class="flex flex-col">
  <div
    class="flex items-center p-4 text-lg [&>svg]:mr-4 [&>svg]:h-[1.5em] [&>svg]:fill-current"
    class:bg-red={color === 'red'}
    class:bg-yellow={color === 'yellow'}
    class:bg-green={color === 'green'}
    class:bg-blue={color === 'blue'}
    class:text-white={color === 'red' || color === 'blue' || color === 'green'}
  >
    <FontAwesomeIcon icon={faCircleExclamation} />
    <slot name="title" />
  </div>

  <div
    class={`flex flex-col bg-white px-6 py-3 [&>slot[name="message"]::slotted(*)]:text-base [&>slot[name="subtitle"]::slotted(*)]:mb-4 [&>slot[name="subtitle"]::slotted(*)]:text-xl [&>slot[name="subtitle"]::slotted(*)]:font-bold border-light-grey border-t-0 border`}
    class:border-b={!$$slots?.footer}
  >
    <slot name="subtitle" />
    <slot name="message" />
  </div>

  <div class="flex bg-light-grey text-lg" class:px-4={$$slots?.footer} class:py-2={$$slots?.footer}>
    <slot name="footer" />
  </div>
</div>
