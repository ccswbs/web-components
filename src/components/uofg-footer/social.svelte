<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { social } from './data/guelph.js';
</script>

<ul class="flex gap-3 text-2xl [&>li]:contents">
  {#each social.links as { href, text, icon, classes }}
    <li>
      <a {href} aria-label={text} class={`transition-colors ${classes}`}>
        <FontAwesomeIcon {icon} />
      </a>
    </li>
  {/each}
</ul>

<a
  class="w-fit border-0 border-b-2 border-dotted border-transparent transition-colors focus:border-white hover:border-white"
  href={social.directory}
>
  Social Media Directory
</a>
