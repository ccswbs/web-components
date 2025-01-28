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
      'flex items-center h-full w-fit transition-opacity focus:opacity-75 hover:opacity-75 min-[1320px]:absolute min-[1320px]:left-[max(calc((100%-1320px)/2),7.5rem)] [&>svg]:block [&>svg]:w-auto',
      $headerState?.mode === 'desktop'
        ? '[&>svg]:h-22'
        : $headerState?.variant === 'dual-brand'
          ? '[&>svg]:h-[7.5rem] px-2'
          : '[&>svg]:h-[5rem]',
    )}
    href="https://www.uoguelph.ca"
    aria-label="University of Guelph Home Page"
  >
    {#if $headerState?.mode === 'desktop' || $headerState?.variant === 'dual-brand'}
      <Logo />
    {:else}
      <LogoSmall />
    {/if}
  </a>
</div>
