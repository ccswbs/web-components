<script>
  import { twJoin } from 'tailwind-merge';
  import Decorative from '../../svg/decorative.svg';
  import GuelphLogoSmall from '../../svg/logo-small.svg';
  import GuelphLogo from '../../svg/logo.svg';
  import RidgetownLogoSmall from '../../svg/logo-ridgetown-small.svg';
  import RidgetownLogo from '../../svg/logo-ridgetown.svg';
  import { getContext } from 'svelte';

  const state = getContext('header-state');
</script>

<div class="flex w-fit">
  {#if $state?.mode === 'desktop'}
    <!-- Decorative SVG -->
    <div class="left-0 h-full w-[7.5rem] min-[1320px]:absolute [&>svg]:block [&>svg]:h-full [&>svg]:w-auto">
      <Decorative />
    </div>
  {/if}

  <a
    class={twJoin(
      'flex items-center h-full w-fit transition-opacity focus:opacity-75 hover:opacity-75 min-[1320px]:absolute min-[1320px]:left-[max(calc((100%-1320px)/2),7.5rem)] [&>svg]:block [&>svg]:h-full [&>svg}:w-fit',
      $state?.variant === 'ridgetown' && '[&>svg]:h-2/3',
    )}
    href="https://www.uoguelph.ca"
    aria-label="University of Guelph Home Page"
  >
    {#if $state?.mode === 'desktop' && $state?.variant === 'ridgetown'}
      <RidgetownLogo />
    {:else if $state?.variant === 'ridgetown'}
      <RidgetownLogoSmall />
    {:else if $state?.mode === 'desktop'}
      <GuelphLogo />
    {:else}
      <GuelphLogoSmall />
    {/if}
  </a>
</div>
