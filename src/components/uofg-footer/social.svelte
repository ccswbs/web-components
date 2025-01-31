<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { social } from './data/guelph.js';
</script>

<ul class="flex gap-3 text-xl [&>li]:contents">
  {#each social.links as { href, text, icon, classes }}
    <li>
      <a {href} aria-label={text} class={`transition-colors ${classes}`}>
        <FontAwesomeIcon {icon} />
      </a>
    </li>
  {/each}
</ul>
