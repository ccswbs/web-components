<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { primaryLinks as links } from './data/guelph.js';
</script>

<div class="flex justify-center md:col-span-2 md:row-start-2 lg:row-auto">
  <ul class="w-full flex flex-col gap-y-1 gap-x-6 md:grid md:grid-cols-2 [&>li]:contents">
    {#each links as { href, title, text }}
      <li>
        <a
          {href}
          title={title ?? ''}
          class="w-fit underline decoration-transparent transition-colors focus:decoration-white hover:decoration-white"
        >
          {text}
        </a>
      </li>
    {/each}
  </ul>
</div>
