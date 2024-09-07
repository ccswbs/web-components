<script>
  import { twJoin } from 'tailwind-merge';
  import Logo from '../logo.svelte';
  import UofGHLogo from '../../../svg/uofgh-logo.svg';
  import Desktop from './desktop.svelte';
  import Mobile from './mobile.svelte';
  import { getContext } from 'svelte';
  import { primary as ridgetown } from '../links/ridgetown-links.js';
  import { primary as main } from '../links/main-links.js';

  const state = getContext('header-state');
  const links = $state?.variant === 'ridgetown' ? ridgetown : main;
</script>

<nav
  class={twJoin(
    'relative w-full justify-between flex lg:h-[10rem] bg-black px-[calc((100%-1320px)/2)] text-3xl text-white',
    $state?.variant === 'dual-brand' ? 'h-[7.5rem]' : 'h-[5rem]',
  )}
  aria-label="Primary"
>
  <Logo />

  {#if $state?.variant === 'dual-brand'}
    <a
      href="https://www.guelphhumber.ca"
      class="w-auto h-full p-6 ml-auto transition-opacity focus:opacity-75 hover:opacity-75"
    >
      <UofGHLogo />
    </a>
  {:else if $state?.mode === 'desktop'}
    <Desktop />
  {:else}
    <Mobile />
  {/if}
</nav>
