<script>
  import FontAwesomeIcon from '../../../lib/font-awesome-icon.svelte';
  import { primaryLinks as links } from '../data/guelph.js';
</script>

<ul class="flex ml-auto [&>li]:contents text-[2.2rem]">
  {#each links as item}
    <li>
      {#if item.icon}
        <a
          class="flex h-full items-center justify-center border-0 border-b-8 border-solid border-transparent p-4 pb-6 pt-8 text-yellow transition-colors hover:border-yellow hover:text-white [&>svg]:fill-current"
          href={item.href}
          aria-label={item.text}
        >
          <FontAwesomeIcon icon={item.icon} />
        </a>
      {:else}
        <a
          class="flex h-full items-center justify-center border-0 border-b-8 border-solid border-transparent p-4 pt-6 transition-colors hover:border-yellow hover:text-yellow"
          href={item.href}
        >
          {item.text}
        </a>
      {/if}
    </li>
  {/each}
</ul>
