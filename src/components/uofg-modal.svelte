<svelte:options
  customElement={{
    tag: 'uofg-modal',
    props: {
      label: { reflect: true, type: 'String', attribute: 'label' },
      alertDialog: { reflect: true, type: 'String', attribute: 'alert-dialog' },
      centered: { reflect: true, type: 'Boolean', attribute: 'centered' },
      autoOpen: { reflect: true, type: 'Boolean', attribute: 'auto-open' },
      staticBackdrop: { reflect: true, type: 'Boolean', attribute: 'static-backdrop' },
    },
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
          this.el = this;
          this.inertElements = [];
        }
        connectedCallback() {
          super.connectedCallback();
        }
        disconnectedCallback() {
          super.disconnectedCallback();

          // Just in case the modal is removed from the DOM before it is closed, make sure to remove the inert attribute from all elements that we marked as inert when the modal was opened.
          for (const element of this.inertElements) {
            element.removeAttribute('inert');
          }
        }
        getState() {
          return this.isOpen;
        }
        setState(value) {
          this.isOpen = value;
        }
        toggle() {
          this.isOpen = !this.isOpen;
          return this.isOpen;
        }
        close() {
          this.isOpen = false;
        }
        open() {
          this.isOpen = true;
        }
      };
    },
  }}
/>

<script>
  import attachTailwind from '../lib/attach-tailwind.js';
  import FontAwesomeIcon from '../lib/font-awesome-icon.svelte';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';
  import { getAllFocusableElements } from '../lib/get-all-focusable.js';

  export let isOpen;
  export let centered;
  export let autoOpen;
  export let label;
  export let alertDialog;
  export let staticBackdrop;
  export let dismissButton;
  export let container;
  export let el;
  export let inertElements;

  const handleOnClick = e => {
    if (staticBackdrop && e.target === e.currentTarget) {
      isOpen = false;
    }
  };
  const handleKeyUp = e => {
    if (e.key === 'Escape') {
      isOpen = false;
    }
  };
  const handleFocusOut = e => {
    if (!isOpen) return; // If the modal is not open, do nothing.

    // If the focus is moving outside the modal
    if (!container.contains(e.relatedTarget) && !el.contains(e.relatedTarget)) {
      e.preventDefault();

      // If the focus is moving away from the dismiss button, focus the last focusable element in the modal.
      if (e.target === dismissButton) {
        const focusableElements = getAllFocusableElements(el);
        focusableElements[focusableElements.length - 1]?.focus();
      } else {
        // Otherwise, focus the dismiss button.
        dismissButton.focus();
      }
    }
  };

  $: {
    if (autoOpen) {
      isOpen = true;
    }
  }

  $: {
    if (isOpen) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            // Focus the container element when the modal is opened, so that the screen reader's will announce the modal when it opens.
            container.focus();
          });
        });
      });

      // Mark outer elements as inert when the modal is open.
      let current = el;

      // We want to mark all elements outside the modal as inert, so we need to traverse up the DOM tree until we reach the body element.

      while (current !== null && current !== document.body) {
        const parent = current.parentElement;

        // If parent is null, then we may be inside a shadow root. If so, we get the host element and continue traversing up the DOM tree.
        if (parent === null) {
          const root = current.getRootNode();

          if (root instanceof ShadowRoot) {
            current = root.host;
            continue;
          }
        }

        if (parent !== null) {
          for (const child of parent.children) {
            if (child !== current && !child.inert) {
              // Mark the element as inert and store it in an array so that we can remove the inert attribute when the modal closes.
              child.inert = true;
              inertElements.push(child);
            }
          }
        }

        current = parent;

        el.dispatchEvent(new CustomEvent('opened', { bubbles: true, composed: true }));
      }
    } else {
      // Remove the inert attribute from all elements that we marked as inert when the modal was opened.
      for (const element of inertElements) {
        element.removeAttribute('inert');
      }

      // Clear the array of inert elements. This is important because we don't want to keep a reference to elements as they may be removed from the DOM and we could cause a memory leak.
      inertElements = [];

      el.dispatchEvent(new CustomEvent('closed', { bubbles: true, composed: true }));
    }

    // Prevent scrolling of the body when the modal is open.
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
</script>

<div
  class="fixed left-0 top-0 z-[1000] flex h-screen w-screen bg-black bg-opacity-50 transition-[opacity,visibility]"
  class:visible={isOpen}
  class:opacity-100={isOpen}
  class:invisible={!isOpen}
  class:opacity-0={!isOpen}
  role={alertDialog ? 'alertdialog' : 'dialog'}
  aria-modal={isOpen ? 'true' : ''}
  aria-label={label}
  tabIndex={-1}
  on:click={handleOnClick}
  on:keyup={handleKeyUp}
  on:focusout={handleFocusOut}
  bind:this={container}
>
  <div
    part="content"
    class={`z-1 absolute left-1/2 h-fit max-h-full w-fit max-w-full -translate-x-1/2 overflow-auto p-8 transition-transform motion-reduce:transition-none ${isOpen ? 'visible opacity-100' : ''} ${isOpen && centered ? 'translate-y-[calc(-50%_-_50px)]' : ''} ${(!isOpen && !centered) || (isOpen && centered) ? 'translate-y-[-50px]' : ''}`}
  >
    <button
      class="absolute right-8 top-8 z-[2] flex h-12 w-12 items-center justify-center border-0 bg-transparent text-3xl p-2 text-[var(--uofg-modal-dismiss-color,white)]"
      part="dismiss-button"
      aria-label="Close modal"
      bind:this={dismissButton}
      on:click={() => (isOpen = false)}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
    <slot />
  </div>
</div>
