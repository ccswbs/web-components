<script>
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import focuswithin from './focus-within.js';

  /**
   * @typedef {Object} Props
   * @property {string} class
   * @property {boolean} [open]
   * @property {string} [as]
   * @property {any} [transition]
   * @property {string} [buttonClass]
   * @property {string} [contentClass]
   * @property {boolean} [autoCollapse]
   * @property {string} label - For accessibility, the button may need a label
   * @property {import('svelte').Snippet} [button]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    class: className,
    buttonClass = '',
    contentClass = '',
    open = $bindable(false),
    as = 'div',
    transition = slide,
    autoCollapse = true,
    label,
    button,
    children,
  } = $props();
</script>

<div
  class={className}
  tabindex="-1"
  onfocusoutside={() => {
    if (autoCollapse) open = false;
  }}
  data-expanded={open}
  use:focuswithin
>
  <button
    class={buttonClass}
    aria-haspopup="true"
    aria-expanded={open}
    aria-label={label}
    onclick={e => {
      open = !open;
      e.target.focus();
    }}
  >
    {@render button?.()}
  </button>

  {#if open}
    <svelte:element this={as} class={contentClass} transition:transition={{ duration: 200, easing: cubicInOut }}>
      {@render children?.()}
    </svelte:element>
  {/if}
</div>
