<script>
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
  import Menu from '../../lib/menu.svelte';
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { topLinks as links } from './data/guelph.js';
  import { twJoin } from 'tailwind-merge';
</script>

<nav class="flex h-16 justify-end bg-white px-[calc((100%-1320px)/2)] text-3xl" aria-label="Secondary">
  <ul class="flex h-full items-center justify-end [&>li]:contents">
    {#each links as item (item.text || item.title)}
      <li>
        {#if item.links}
          <Menu
            class="relative h-full"
            buttonClass={twJoin(
              `flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-grey aria-expanded:bg-uofg-grey`,
              item.icon && '[&_svg]:aria-expanded:rotate-180)}',
            )}
            contentClass="absolute right-0 top-full z-50 flex min-w-[20rem] flex-col bg-uofg-grey [&>li]:contents"
            as="ul"
            buttonAriaLabel={item.icon ? item.text : undefined}
          >
            <span class="flex gap-2 [&>svg]:transition-transform" class:bg-uofg-yellow={item.highlight} slot="button">
              {#if item.icon}
                <FontAwesomeIcon icon={item.icon} />
              {:else}
                <span>{item.text.toUpperCase()}</span>
                <FontAwesomeIcon icon={faChevronDown} />
              {/if}
            </span>

            {#each item.links as link}
              <li>
                <a
                  class={twJoin(
                    'border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-yellow',
                    item.highlight && 'bg-uofg-yellow',
                  )}
                  href={link.href}
                  {...link.attributes}
                >
                  {link.text}
                </a>
              </li>
            {/each}
          </Menu>
        {:else}
          <a
            class={twJoin(
              'flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-grey',
              item.highlight && 'bg-uofg-yellow',
            )}
            href={item.href}
          >
            {item.text.toUpperCase()}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
