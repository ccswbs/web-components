<svelte:options
  customElement={{
    tag: 'uofg-footer',
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
        }
        connectedCallback() {
          super.connectedCallback();

          this.updateSubFooter();

          this.observer ??= new MutationObserver(() => {
            this.updateSubFooter();
          });

          this.observer.observe(this, { childList: true, subtree: true });
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.observer.disconnect();
        }
        updateSubFooter() {
          this.subFooter = Array.from(this.children)
            .filter(child => child.tagName === 'A')
            .map(child => ({ text: child.textContent, href: child.getAttribute('href') }));
        }
      };
    },
  }}
/>

<script>
  import attachTailwind from '../../lib/attach-tailwind.js';
  import SubFooter from './sub-footer.svelte';
  import Logo from './logo.svelte';
  import Social from './social.svelte';
  import Copyright from './copyright.svelte';
  import PrimaryLinks from './primary-links.svelte';
  import Address from './address.svelte';

  let { subFooter } = $props();
</script>

<footer>
  {#if Array.isArray(subFooter) && subFooter.length > 0}
    <SubFooter links={subFooter} />
  {/if}

  <div
    class="flex flex-col content-center gap-6 bg-black px-[max(calc((100%-1320px)/2),2rem)] py-6 text-white md:grid md:grid-cols-2 lg:grid-cols-4"
  >
    <div class="flex flex-col justify-between gap-2">
      <Logo />
      <Social />
      <Copyright />
    </div>

    <PrimaryLinks />

    <Address />
  </div>
</footer>
