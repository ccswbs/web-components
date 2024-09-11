<script>
  import { getContext, onMount } from 'svelte';
  import Desktop from './desktop.svelte';
  import Mobile from './mobile.svelte';
  import { twJoin } from 'tailwind-merge';

  const state = getContext('header-state');

  export let items;
  export let title;
  export let url;

  let containerWidth;
  let titleWidth;
  let contentWidth;
  let timeout;
  let overflowWidth;

  $: {
    clearTimeout(timeout);
    if ($state?.mode === 'desktop' && containerWidth - titleWidth < contentWidth) {
      timeout = setTimeout(() => {
        overflowWidth = isNaN(overflowWidth) ? containerWidth : Math.max(containerWidth, overflowWidth);
      }, 50);
    }
  }

  onMount(() => {
    if ($state?.mode === 'desktop' && containerWidth - titleWidth < contentWidth) {
      overflowWidth = isNaN(overflowWidth) ? containerWidth : Math.max(containerWidth, overflowWidth);
    }
  });
</script>

<nav
  class={twJoin(
    'block align-items relative justify-end bg-uofg-grey px-[calc((100%-1320px)/2)] text-3xl lg:whitespace-nowrap',
    $state?.variant === 'dual-brand' ? 'h-16' : 'h-[5rem] lg:h-16',
  )}
  aria-label="Page Specific"
  bind:clientWidth={containerWidth}
>
  <div class="flex h-full w-fit min-w-full overflow-y-visible items-center justify-end [&>li]:contents relative">
    {#if url}
      <a
        class="mr-auto flex h-full items-center justify-center px-4 font-bold transition-colors hover:bg-uofg-yellow"
        href={url}
        bind:clientWidth={titleWidth}
      >
        {title}
      </a>
    {:else}
      <span bind:clientWidth={titleWidth} class="mr-auto flex h-full items-center justify-center px-4 font-bold">
        {title}
      </span>
    {/if}

    <ul class="[&>li]:contents h-full flex w-fit !static lg:static" bind:clientWidth={contentWidth}>
      {#if items?.length > 0}
        {#if $state.mode === 'desktop' && (isNaN(overflowWidth) || containerWidth > overflowWidth)}
          <Desktop {items} />
        {:else}
          <Mobile {items} />
        {/if}
      {/if}
    </ul>
  </div>
</nav>
