<script>
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { primaryLinks as links } from './data/guelph.js';
</script>

<div class="flex justify-center md:col-span-2 md:row-start-2 lg:row-auto">
  <ul class="w-full flex flex-col gap-2 md:grid md:grid-cols-2 [&>li]:contents">
    {#each links as { href, title, icon, text }}
      <li>
        <a
          {href}
          title={title ?? ''}
          class="flex justify-center items-center w-fit gap-2 border-0 border-b-2 border-dotted border-transparent transition-colors focus:border-white hover:border-white [&>svg]:fill-yellow"
        >
          <FontAwesomeIcon {icon} />
          <span>{text}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
