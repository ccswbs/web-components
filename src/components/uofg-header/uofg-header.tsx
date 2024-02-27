import { Component, FunctionalComponent, Element, h, Listen, Prop, State } from '@stencil/core';
import Decoration from './decoration.svg';
import FullSizeLogo from './logo-full.svg';
import ReducedSizeLogo from './logo-reduced.svg';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface PageSpecificLink {
  text: string;
  href: string;
  attributes?: Record<string, string>;
}

interface PageSpecificSubMenu {
  title: string;
  links: PageSpecificLink[];
  wrapContent?: boolean;
}

type PageSpecificContent = Array<PageSpecificLink | PageSpecificSubMenu>;

type HeaderLink = {
  text: string;
  url: string;
  highlight?: boolean;
  icon?: IconDefinition;
};

const TRANSITION_BREAKPOINT = 1024;
const MAX_CONTENT_WIDTH = 1320;
const MENU_CHAR_LIMIT = 35;

const topLinks: HeaderLink[] = [
  {
    text: 'GIVE',
    url: 'GIVE',
  },
  {
    text: 'NEWS',
    url: 'https://news.uoguelph.ca/',
  },
  {
    text: 'APPLY',
    url: 'https://uoguelph.ca/apply/',
    highlight: true,
  },
];

const mainLinks: HeaderLink[] = [
  {
    text: 'About',
    url: 'https://uoguelph.ca/about',
  },
  {
    text: 'Academics',
    url: 'https://www.uoguelph.ca/explore-all-programs/',
  },
  {
    text: 'Admission',
    url: 'https://uoguelph.ca/admissions',
  },
  {
    text: 'Research',
    url: 'https://uoguelph.ca/research',
  },
  {
    text: 'Student Life',
    url: 'https://www.uoguelph.ca/studentexperience/',
  },
];

const iconButtons: HeaderLink[] = [
  {
    text: 'University of Guelph Intranet',
    url: 'https://intranet.uoguelph.ca/',
    icon: faRightToBracket,
  },
  {
    text: 'Search the University of Guelph',
    url: 'https://uoguelph.ca/search',
    icon: faSearch,
  },
];

const resources: HeaderLink[] = [
  {
    text: 'Future Students',
    url: 'https://uoguelph.ca/future-students',
  },
  {
    text: 'Current Students',
    url: 'https://www.uoguelph.ca/students',
  },
  {
    text: 'Alumni & Donors',
    url: 'https://alumni.uoguelph.ca/',
  },
  {
    text: 'Faculty & Staff',
    url: 'https://www.uoguelph.ca/faculty',
  },
  {
    text: 'Employers & Partners',
    url: 'https://cecs.uoguelph.ca/employers-institutions',
  },
];

@Component({ tag: 'uofg-header', styleUrl: 'uofg-header.css', shadow: true })
export class UofgHeader {
  /**
   * The title of the department/topic that the header is being used for. For example, for the Convocation pages, this would be set to "Convocation".
   */
  @Prop() pageTitle: string = '';

  /**
   * The URL to the home/landing page of the department/topic the header is being used for. For example, for the Convocation pages, this would be set to "https://www.uoguelph.ca/convocation/".
   */
  @Prop() pageUrl: string = '';

  @Element() el: HTMLUofgHeaderElement;
  @State() isFullSize: boolean = false;
  @State() pageSpecificContent: PageSpecificContent;
  private observer: MutationObserver;
  private subContainer?: HTMLElement;
  private subContainerOverflowWidth: number = NaN;
  @State() isSubContainerOverflowing: boolean = false;
  private needsOverflowWidthUpdate: boolean = false;

