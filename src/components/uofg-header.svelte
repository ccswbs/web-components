<svelte:options
  customElement={{
    tag: 'uofg-header',
    props: {
      pageTitle: { reflect: true, type: 'String', attribute: 'page-title' },
      pageURL: { reflect: true, type: 'String', attribute: 'page-url' },
      variant: { reflect: true, type: 'String', attribute: 'variant' },
    },
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
        }
        connectedCallback() {
          super.connectedCallback();

          this.updateSubNavigation();

          this.observer ??= new MutationObserver(() => {
            this.updateSubNavigation();
          });

          this.observer.observe(this, { childList: true, subtree: true });
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.observer.disconnect();
        }
        updateSubNavigation() {
          const aToSubNavigationLink = a => {
            const attributes = {};
            a.getAttributeNames()
              .filter(name => name !== 'href')
              .forEach(name => (attributes[name] = a.getAttribute(name)));

            return {
              href: a.getAttribute('href'),
              text: a.textContent,
              attributes,
            };
          };

          this.subNavigation = Array.from(this.children)
            .filter(child => child.tagName === 'A' || child.tagName === 'UL')
            .map(child => {
              switch (child.tagName) {
                case 'A':
                  return aToSubNavigationLink(child);
                case 'UL':
                  const value = {
                    title: child.getAttribute('data-title'),
                    links: Array.from(child.querySelectorAll('a')).map(aToSubNavigationLink),
                  };

                  value.wrapContent = value.links.reduce((shouldWrap, link) => {
                    if (link.text.length > MENU_CHAR_LIMIT) {
                      shouldWrap = true;
                    }

                    return shouldWrap;
                  }, false);

                  return value;
              }
            })
            .filter(val => Boolean(val));
        }
      };
    },
  }}
/>

