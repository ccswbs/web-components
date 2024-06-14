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

  let visible = false;
  let scrollY = 0;

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  $: visible = scrollY > 50;
</script>

<svelte:window bind:scrollY />

<button
  on:click={scrollToTop}
  class={twJoin(
    'flex z-10 justify-center items-center text-4xl w-16 h-16 border border-white bg-black fixed bottom-4 right-4 text-white hover:bg-uofg-red focus:bg-uofg-red transition',
    visible ? 'opacity-100' : 'opacity-0',
  )}
>
  <FontAwesomeIcon icon={faChevronUp} />
</button>
