<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { social } from './data/guelph.js';
  import { twJoin } from 'tailwind-merge';
</script>

<ul class="flex gap-2 text-xl [&>li]:contents">
  {#each social.links as { href, text, icon, classes }}
    <li>
      <a {href} aria-label={text} class={twJoin(`border border-current transition-colors focus:border-transparent hover:border-transparent p-1 [&>*]:aspect-square`, classes)}>
        <FontAwesomeIcon {icon} />
      </a>
    </li>
  {/each}
</ul>
