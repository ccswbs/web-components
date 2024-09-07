<script>
import Menu from '../../../lib/menu.svelte';
</script>

<!-- Desktop Sub Navigation Links and Menus -->
<li>
  {#each subNavigation as item (item.text || item.title)}
    {#if item.text}
      <!-- Link -->

      <a
        {...item.attributes}
        class={`flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-yellow ${item.attributes?.class ?? ''}`}
        href={item.href}
      >
        {item.text}
      </a>
    {:else}
      <!-- Menu -->

      <Menu
        class="relative h-full"
        buttonClass="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-yellow aria-expanded:bg-uofg-yellow [&_svg]:aria-expanded:rotate-180"
        contentClass="absolute right-0 top-full z-50 flex min-w-[20rem] flex-col bg-uofg-grey [&>li]:contents"
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
    {/if}
  {/each}
</li>