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
  import PrimaryLinks from './primary-links.svelte';
  import Address from './address.svelte';
  import { social } from './data/guelph.js';

  let { subFooter } = $props();
</script>

<footer>
  {#if Array.isArray(subFooter) && subFooter.length > 0}
    <SubFooter links={subFooter} />
  {/if}

  <div
    class="flex flex-col content-center gap-6 bg-black px-[max(calc((100%-1320px)/2),2rem)] py-12 text-white md:grid md:grid-cols-2 lg:grid-cols-4"
  >
    <div class="flex flex-col gap-1">
      <Logo />
      <Social />
      <a
        class="w-fit underline decoration-transparent transition-colors focus:decoration-white hover:decoration-white"
        href={social.directory}
      >
        Social Media Directory
      </a>
      <a
        class="w-fit underline decoration-transparent transition-colors focus:decoration-white hover:decoration-white"
        href="https://www.uoguelph.ca/web/"
      >
        ©&nbsp;{new Date().getFullYear()}&nbsp;University of Guelph
      </a>
    </div>

    <PrimaryLinks />

    <Address />
  </div>
</footer>
