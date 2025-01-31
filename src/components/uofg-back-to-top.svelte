<svelte:options
  customElement={{
    tag: 'uofg-back-to-top',
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
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
  import { twJoin } from 'tailwind-merge';

  let visible = $state(false);
  let scrollY = $state(0);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  $effect(() => {
    visible = scrollY > 50;
  })
</script>

<svelte:window bind:scrollY />

<button
  onclick={scrollToTop}
  class={twJoin(
    'flex z-10 justify-center items-center text-lg w-10 h-10 border border-white bg-black text-black-contrast fixed bottom-8 right-8 hover:bg-red focus:bg-red hover:text-red-contrast focus:text-red-contrast transition',
    visible ? 'opacity-100' : 'opacity-0',
  )}
>
  <span aria-hidden="true">
    <FontAwesomeIcon icon={faChevronUp} />
  </span>
  <span class="sr-only">Back to top of page</span>
</button>
