<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { socials as guelph } from './data/guelph.js';

  const socials = guelph;
</script>

<ul class="flex gap-3 text-4xl [&>li]:contents">
  {#each socials as { href, text, icon, classes }}
    <li>
      <a {href} aria-label={text} class={`transition-colors ${classes}`}>
        <FontAwesomeIcon {icon} />
      </a>
    </li>
  {/each}
</ul>

<a
  class="w-fit border-0 border-b-2 border-dotted border-transparent transition-colors focus:border-white hover:border-white"
  href="https://www.uoguelph.ca/web/socialmedia/"
>
  Social Media Directory
</a>
