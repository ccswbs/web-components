<script>
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
  import Menu from '../../lib/menu.svelte';
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { topLinks as links } from './data/guelph.js';
  import { twJoin } from 'tailwind-merge';
</script>

<nav class="flex h-10 justify-end bg-white px-[calc((100%-1320px)/2)] text-lg" aria-label="Secondary">
  <ul class="flex h-full items-center justify-end [&>li]:contents">
    {#each links as item (item.text || item.title)}
      <li>
        {#if item.links}
          <Menu
            class="relative h-full"
            buttonClass={twJoin(
              `flex h-full items-center justify-center gap-2 px-2 transition-colors hover:bg-light-grey aria-expanded:bg-light-grey`,
              item.icon && '[&_svg]:aria-expanded:rotate-180)} aspect-square',
            )}
            contentClass="absolute right-0 top-full z-50 flex min-w-[20rem] flex-col bg-light-grey [&>li]:contents"
            as="ul"
            buttonAriaLabel={item.icon ? item.text : undefined}
          >
            {#snippet button()}
              <span class="flex items-center gap-2 [&>svg]:transition-transform" class:bg-yellow={item.highlight}>
                {#if item.icon}
                  <FontAwesomeIcon icon={item.icon} />
                {:else}
                  <span>{item.text.toUpperCase()}</span>
                  <FontAwesomeIcon icon={faChevronDown} />
                {/if}
              </span>
            {/snippet}

            {#each item.links as link}
              <li>
                <a
                  class={twJoin(
                    'border-0 border-b border-solid border-light-grey-500 p-2 transition-colors hover:bg-yellow',
                    item.highlight && 'bg-yellow',
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
              'flex h-full items-center justify-center gap-2 px-2 transition-colors hover:bg-light-grey',
              item.highlight && 'bg-yellow',
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
