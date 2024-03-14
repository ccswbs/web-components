<script>
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import focuswithin from '../lib/focus-within.js';

  let className;

  export let open = false;
  export let as = 'div';
  export let transition = slide;
  export let buttonClass = '';
  export let contentClass = '';
  export let autoCollapse = true;

  export { className as class };
</script>

<div
  class={className}
  tabindex="-1"
  on:focusoutside={() => {
    if (autoCollapse) open = false;
  }}
  use:focuswithin
>
  <button
    class={buttonClass}
    aria-haspopup="true"
    aria-expanded={open}
    on:click={e => {
      open = !open;
      e.target.focus();
    }}
  >
    <slot name="button" />
  </button>

  {#if open}
    <svelte:element this={as} class={contentClass} transition:transition={{ duration: 200, easing: cubicInOut }}>
      <slot />
    </svelte:element>
  {/if}
</div>
