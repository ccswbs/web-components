import { Component, Element, State, h } from '@stencil/core';
import { FontAwesomeIcon } from 'utils/font-awesome-icon';
import improveLifeLogo from './improve-life.svg';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons/faHandHoldingHeart';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';
import { faTree } from '@fortawesome/free-solid-svg-icons/faTree';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons/faUniversalAccess';
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons/faPhoneFlip';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTiktok } from '@fortawesome/free-brands-svg-icons/faTiktok';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';

type ExtraLink = {
  text: string;
  href: string;
};

const socials = [
  {
    text: 'Twitter',
    icon: faTwitterSquare,
    href: 'https://twitter.com/uofg',
    class: 'hocus:tw-text-[#1da1f2]',
  },
  {
    text: 'Facebook',
    icon: faFacebookSquare,
    href: 'https://www.facebook.com/uofguelph',
    class: 'hocus:tw-text-[#4267b2]',
  },
  {
    text: 'Instagram',
    icon: faInstagram,
    href: 'https://www.instagram.com/uofguelph/',
    class: 'hocus:tw-text-[#e1306c]',
  },
  {
    text: 'Youtube',
    icon: faYoutube,
    href: 'https://www.youtube.com/user/uofguelph',
    class: 'hocus:tw-text-[#f00]',
  },
  {
    text: 'LinkedIn',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/school/university-of-guelph/',
    class: 'hocus:tw-text-[#0077b5]',
  },
  {
    text: 'TikTok',
    icon: faTiktok,
    href: 'https://www.tiktok.com/@uofguelph',
    class: 'hocus:tw-text-[#f00]',
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

@Component({ tag: 'uofg-footer', styleUrl: 'uofg-footer.css', shadow: true })
export class UofgFooter {
  @Element() el: HTMLUofgHeaderElement;
  @State() private extraLinks: ExtraLink[] = [];
  private observer: MutationObserver;

  connectedCallback() {
    this.updateExtraLinks();
    this.observer ??= new MutationObserver(() => {
      this.updateExtraLinks();
    });

    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  private updateExtraLinks() {
    this.extraLinks = Array.from(this.el?.children)
      .filter(child => child.tagName === 'A')
      .map(child => ({ text: child.textContent, href: child.getAttribute('href') }) as ExtraLink);
  }

  render() {
    return (
      <footer>
        {this.extraLinks.length > 0 && (
          <ul class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-bg-uofg-blue-50 tw-p-6 tw-px-[calc((100%-1320px)/2)]">
            {this.extraLinks.map(link => (
              <li class="tw-border-0 tw-border-r-2 tw-border-solid tw-border-uofg-blue-100 tw-p-2 first:tw-border-l-2">
                <a class="hocus:tw-text-uofg-blue-950 tw-text-uofg-blue-500 tw-transition-colors" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div class="tw-flex tw-flex-col tw-gap-8 tw-bg-black tw-px-[calc((100%-1320px)/2)] tw-py-8 tw-text-white">
          <div class="tw-flex tw-flex-col tw-justify-between tw-gap-4">
            <a
              href="//www.uoguelph.ca/improve-life"
              aria-label="Improve Life"
              class="tw-flex [&>svg]:tw-h-[1.6em]"
              innerHTML={improveLifeLogo}
            ></a>

            <ul class="tw-flex tw-gap-3 tw-text-3xl [&>li]:tw-contents">
              {socials.map(item => (
                <li>
                  <a
                    href={item.href}
                    aria-label={item.text}
                    class={`tw-transition-colors [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current ${item.class}`}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </a>
                </li>
              ))}
            </ul>

            <a href="https://www.uoguelph.ca/web/socialmedia/">Social Media Directory</a>
            <a href="//www.uoguelph.ca/web/">© {new Date().getFullYear()} University of Guelph</a>
          </div>

          <div id="uofg-footer-links-container">
            <ul class="tw-flex tw-flex-col tw-gap-4 [&>li]:tw-contents">
              {links.map(item => (
                <li>
                  <a href={item.href} class="tw-flex tw-gap-3 [&>svg]:tw-h-[1em] [&>svg]:tw-fill-uofg-yellow">
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <address class="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-not-italic">
            <strong>University of Guelph</strong>
            <span>50 Stone Road East,</span>
            <span>Guelph, Ontario, Canada</span>
            <span>N1G 2W1</span>
            <a href="tel:1-519-824-4120" class="tw-flex tw-gap-2 [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current tw-text-uofg-blue">
              <FontAwesomeIcon icon={faPhoneFlip} />
              <span>519-824-4120</span>
            </a>
          </address>
        </div>
      </footer>
    );
  }
}
