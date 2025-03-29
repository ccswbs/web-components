<script>
  import { primaryLinks as links } from './data/guelph.js';
  import Link from './link.svelte';
</script>

<div class="flex justify-center md:col-span-2 md:row-start-2 lg:row-auto">
  <ul class="w-full flex flex-col gap-y-1 gap-x-6 md:grid md:grid-cols-2 [&>li]:contents">
    {#each links as { href, title, text }}
      <li>
        <Link href={href} title={title}>{text}</Link>
      </li>
    {/each}
  </ul>
</div>
