<script>
  import { twJoin } from 'tailwind-merge';
  import Decorative from '../../svg/decorative.svg';
  import LogoSmall from '../../svg/logo-small.svg';
  import Logo from '../../svg/logo.svg';
  import { getContext } from 'svelte';

  let { variant } = $props();

  const headerState = getContext('header-state');
</script>

<div class="flex w-fit">
  {#if $headerState?.mode === 'desktop'}
    <!-- Decorative SVG -->
    <div class="left-0 h-full w-[7.5rem] min-[1320px]:absolute [&>svg]:block [&>svg]:h-full [&>svg]:w-auto">
      <Decorative />
    </div>
  {/if}

  <a
    class={twJoin(
      'flex h-full w-fit transition-opacity focus:opacity-75 hover:opacity-75 min-[1320px]:absolute min-[1320px]:left-[max(calc((100%-1320px)/2),7.5rem)] [&>svg]:block [&>svg]:h-full',
      $headerState?.mode === 'desktop'
        ? '[&>svg]:w-[18.4rem]'
        : variant === 'dual-brand'
          ? '[&>svg]:w-[7.5rem]'
          : '[&>svg]:w-[5rem]',
    )}
    href="https://www.uoguelph.ca"
    aria-label="University of Guelph Home Page"
  >
    {#if $headerState?.mode === 'desktop'}
      <Logo />
    {:else}
      <LogoSmall />
    {/if}
  </a>
</div>