  connectedCallback() {
    this.updateFullSize();
    this.updatePageSpecificContent();

    this.observer ??= new MutationObserver(() => {
      this.updatePageSpecificContent();
      this.subContainerOverflowWidth = NaN; // Reset overflow width as it will have changed and needs to be recalculated
      this.needsOverflowWidthUpdate = true;
    });
    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  componentDidLoad() {
    this.updateSubContainerOverflow();
  }

  @Listen('resize', { target: 'window' })
  updateFullSize() {
    this.isFullSize = window.innerWidth >= TRANSITION_BREAKPOINT;
    this.updateSubContainerOverflow();
  }

  private updateSubContainerOverflow() {
    if (this.isFullSize && this.subContainer) {
      const { clientWidth, scrollWidth } = this.subContainer;

      if (scrollWidth > clientWidth) {
        this.subContainerOverflowWidth = scrollWidth;
      }

      this.isSubContainerOverflowing = this.subContainerOverflowWidth > Math.min(clientWidth, MAX_CONTENT_WIDTH);
    }
  }

  componentDidRender() {
    if (this.needsOverflowWidthUpdate) {
      window.requestAnimationFrame(() => this.updateSubContainerOverflow());
      this.needsOverflowWidthUpdate = false;
    }
  }

  private updatePageSpecificContent() {
    const aToPageSpecificLink = (a: HTMLAnchorElement) => {
      const attributes = {};
      a.getAttributeNames()
        .filter(name => name !== 'href')
        .forEach(name => (attributes[name] = a.getAttribute(name)));

      return {
        href: a.getAttribute('href'),
        text: a.textContent,
        attributes,
      } as PageSpecificLink;
    };

    this.pageSpecificContent = Array.from(this.el?.children)
      .filter(child => child.tagName === 'A' || child.tagName === 'UL')
      .map(child => {
        switch (child.tagName) {
          case 'A':
            return aToPageSpecificLink(child as HTMLAnchorElement);
          case 'UL':
            const value = {
              title: child.getAttribute('data-title'),
              links: Array.from(child.querySelectorAll('a')).map(aToPageSpecificLink),
            } as PageSpecificSubMenu;

            value.wrapContent = value.links.reduce((shouldWrap, link) => {
              if (link.text.length > MENU_CHAR_LIMIT) {
                shouldWrap = true;
              }

              return shouldWrap;
            }, false);

            return value;
        }
      })
      .filter(val => Boolean(val)) as PageSpecificContent;
  }

  render() {
    return (
      <header class="tw-relative tw-z-[1000] tw-w-full tw-font-condensed tw-text-2xl">
        {/* Top Navigation Bar */}
        {this.isFullSize && (
          <div class="tw-flex tw-h-16 tw-justify-end tw-bg-white tw-px-[calc((100%-1320px)/2)] tw-text-3xl">
            <uofg-menu class="tw-relative tw-block tw-h-full" auto-collapse={true}>
              <button
                class="tw-flex tw-h-full tw-items-center tw-justify-center tw-gap-2 tw-transition-colors hover:tw-bg-uofg-grey aria-expanded:tw-bg-uofg-grey [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current [&>svg]:tw-transition-transform [&>svg]:aria-expanded:tw-rotate-180"
                slot="button"
              >
                <span>Resources</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <ul
                slot="content"
                class="tw-absolute tw-right-0 tw-top-full tw-z-50 tw-flex tw-min-w-[20rem] tw-flex-col tw-bg-uofg-grey [&>li]:tw-contents"
              >
                {resources.map(item => (
                  <li>
                    <a
                      class="tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-500 tw-p-4 tw-transition-colors hover:tw-bg-uofg-yellow"
                      href={item.url}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </uofg-menu>

            <ul class="tw-contents [&>li]:tw-contents">
              {topLinks.map(item => (
                <li>
                  <a
                    href={item.url}
                    class={`tw-p-4 tw-transition-colors hover:tw-bg-uofg-grey ${item.highlight ? 'tw-bg-uofg-yellow' : ''}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/*Main Navigation Bar*/}
        <nav
          class={{
            'tw-h-[10rem]': this.isFullSize,
            'tw-h-[5rem]': !this.isFullSize,
            'tw-relative tw-flex tw-justify-between tw-bg-black tw-px-[calc((100%-1320px)/2)] tw-text-3xl tw-text-white':
              true,
          }}
          aria-label="Main"
        >
          {/* Logo */}
          <div class="tw-flex">
            {this.isFullSize && (
              <div class="tw-left-0 tw-h-full min-[1320px]:tw-absolute [&>svg]:tw-h-full" innerHTML={Decoration}></div>
            )}

            <a
              class="tw-h-full tw-left-[max(calc((100%-1320px)/2),7.5rem)] min-[1320px]:tw-absolute [&>svg]:tw-h-full"
              href="https://www.uoguelph.ca"
              innerHTML={this.isFullSize ? FullSizeLogo : ReducedSizeLogo}
              aria-label="University of Guelph Home Page"
            ></a>
          </div>

          {/* Main Navigation Content */}
          {this.isFullSize ? (
            <ul class="tw-flex tw-items-center tw-justify-center tw-text-4xl [&>li]:tw-contents">
              {mainLinks.map(item => (
                <li>
                  <a
                    href={item.url}
                    class="tw-flex tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-b-8 tw-border-solid tw-border-transparent tw-p-4 tw-pt-8 tw-transition-colors hover:tw-border-uofg-yellow hover:tw-text-uofg-yellow"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
              {iconButtons.map(item => (
                <li>
                  <a
                    class="tw-flex tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-b-8 tw-border-solid tw-border-transparent tw-p-4 tw-pt-8 tw-text-uofg-yellow tw-transition-colors hover:tw-border-uofg-yellow hover:tw-text-white [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                    href={item.url}
                    aria-label={item.text}
                  >
                    <FontAwesomeIcon icon={item.icon as IconDefinition} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div class="tw-flex tw-h-full">
              {iconButtons.map(item => (
                <a
                  class="tw-flex tw-aspect-square tw-h-full tw-items-center tw-justify-center tw-px-5 tw-transition-colors [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                  href={item.url}
                  aria-label={item.text}
                >
                  <FontAwesomeIcon icon={item.icon as IconDefinition} />
                </a>
              ))}

              {/* Main menu */}
              <uofg-menu auto-collapse={true}>
                <button
                  slot="button"
                  aria-label="Main Menu"
                  class="tw-flex tw-aspect-square tw-h-full tw-items-center tw-justify-center tw-px-5 tw-transition-colors aria-expanded:tw-bg-white aria-expanded:tw-text-black [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div
                  slot="content"
                  class="tw-absolute tw-left-0 tw-top-full tw-z-50 tw-flex tw-w-full tw-flex-col tw-bg-white tw-p-4 tw-text-black tw-shadow-sm"
                >
                  <span class="tw-my-4 tw-text-4xl tw-font-bold">University of Guelph</span>

                  <ul class="tw-flex tw-w-full tw-flex-col [&>li]:tw-contents">
                    {mainLinks.concat(topLinks).map(item => (
                      <li>
                        <a
                          href={item.url}
                          class={`tw-w-full tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey ${item?.highlight ? 'tw-bg-uofg-yellow' : ''}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Resources menu */}
                  <uofg-menu class="tw-relative tw-block tw-h-full tw-text-black" auto-collapse={false}>
                    <button
                      class="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-between tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey aria-expanded:tw-bg-uofg-grey [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current [&>svg]:tw-transition-transform [&>svg]:aria-expanded:tw-rotate-180"
                      slot="button"
                    >
                      <span>Resources</span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                    <ul slot="content" class="tw-flex tw-w-full tw-flex-col [&>li]:tw-contents">
                      {resources.map(item => (
                        <li>
                          <a
                            class="tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey"
                            href={item.url}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </uofg-menu>
                </div>
              </uofg-menu>
            </div>
          )}
        </nav>

        {/* Bottom Navigation Bar */}
        {this.pageSpecificContent.length > 0 && (
          <nav
            ref={node => (this.subContainer = node)}
            aria-label="Department/Topic"
            class="tw-align-items tw-flex tw-h-16 tw-justify-end tw-bg-uofg-grey tw-px-[calc((100%-1320px)/2)] tw-text-3xl"
          >
            {this.pageTitle &&
              (this.pageUrl != '' ? (
                <a
                  class="tw-mr-auto tw-flex tw-h-full tw-items-center tw-justify-center tw-px-4 tw-font-bold tw-transition-colors hover:tw-bg-uofg-yellow"
                  href={this.pageUrl}
                >
                  {this.pageTitle}
                </a>
              ) : (
                <span class="tw-mr-auto tw-flex tw-h-full tw-items-center tw-justify-center tw-px-4">
                  {this.pageTitle}
                </span>
              ))}

            {this.isFullSize && !this.isSubContainerOverflowing ? (
              <ul class="tw-flex tw-items-center tw-justify-center [&>li]:tw-contents">
                {this.pageSpecificContent?.map(item => {
                  if ('text' in item) {
                    return (
                      <li>
                        <a
                          class="tw-flex tw-h-full tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-transition-colors hover:tw-bg-uofg-yellow"
                          href={item.href}
                          {...item.attributes}
                        >
                          {item.text}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li>
                      <uofg-menu class="tw-relative tw-h-full" auto-collapse={true}>
                        <button
                          class="tw-flex tw-h-full tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-transition-colors hover:tw-bg-uofg-yellow aria-expanded:tw-bg-uofg-yellow [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                          slot="button"
                        >
                          <span>{item?.title}</span>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <ul
                          slot="content"
                          class={{
                            'tw-absolute tw-right-0 tw-top-full tw-z-50 tw-flex tw-min-w-[20rem] tw-flex-col tw-bg-uofg-grey [&>li]:tw-contents':
                              true,
                            'wrap-content': item.wrapContent || false,
                          }}
                        >
                          {item.links.map(link => (
                            <li>
                              <a
                                class="tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-500 tw-p-4 tw-transition-colors hover:tw-bg-uofg-yellow"
                                href={link.href}
                                {...link.attributes}
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </uofg-menu>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div id="uofg-header-reduced-sub-content" class="uofg-header-sub-content">
                <uofg-menu
                  id="uofg-header-sub-menu"
                  auto-collapse={true}
                  class={{ overflowed: this.isSubContainerOverflowing && this.isFullSize }}
                >
                  <button slot="button" aria-label={this.pageTitle + ' Menu'}>
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                  <div slot="content">

                  </div>
                </uofg-menu>
              </div>
            )}
          </nav>
        )}
      </header>
    );
  }
}
