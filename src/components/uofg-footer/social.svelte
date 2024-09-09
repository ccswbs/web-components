<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { social as guelph } from './data/guelph.js';
  import { social as ridgetown } from './data/ridgetown.js';
  import { getContext } from 'svelte';

  const state = getContext('footer-state');
  const social = $state?.variant === 'ridgetown' ? ridgetown : guelph;
</script>

<ul class="flex gap-3 text-4xl [&>li]:contents">
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
