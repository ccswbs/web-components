<script>
  import FontAwesomeIcon from '../../../lib/font-awesome-icon.svelte';
  import { primaryLinks as links } from '../data/guelph.js';
</script>

<ul class="flex ml-auto [&>li]:contents text-4xl">
  {#each links as item}
    <li>
      {#if item.icon}
        <a
          class="flex h-full items-center justify-center border-0 border-b-8 border-solid border-transparent p-4 pb-6 pt-8 text-uofg-yellow transition-colors hover:border-uofg-yellow hover:text-white [&>svg]:fill-current"
          href={item.href}
          aria-label={item.text}
        >
          <FontAwesomeIcon icon={item.icon} />
        </a>
      {:else}
        <a
          class="flex h-full items-center justify-center border-0 border-b-8 border-solid border-transparent p-6 pt-8 transition-colors hover:border-uofg-yellow hover:text-uofg-yellow"
          href={item.href}
        >
          {item.text}
        </a>
      {/if}
    </li>
  {/each}
</ul>
