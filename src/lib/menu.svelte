<script>
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import focuswithin from '../lib/focus-within.js';

  /**
   * @typedef {Object} Props
   * @property {any} class
   * @property {boolean} [open]
   * @property {string} [as]
   * @property {any} [transition]
   * @property {string} [buttonClass]
   * @property {string} [contentClass]
   * @property {boolean} [autoCollapse]
   * @property {any} buttonAriaLabel - For accessibility, the button may need a label
   * @property {import('svelte').Snippet} [button]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    class: className,
    open = $bindable(false),
    as = 'div',
    transition = slide,
    buttonClass = '',
    contentClass = '',
    autoCollapse = true,
    buttonAriaLabel,
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
  use:focuswithin
>
  <button
    class={buttonClass}
    aria-haspopup="true"
    aria-expanded={open}
    aria-label={buttonAriaLabel}
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