<script>
  import attachTailwind from '../lib/attach-tailwind.js';
  import Menu from '../lib/menu.svelte';
  import FontAwesomeIcon from '../lib/font-awesome-icon.svelte';
  import { faBars, faChevronDown, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
  import Logo from '../svg/logo.svg';
  import LogoSmall from '../svg/logo-small.svg';
  import Decorative from '../svg/decorative.svg';
  import UofGHLogo from '../svg/uofgh-logo.svg';

  const BREAKPOINT = 1024;
  const MENU_CHAR_LIMIT = 35;

  const topLinks = [
    {
      text: 'Give',
      href: 'https://bbis.alumni.uoguelph.ca/BBIS_Cannon/give/uofg',
    },
    {
      text: 'News',
      href: 'https://news.uoguelph.ca/',
    },
    {
      text: 'Quick Links',
      links: [
        {
          text: 'Future Students',
          href: 'https://uoguelph.ca/future-ready',
        },
        {
          text: 'Current Students',
          href: 'https://www.uoguelph.ca/students',
        },
        {
          text: 'Alumni & Donors',
          href: 'https://alumni.uoguelph.ca/',
        },
        {
          text: 'Faculty & Staff',
          href: 'https://www.uoguelph.ca/faculty',
        },
        {
          text: 'Employers & Partners',
          href: 'https://cecs.uoguelph.ca/employers-institutions',
        },
      ],
    },
    {
      text: 'APPLY NOW',
      href: 'https://uoguelph.ca/apply/',
      highlight: true,
    },
  ];

  const mainLinks = [
    {
      text: 'About',
      href: 'https://uoguelph.ca/about',
    },
    {
      text: 'Academics',
      href: 'https://www.uoguelph.ca/explore-all-programs/',
    },
    {
      text: 'Admission',
      href: 'https://uoguelph.ca/admissions',
    },
    {
      text: 'Research',
      href: 'https://uoguelph.ca/research',
    },
    {
      text: 'Student Life',
      href: 'https://www.uoguelph.ca/studentexperience/',
    },
  ];

  const search = {
    text: 'Search the University of Guelph',
    href: 'https://uoguelph.ca/search',
    icon: faSearch,
  };

  const account = {
    text: 'Account Menu',
    links: [
      {
        text: 'Intranet',
        href: 'https://intranet.uoguelph.ca/',
      },
      {
        text: 'WebAdvisor',
        href: 'https://www.uoguelph.ca/webadvisor/',
      },
      {
        text: 'GryphMail',
        href: 'https://mail.uoguelph.ca/',
      },
      {
        text: 'CourseLink',
        href: 'https://courselink.uoguelph.ca/',
      },
      {
        text: 'GryphLife',
        href: 'https://gryphlife.uoguelph.ca/',
      },
    ],
    icon: faUser,
  };

  let windowWidth;
  let subNavigationElement;
  let subNavigationIsOverflowing = false;

  export let subNavigation;
  export let pageTitle;
  export let pageURL;
  export let variant;

  $: {
    window.requestAnimationFrame(() => {
      if (windowWidth >= BREAKPOINT && subNavigationElement && !subNavigationIsOverflowing) {
        subNavigationIsOverflowing = subNavigationElement.offsetWidth > subNavigationElement.parentElement.offsetWidth;
      }
    });
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />

<header class="relative z-10 w-full font-condensed text-3xl text-black">
  {#if windowWidth >= BREAKPOINT && variant !== 'simplified'}
    <!-- Top Navigation Bar -->
    <nav class="flex h-16 justify-end bg-white px-[calc((100%-1320px)/2)] text-3xl" aria-label="Secondary">
      <!-- Top Navigation Links -->

      <ul class="flex h-full items-center justify-end [&>li]:contents">
        {#each [...topLinks, account] as item (item.text || item.title)}
          <li>
            {#if item.links}
              <Menu
                class="relative h-full"
                buttonClass={`flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-grey aria-expanded:bg-uofg-grey ${item.icon ? '' : '[&_svg]:aria-expanded:rotate-180'}`}
                contentClass="absolute right-0 top-full z-50 flex min-w-[20rem] flex-col bg-uofg-grey [&>li]:contents"
                as="ul"
                buttonAriaLabel={item.icon ? item.text : undefined}
              >
                <span
                  class="flex gap-2 [&>svg]:transition-transform"
                  class:bg-uofg-yellow={item.highlight}
                  slot="button"
                >
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
                      class="border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-yellow"
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
                class="flex h-full items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-grey"
                class:bg-uofg-yellow={item.highlight}
                href={item.href}
              >
                {item.text.toUpperCase()}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
  {/if}

  <!-- Main Navigation Bar -->

  <nav
    class="relative w-full justify-between flex h-[5rem] lg:h-[10rem] bg-black px-[calc((100%-1320px)/2)] text-3xl text-white"
    aria-label="Primary"
  >
    <!-- Logo -->
    <div class="flex w-fit">
      {#if windowWidth >= BREAKPOINT}
        <!-- Decorative SVG -->
        <div class="left-0 h-full w-[7.5rem] min-[1320px]:absolute [&>svg]:block [&>svg]:h-full [&>svg]:w-auto">
          <Decorative />
        </div>
      {/if}

      <a
        class={`flex h-full w-fit transition-opacity focus:opacity-75 hover:opacity-75 min-[1320px]:absolute min-[1320px]:left-[max(calc((100%-1320px)/2),7.5rem)] [&>svg]:block [&>svg]:h-full ${windowWidth >= BREAKPOINT ? '[&>svg]:w-[18.4rem]' : '[&>svg]:w-[5rem]'}`}
        href="https://www.uoguelph.ca"
        aria-label="University of Guelph Home Page"
      >
        {#if windowWidth >= BREAKPOINT}
          <Logo />
        {:else}
          <LogoSmall />
        {/if}
      </a>
    </div>

    {#if variant === 'simplified'}
      <a
        href="https://www.guelphhumber.ca"
        class="w-auto h-full p-6 ml-auto transition-opacity focus:opacity-75 hover:opacity-75"
      >
        <UofGHLogo />
      </a>
    {:else if windowWidth >= BREAKPOINT}
      <!-- Desktop Main Nagivation Items -->
      <ul class="flex ml-auto [&>li]:contents text-4xl">
        {#each mainLinks as item}
          <li>
            <a
              class="flex h-full items-center justify-center border-0 border-b-8 border-solid border-transparent p-6 pt-8 transition-colors hover:border-uofg-yellow hover:text-uofg-yellow"
              href={item.href}
            >
              {item.text}
            </a>
          </li>
        {/each}
        <!-- Search -->
        <li>
          <a
            class="flex h-full items-center justify-center border-0 border-b-8 border-solid border-transparent p-4 pb-6 pt-8 text-uofg-yellow transition-colors hover:border-uofg-yellow hover:text-white [&>svg]:fill-current"
            href={search.href}
            aria-label={search.text}
          >
            <FontAwesomeIcon icon={search.icon} />
          </a>
        </li>
      </ul>
    {:else}
      <!-- Mobile Main Nagivation Items -->
      <!-- Search -->
      <ul class="flex h-full [&>li]:contents">
        <li>
          <a
            class="flex h-full aspect-square items-center justify-center gap-2 px-4 transition-colors hover:bg-white focus:bg-white aria-expanded:bg-white hover:text-black focus:text-black aria-expanded:text-black"
            href={search.href}
            aria-label={search.text}
          >
            <FontAwesomeIcon icon={search.icon} />
          </a>
        </li>

        <!-- Account Menu -->
        <li>
          <Menu
            class="h-full"
            buttonClass="flex h-full aspect-square items-center justify-center gap-2 px-4 transition-colors hover:bg-white focus:bg-white aria-expanded:bg-white hover:text-black focus:text-black aria-expanded:text-black"
            contentClass="absolute right-0 top-full z-50 flex w-full flex-col bg-white px-4 text-black shadow-md lg:w-[30rem] [&>li]:contents"
            as="ul"
          >
            <FontAwesomeIcon slot="button" icon={account.icon} />

            {#each account.links as link}
              <li class="[&>*]:first:mt-4 [&>*]:last:mb-4">
                <a
                  class="border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-yellow"
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            {/each}
          </Menu>
        </li>
        <!-- Main Menu -->
        <li>
          <Menu
            class="h-full"
            buttonClass="flex h-full aspect-square items-center justify-center gap-2 px-4 transition-colors hover:bg-white focus:bg-white aria-expanded:bg-white hover:text-black focus:text-black aria-expanded:text-black [&_svg]:aria-expanded:rotate-180"
            contentClass="absolute right-0 top-full z-50 flex w-full flex-col bg-white px-4 text-black shadow-md lg:w-[30rem] [&>li]:contents max-h-[calc(100vh-5rem)] overflow-y-auto"
            as="ul"
          >
            <FontAwesomeIcon slot="button" icon={faBars} />

            {#each [...mainLinks, ...topLinks] as item}
              <li class="[&>*]:first:mt-4 [&>*]:last:mb-4">
                {#if item.links}
                  <Menu
                    class="relative w-full"
                    buttonClass="flex border-0 border-b border-solid border-uofg-grey-500 w-full items-center justify-between gap-2 p-4 transition-colors hover:bg-uofg-grey focus:bg-uofg-grey aria-expanded:bg-uofg-grey [&_svg]:aria-expanded:rotate-180"
                    contentClass="flex flex-col w-full flex-col bg-white text-black [&>li]:contents"
                    as="ul"
                    autoCollapse={false}
                  >
                    <span
                      class="w-full flex gap-2 justify-between [&>svg]:transition-transform"
                      class:bg-uofg-yellow={item.highlight}
                      slot="button"
                    >
                      <span class="mr-auto">{item.text}</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>

                    {#each item.links as link}
                      <li>
                        <a
                          class="border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-grey"
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
                    class="border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-grey focus:bg-uofg-grey"
                    class:bg-uofg-yellow={item.highlight}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                {/if}
              </li>
            {/each}
          </Menu>
        </li>
      </ul>
    {/if}
  </nav>

  <!-- Sub Navigation Bar -->
  {#if subNavigation.length > 0 || pageTitle}
    <nav
      class="block align-items relative h-[5rem] justify-end bg-uofg-grey px-[calc((100%-1320px)/2)] text-3xl lg:h-16 lg:whitespace-nowrap"
      aria-label="Page Specific"
    >
      <ul
        class="flex h-full w-fit min-w-full overflow-y-visible items-center justify-end [&>li]:contents relative"
        bind:this={subNavigationElement}
      >
        <!-- Page/Department/Topic Title -->
        {#if pageTitle}
          <li>
            {#if pageURL}
              <a
                class="mr-auto flex h-full items-center justify-center px-4 font-bold transition-colors hover:bg-uofg-yellow"
                href={pageURL}
              >
                {pageTitle}
              </a>
            {:else}
              <span class="mr-auto flex h-full items-center justify-center px-4 font-bold">
                {pageTitle}
              </span>
            {/if}
          </li>
        {/if}

        {#if windowWidth >= BREAKPOINT && !subNavigationIsOverflowing}
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
          <!-- Mobile Sub Navigation Links and Menus -->
        {:else}
          <Menu
            class="h-full"
            buttonClass="flex h-full aspect-square items-center justify-center gap-2 px-4 transition-colors hover:bg-uofg-yellow aria-expanded:bg-uofg-yellow"
            contentClass="whitespace-normal absolute right-0 top-full z-50 flex w-full flex-col bg-white px-4 text-black shadow-md lg:w-[30rem] [&>li]:contents max-h-[calc(100vh-5rem)] overflow-y-auto"
            as="ul"
          >
            <FontAwesomeIcon slot="button" icon={faBars} />

            {#each subNavigation as item (item.text || item.title)}
              <li class="[&>*]:last:mb-4 [&>*]:first:mt-4">
                {#if item.text}
                  <!-- Link -->
                  <a
                    {...item.attributes}
                    class={`border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-grey ${item.attributes?.class ?? ''}`}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                {:else}
                  <!-- Nested Menu -->
                  <Menu
                    class="relative w-full"
                    buttonClass="flex border-0 border-b border-solid border-uofg-grey-500 w-full items-center justify-between gap-2 p-4 transition-colors hover:bg-uofg-grey focus:bg-uofg-grey aria-expanded:bg-uofg-grey [&_svg]:aria-expanded:rotate-180"
                    contentClass="flex flex-col w-full flex-col bg-white text-black [&>li]:contents"
                    as="ul"
                    autoCollapse={false}
                  >
                    <span class="w-full flex gap-2 justify-between [&>svg]:transition-transform" slot="button">
                      <span class="mr-auto">{item.title}</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>

                    {#each item.links as link}
                      <li>
                        <a
                          {...link.attributes}
                          class={`border-0 border-b border-solid border-uofg-grey-500 p-4 transition-colors hover:bg-uofg-grey ${link.attributes?.class ?? ''}`}
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
        {/if}
      </ul>
    </nav>
  {/if}
</header>
