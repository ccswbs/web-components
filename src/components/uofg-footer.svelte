<svelte:options
  customElement={{
    tag: 'uofg-footer',
    extend: customElementConstructor => {
      return class extends customElementConstructor {
        constructor() {
          super();
          attachTailwind(this.shadowRoot);
        }
        connectedCallback() {
          super.connectedCallback();

          this.updateSubFooter();

          this.observer ??= new MutationObserver(() => {
            this.updateSubFooter();
          });

          this.observer.observe(this, { childList: true, subtree: true });
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.observer.disconnect();
        }
        updateSubFooter() {
          this.subFooter = Array.from(this.children)
            .filter(child => child.tagName === 'A')
            .map(child => ({ text: child.textContent, href: child.getAttribute('href') }));
        }
      };
    },
  }}
/>

<script>
  import attachTailwind from '../lib/attach-tailwind.js';
  import ImproveLife from '../svg/improve-life.svg';

  import {
    faFacebookSquare,
    faInstagram,
    faLinkedin,
    faTiktok,
    faSquareXTwitter,
    faYoutube,
  } from '@fortawesome/free-brands-svg-icons';

  import {
    faBriefcase,
    faCalendar,
    faCircleCheck,
    faHandHoldingHeart,
    faKey,
    faList,
    faPhoneFlip,
    faSitemap,
    faTree,
    faUniversalAccess,
  } from '@fortawesome/free-solid-svg-icons';

  import FontAwesomeIcon from '../lib/font-awesome-icon.svelte';

  const socials = [
    {
      text: 'X',
      icon: faSquareXTwitter,
      href: 'https://twitter.com/uofg',
      classes: 'focus:text-[#1da1f2] hover:text-[#1da1f2]',
    },
    {
      text: 'Facebook',
      icon: faFacebookSquare,
      href: 'https://www.facebook.com/uofguelph',
      classes: 'focus:text-[#4267b2] hover:text-[#4267b2]',
    },
    {
      text: 'Instagram',
      icon: faInstagram,
      href: 'https://www.instagram.com/uofguelph/',
      classes: 'focus:text-[#e1306c] hover:text-[#e1306c]',
    },
    {
      text: 'Youtube',
      icon: faYoutube,
      href: 'https://www.youtube.com/user/uofguelph',
      classes: 'focus:text-[#f00] hover:text-[#f00]',
    },
    {
      text: 'LinkedIn',
      icon: faLinkedin,
      href: 'https://www.linkedin.com/school/university-of-guelph/',
      classes: 'focus:text-[#0077b5] hover:text-[#0077b5]',
    },
    {
      text: 'TikTok',
      icon: faTiktok,
      href: 'https://www.tiktok.com/@uofguelph',
      classes: 'focus:text-[#f00] hover:text-[#f00]',
    },
  ];

  const links = [
    {
      text: 'Accessibility',
      icon: faUniversalAccess,
      href: 'https://www.uoguelph.ca/diversity-human-rights/accessibility-u-g',
    },
    {
      text: 'Privacy',
      icon: faKey,
      href: 'https://www.uoguelph.ca/web/privacy/',
    },
    {
      text: 'Site Map',
      icon: faSitemap,
      href: 'https://www.uoguelph.ca/sitemap',
    },
    {
      text: 'Status Page',
      icon: faCircleCheck,
      href: 'https://uoguelph.statuspage.io/',
    },
    {
      text: 'Land Acknowledgement',
      icon: faTree,
      href: 'https://www.uoguelph.ca/land-acknowledgement/',
      title:
        'The University of Guelph resides on the treaty lands and territory of the Mississaugas of the Credit. We recognize that today this gathering place is home to many First Nations, Inuit and Métis peoples and acknowledging them reminds us of our collective responsibility to the land where we learn and work.',
    },
    {
      text: 'Careers',
      icon: faBriefcase,
      href: 'https://www.uoguelph.ca/hr/careers-guelph/current-opportunities',
    },
    {
      text: 'Undergraduate Calendar',
      icon: faCalendar,
      href: 'https://www.uoguelph.ca/registrar/calendars/undergraduate/current/',
    },
    {
      text: 'Graduate Calendar',
      icon: faCalendar,
      href: 'https://www.uoguelph.ca/registrar/calendars/graduate/current/',
    },
    {
      text: 'Program Plans',
      icon: faList,
      href: 'https://admission.uoguelph.ca/programs',
    },
    {
      text: 'Give to U of G',
      icon: faHandHoldingHeart,
      href: 'https://www.alumni.uoguelph.ca/give-to-guelph/how-to-give',
    },
  ];

  export let subFooter;
</script>

<footer>
  {#if Array.isArray(subFooter) && subFooter.length > 0}
    <ul class="flex flex-wrap items-center justify-center bg-uofg-blue-50 p-6 px-[max(calc((100%-1320px)/2),2rem)]">
      {#each subFooter as { text, href }}
        <li class="border-0 border-r-2 border-solid border-uofg-blue-100 p-2 first:border-l-2">
          <a class="text-uofg-blue-500 transition-colors hover:text-uofg-blue-950 focus:text-uofg-blue-950" {href}>
            {text}
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  <div
    class="flex flex-col content-center gap-8 bg-black px-[max(calc((100%-1320px)/2),2rem)] py-8 text-white md:grid md:grid-cols-2 lg:grid-cols-4"
  >
    <div class="flex flex-col justify-between gap-2">
      <a
        href="https://www.uoguelph.ca/improve-life"
        aria-label="Improve Life"
        class="flex transition-opacity focus:opacity-75 hover:opacity-75 [&>svg]:block [&>svg]:h-[1.6em] [&>svg]:mb-4"
      >
        <ImproveLife />
      </a>

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
      <a
        class="w-fit border-0 border-b-2 border-dotted border-transparent transition-colors focus:border-white hover:border-white"
        href="https://www.uoguelph.ca/web/"
      >
        © {new Date().getFullYear()} University of Guelph
      </a>
    </div>

    <div class="flex justify-center md:col-span-2 md:row-start-2 lg:row-auto">
      <ul class="w-full flex flex-col gap-2 md:grid md:grid-cols-2 [&>li]:contents">
        {#each links as { href, title, icon, text }}
          <li>
            <a
              {href}
              title={title ?? ''}
              class="flex justify-center items-center w-fit gap-3 border-0 border-b-2 border-dotted border-transparent transition-colors focus:border-white hover:border-white [&>svg]:fill-uofg-yellow"
            >
              <FontAwesomeIcon {icon} />
              <span>{text}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <address class="flex flex-col justify-between gap-4 not-italic">
      <strong>University of Guelph</strong>
      <span>50 Stone Road East,</span>
      <span>Guelph, Ontario, Canada</span>
      <span>N1G 2W1</span>
      <a
        href="tel:1-519-824-4120"
        class="flex justify-center items-center w-fit gap-2 border-0 border-b-2 border-dotted border-transparent text-uofg-blue transition-colors focus:border-current hover:border-current"
      >
        <FontAwesomeIcon icon={faPhoneFlip} />
        <span>519-824-4120</span>
      </a>
    </address>
  </div>
</footer>
