<script>
  import Menu from '../../../lib/menu.svelte';
  import FontAwesomeIcon from '../../../lib/font-awesome-icon.svelte';
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

  export let items;
</script>

{#each items as item (item.text || item.title)}
  {#if item.links}
    <li>
      <Menu
        class="relative h-full"
        buttonClass="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-yellow aria-expanded:bg-uofg-yellow [&_svg]:aria-expanded:rotate-180"
        contentClass="absolute right-0 top-full z-50 flex min-w-[20rem] flex-col bg-uofg-grey [&>li]:contents"
        buttonAriaLabel={undefined}
        as="ul"
      >
        <span class="flex gap-2 [&>svg]:transition-transform" slot="button">
          <span>{item.title}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>

        {#each item.links as link}
          <li>
            <a
              {...link.attributes}
              class={`border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-yellow ${link.attributes?.class ?? ''}`}
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
        class={`flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-yellow ${item.attributes?.class ?? ''}`}
        href={item.href}
      >
        {item.text}
      </a>
    </li>
  {/if}
{/each}
