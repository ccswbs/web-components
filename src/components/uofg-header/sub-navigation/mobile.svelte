<script>
  import Menu from '../../../lib/menu.svelte';
  import FontAwesomeIcon from '../../../lib/font-awesome-icon.svelte';
  import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';

  let { items } = $props();
</script>

<li>
  <Menu
    class="h-full"
    buttonClass="flex h-full aspect-square items-center justify-center gap-2 px-4 transition-colors hover:bg-yellow aria-expanded:bg-yellow"
    contentClass="whitespace-normal absolute right-0 top-full z-50 flex w-full flex-col bg-white px-4 text-black shadow-md lg:w-[30rem] [&>li]:contents max-h-[calc(100vh-5rem)] overflow-y-auto"
    buttonAriaLabel="Sub Navigation Menu"
    as="ul"
  >
    {#snippet button()}
      <FontAwesomeIcon icon={faBars} />
    {/snippet}

    {#each items as item (item.text || item.title)}
      <li class="[&>*]:last:mb-4 [&>*]:first:mt-4">
        {#if item.text}
          <!-- Link -->
          <a
            {...item.attributes}
            class={`border-0 border-b border-solid border-light-grey-500 p-2 transition-colors hover:bg-light-grey ${item.attributes?.class ?? ''}`}
            href={item.href}
          >
            {item.text}
          </a>
        {:else}
          <!-- Nested Menu -->
          <Menu
            class="relative w-full"
            buttonClass="flex border-0 border-b border-solid border-light-grey-500 w-full items-center justify-between gap-2 p-2 transition-colors hover:bg-light-grey focus:bg-light-grey aria-expanded:bg-light-grey [&_svg]:aria-expanded:rotate-180"
            contentClass="flex flex-col w-full flex-col bg-white text-black [&>li]:contents"
            as="ul"
            autoCollapse={false}
          >
            {#snippet button()}
              <span class="w-full flex items-center gap-2 justify-between [&>svg]:transition-transform">
                <span class="mr-auto">{item.title}</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            {/snippet}

            {#each item.links as link}
              <li>
                <a
                  {...link.attributes}
                  class={`border-0 border-b border-solid border-light-grey-500 p-2 transition-colors hover:bg-light-grey ${link.attributes?.class ?? ''}`}
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            {/each}
          </Menu>
        {/if}
      </li>
    {/each}
  </Menu>
</li>
