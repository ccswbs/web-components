<script>
  import { getContext } from 'svelte';

  const state = getContext('header-state');

  export let items;
  export let title;
  export let url;

  let isOverflowing = false;
</script>

<nav
  class="block align-items relative h-[5rem] justify-end bg-uofg-grey px-[calc((100%-1320px)/2)] text-3xl lg:h-16 lg:whitespace-nowrap"
  aria-label="Page Specific"
>
  <ul class="flex h-full w-fit min-w-full overflow-y-visible items-center justify-end [&>li]:contents relative">
    <li>
      {#if url}
        <a
          class="mr-auto flex h-full items-center justify-center px-4 font-bold transition-colors hover:bg-uofg-yellow"
          href={url}
        >
          {title}
        </a>
      {:else}
        <span class="mr-auto flex h-full items-center justify-center px-4 font-bold">
          {title}
        </span>
      {/if}
    </li>

    {#if items?.length > 0}
      {#if $state.mode === 'desktop' && !isOverflowing}
        <span>desktop</span>
      {:else}
        <span>mobile</span>
      {/if}
    {/if}
  </ul>
</nav>
