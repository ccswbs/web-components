<script>
  import Menu from '../../../lib/menu.svelte';
  import FontAwesomeIcon from '../../../lib/font-awesome-icon.svelte';
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

  let { items } = $props();
</script>

{#each items as item (item.text || item.title)}
  {#if item.links}
    <li>
      <Menu
        class="relative h-full"
        buttonClass="flex h-full items-center justify-center gap-2 px-2 transition-colors hover:bg-yellow aria-expanded:bg-yellow [&_svg]:aria-expanded:rotate-180"
        contentClass="absolute right-0 top-full z-50 flex min-w-[20rem] flex-col bg-light-grey [&>li]:contents"
        buttonAriaLabel={undefined}
        as="ul"
      >
        {#snippet button()}
          <span class="flex items-center gap-2 [&>svg]:transition-transform">
            <span>{item.title}</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        {/snippet}

        {#each item.links as link}
          <li>
            <a
              {...link.attributes}
              class={`border-0 border-b border-solid border-light-grey-500 p-2 transition-colors hover:bg-yellow ${link.attributes?.class ?? ''}`}
              href={link.href}
            >
              {link.text}
            </a>
          </li>
        {/each}
      </Menu>
    </li>
  {:else}
    <li>
      <a
        {...item.attributes}
        class={`flex h-full items-center justify-center gap-2 px-2 transition-colors hover:bg-yellow ${item.attributes?.class ?? ''}`}
        href={item.href}
      >
        {item.text}
      </a>
    </li>
  {/if}
{/each}
