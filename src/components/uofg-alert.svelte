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
  import { twJoin } from 'tailwind-merge';

  let { color = 'red' } = $props();
</script>

<div class="flex flex-col">
  <div
    class={twJoin(
      `flex items-center p-4 text-lg [&>svg]:mr-4 [&>svg]:h-[1.5em] [&>svg]:fill-current`,
      color === 'red' && 'bg-red text-red-contrast',
      color === 'yellow' && 'bg-yellow text-yellow-contrast',
      color === 'blue' && 'bg-blue text-blue-contrast',
      color === 'green' && 'bg-green text-green-contrast',
    )}
  >
    <FontAwesomeIcon icon={faCircleExclamation} />
    <slot name="title" />
  </div>

  <div
    class={`flex flex-col bg-white px-6 py-3 [&>slot[name="subtitle"]::slotted(*)]:mb-4 [&>slot[name="subtitle"]::slotted(*)]:text-xl [&>slot[name="subtitle"]::slotted(*)]:font-bold border-light-grey border-t-0 border`}
    class:border-b={!$$slots?.footer}
  >
    <slot name="subtitle" />

    <span
      class={`[&>slot[name=\"message"]::slotted(*)]:text-base [&>slot[name="message"]::slotted(a)]:text-blue-text [&>slot[name="message"]::slotted(a)]:px-1 [&>slot[name="message"]::slotted(a:hover)]:bg-blue [&>slot[name="message"]::slotted(a:hover)]:text-blue-contrast [&>slot[name="message"]::slotted(a:hover)]:transition-colors [&>slot[name="message"]::slotted(a:hover)]:decoration-transparent`}
    >
      <slot name="message" />
    </span>
  </div>

  <div class="flex bg-grey-light text-grey-light-contrast" class:px-4={$$slots?.footer} class:py-2={$$slots?.footer}>
    <slot name="footer" />
  </div>
</div>
