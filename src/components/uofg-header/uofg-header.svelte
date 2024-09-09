<svelte:options
  customElement={{
    tag: 'uofg-header',
    props: {
      pageTitle: { reflect: true, type: 'String', attribute: 'page-title' },
      pageURL: { reflect: true, type: 'String', attribute: 'page-url' },
      variant: { reflect: true, type: 'String', attribute: 'variant' },
    },
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
        }
        connectedCallback() {
          super.connectedCallback();

          this.updateSubNavigation();

          this.observer ??= new MutationObserver(() => {
            this.updateSubNavigation();
          });

          this.observer.observe(this, { childList: true, subtree: true });
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.observer.disconnect();
        }
        updateSubNavigation() {
          const aToSubNavigationLink = a => {
            const attributes = {};
            a.getAttributeNames()
              .filter(name => name !== 'href')
              .forEach(name => (attributes[name] = a.getAttribute(name)));

            return {
              href: a.getAttribute('href'),
              text: a.textContent,
              attributes,
            };
          };

          this.subNavigation = Array.from(this.children)
            .filter(child => child.tagName === 'A' || child.tagName === 'UL')
            .map(child => {
              switch (child.tagName) {
                case 'A':
                  return aToSubNavigationLink(child);
                case 'UL':
                  const value = {
                    title: child.getAttribute('data-title'),
                    links: Array.from(child.querySelectorAll('a')).map(aToSubNavigationLink),
                  };

                  value.wrapContent = value.links.reduce((shouldWrap, link) => {
                    if (link.text.length > MENU_CHAR_LIMIT) {
                      shouldWrap = true;
                    }

                    return shouldWrap;
                  }, false);

                  return value;
              }
            })
            .filter(val => Boolean(val));
        }
      };
    },
  }}
/>

<script>
  import attachTailwind from '../../lib/attach-tailwind.js';
  import TopNavigation from './top-navigation.svelte';
  import PrimaryNavigation from './primary-navigation/primary-navigation.svelte';
  import SubNavigation from './sub-navigation/sub-navigation.svelte';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  export let subNavigation;
  export let pageTitle;
  export let pageURL;
  export let variant;

  let windowWidth;
  const BREAKPOINT = 1024;
  const MENU_CHAR_LIMIT = 35;

  const state = writable({
    mode: windowWidth >= BREAKPOINT ? 'desktop' : 'mobile',
    variant,
  });

  setContext('header-state', state);

  $: state.set({
    mode: windowWidth >= BREAKPOINT ? 'desktop' : 'mobile',
    variant,
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<header class="relative z-10 w-full font-condensed text-3xl text-black">
  {#if $state.mode === 'desktop' && variant !== 'dual-brand'}
    <TopNavigation />
  {/if}

  <PrimaryNavigation />

  {#if subNavigation.length > 0 || pageTitle}
    <SubNavigation title={pageTitle} url={pageURL} items={subNavigation} />
  {/if}
</header>
