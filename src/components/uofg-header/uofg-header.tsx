import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import Decoration from './decoration.svg';
import FullSizeLogo from './logo-full.svg';
import ReducedSizeLogo from './logo-reduced.svg';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
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
  href: string;
  highlight?: boolean;
  icon?: IconDefinition;
};

type HeaderMenu = {
  text: string;
  links: HeaderLink[];
  icon?: IconDefinition;
};

const TRANSITION_BREAKPOINT = 1024;
const MAX_CONTENT_WIDTH = 1320;
const MENU_CHAR_LIMIT = 35;

const topLinks: (HeaderLink | HeaderMenu)[] = [
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
        href: 'https://uoguelph.ca/future-students',
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

const mainLinks: HeaderLink[] = [
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

const search: HeaderLink = {
  text: 'Search the University of Guelph',
  href: 'https://uoguelph.ca/search',
  icon: faSearch,
};

const account: HeaderMenu = {
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
      <header class="tw-relative tw-z-[1000] tw-w-full tw-font-condensed tw-text-2xl tw-text-black">
        {/* Top Navigation Bar */}
        {this.isFullSize && (
          <div class="tw-flex tw-h-16 tw-justify-end tw-bg-white tw-px-[calc((100%-1320px)/2)] tw-text-3xl">
            <ul class="tw-contents [&>li]:tw-contents">
              {[...topLinks, account].map(item => {
                if ('links' in item) {
                  return (
                    <li>
                      <uofg-menu class="tw-relative tw-block tw-h-full" auto-collapse={true}>
                        <button
                          class={{
                            '${} tw-flex tw-h-full tw-items-center tw-justify-center tw-gap-2 tw-p-4 tw-transition-colors hover:tw-bg-uofg-grey aria-expanded:tw-bg-uofg-grey [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current [&>svg]:tw-transition-transform':
                              true,
                            '[&>svg]:aria-expanded:tw-rotate-180': !item.icon,
                          }}
                          slot="button"
                        >
                          {!item.icon && <span>{item.text.toUpperCase()}</span>}
                          <FontAwesomeIcon icon={item.icon || faCaretDown} />
                        </button>
                        <ul
                          slot="content"
                          class="tw-absolute tw-right-0 tw-top-full tw-z-50 tw-flex tw-min-w-[20rem] tw-flex-col tw-bg-uofg-grey [&>li]:tw-contents"
                        >
                          {item.links.map(link => (
                            <li>
                              <a
                                class="tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-500 tw-p-4 tw-transition-colors hover:tw-bg-uofg-yellow"
                                href={link.href}
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </uofg-menu>
                    </li>
                  );
                }

                return (
                  <li>
                    <a
                      href={item.href}
                      class={`tw-flex tw-items-center tw-justify-center tw-p-4 tw-transition-colors hover:tw-bg-uofg-grey ${item.highlight ? 'tw-bg-uofg-yellow tw-px-6 tw-font-bold' : ''}`}
                    >
                      {item.text.toUpperCase()}
                    </a>
                  </li>
                );
              })}
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
          <div class="tw-flex tw-w-fit">
            {this.isFullSize && (
              <div
                class="tw-left-0 tw-h-full tw-w-[7.5rem] min-[1320px]:tw-absolute [&>svg]:tw-block [&>svg]:tw-h-full [&>svg]:tw-w-auto"
                innerHTML={Decoration}
              ></div>
            )}

            <a
              class="tw-h-full tw-w-fit tw-transition-opacity hocus:tw-opacity-75 min-[1320px]:tw-absolute min-[1320px]:tw-left-[max(calc((100%-1320px)/2),7.5rem)] [&>svg]:tw-block [&>svg]:tw-h-full [&>svg]:tw-w-auto"
              href="https://www.uoguelph.ca"
              innerHTML={this.isFullSize ? FullSizeLogo : ReducedSizeLogo}
              aria-label="University of Guelph Home Page"
            ></a>
          </div>

          {/* Main Navigation Content */}
          {this.isFullSize ? (
            <ul class="tw-flex tw-items-center tw-justify-center tw-text-3xl tw-tracking-wide tw-font-medium [&>li]:tw-contents">
              {mainLinks.map(item => (
                <li>
                  <a
                    href={item.href}
                    class="tw-flex tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-b-8 tw-border-solid tw-border-transparent tw-p-6 tw-pt-8 tw-transition-colors hover:tw-border-uofg-yellow hover:tw-text-uofg-yellow"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
              <li>
                <a
                  class="tw-flex tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-b-8 tw-border-solid tw-border-transparent tw-p-4 tw-pb-6 tw-pt-8 tw-text-uofg-yellow tw-transition-colors hover:tw-border-uofg-yellow hover:tw-text-white [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                  href={search.href}
                  aria-label={search.text}
                >
                  <FontAwesomeIcon icon={search.icon as IconDefinition} />
                </a>
              </li>
            </ul>
          ) : (
            <div class="tw-flex tw-h-full">
              <a
                class="tw-flex tw-aspect-square tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-l tw-border-solid tw-border-uofg-grey-950 tw-px-5 tw-transition-colors [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                href={search.href}
                aria-label={search.text}
              >
                <FontAwesomeIcon icon={search.icon as IconDefinition} />
              </a>

              {/* Account Menu */}
              <uofg-menu class="tw-block tw-h-full" auto-collapse={true}>
                <button
                  slot="button"
                  aria-label="Main Menu"
                  class="tw-flex tw-aspect-square tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-l tw-border-solid tw-border-uofg-grey-950 tw-px-5 tw-transition-colors aria-expanded:tw-bg-white aria-expanded:tw-text-black [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                >
                  <FontAwesomeIcon icon={account.icon as IconDefinition} />
                </button>

                <div
                  slot="content"
                  class="tw-absolute tw-left-0 tw-top-full tw-z-50 tw-flex tw-max-h-[calc(100vh-5rem)] tw-w-full tw-flex-col tw-overflow-y-auto tw-bg-white tw-px-4 tw-text-black tw-shadow-md"
                >
                  <ul class="tw-flex tw-w-full tw-flex-col tw-py-6 [&>li]:tw-contents">
                    {account.links.map(item => (
                      <li>
                        <a
                          href={item.href}
                          class={`tw-w-full tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey ${item?.highlight ? 'tw-bg-uofg-yellow' : ''}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </uofg-menu>

              {/* Main menu */}
              <uofg-menu class="tw-block tw-h-full" auto-collapse={true}>
                <button
                  slot="button"
                  aria-label="Main Menu"
                  class="tw-flex tw-aspect-square tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-l tw-border-solid tw-border-uofg-grey-950 tw-px-5 tw-transition-colors aria-expanded:tw-bg-white aria-expanded:tw-text-black [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div
                  slot="content"
                  class="tw-absolute tw-left-0 tw-top-full tw-z-50 tw-flex tw-max-h-[calc(100vh-5rem)] tw-w-full tw-flex-col tw-overflow-y-auto tw-bg-white tw-px-4 tw-text-black tw-shadow-md"
                >
                  <span class="tw-my-4 tw-text-4xl tw-font-bold">University of Guelph</span>

                  <ul class="tw-flex tw-w-full tw-flex-col tw-pb-6 [&>li]:tw-contents">
                    {mainLinks.map(item => (
                      <li>
                        <a
                          href={item.href}
                          class={`tw-w-full tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey ${item?.highlight ? 'tw-bg-uofg-yellow' : ''}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}

                    {topLinks.map(item => {
                      if ('links' in item) {
                        return (
                          <li>
                            <uofg-menu class="tw-relative tw-block tw-h-full tw-text-black" auto-collapse={false}>
                              <button
                                class="tw-flex tw-h-auto tw-w-full tw-items-center tw-justify-between tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey aria-expanded:tw-bg-uofg-grey [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current [&>svg]:tw-transition-transform [&>svg]:aria-expanded:tw-rotate-180"
                                slot="button"
                              >
                                <span>{item.text}</span>
                                <FontAwesomeIcon icon={faCaretDown} />
                              </button>
                              <ul slot="content" class="tw-flex tw-w-full tw-flex-col [&>li]:tw-contents">
                                {item.links.map(link => (
                                  <li>
                                    <a
                                      class="tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey"
                                      href={link.href}
                                    >
                                      {link.text}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </uofg-menu>
                          </li>
                        );
                      }

                      return (
                        <li>
                          <a
                            href={item.href}
                            class={`tw-w-full tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey ${item?.highlight ? 'tw-bg-uofg-yellow tw-font-bold' : ''}`}
                          >
                            {item.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
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
            class="tw-align-items tw-relative tw-flex tw-h-[5rem] tw-justify-end tw-bg-uofg-grey tw-px-[calc((100%-1320px)/2)] tw-text-3xl lg:tw-h-16 lg:tw-whitespace-nowrap"
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
              <uofg-menu class="tw-block tw-h-full tw-whitespace-normal lg:tw-relative" auto-collapse={true}>
                <button
                  class="tw-flex tw-aspect-square tw-h-full tw-items-center tw-justify-center tw-border-0 tw-border-l tw-border-solid tw-border-uofg-grey-300 tw-px-6 tw-transition-colors aria-expanded:tw-bg-uofg-yellow lg:tw-border-l-0 [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
                  slot="button"
                  aria-label={this.pageTitle + ' Menu'}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <ul
                  class="tw-absolute tw-right-0 tw-top-full tw-z-50 tw-flex tw-w-full tw-flex-col tw-bg-white tw-px-4 tw-text-black tw-shadow-md lg:tw-w-[30rem] [&>li]:tw-contents"
                  slot="content"
                >
                  {this.pageSpecificContent?.map(item => {
                    if ('text' in item) {
                      return (
                        <li class="[&>a]:last:tw-pb-4">
                          <a
                            href={item.href}
                            class="tw-w-full tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey"
                          >
                            {item.text}
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li class="[&>uofg-menu]:last:tw-pb-6">
                        <uofg-menu class="tw-relative tw-block tw-h-full tw-text-black" auto-collapse={false}>
                          <button
                            class="tw-flex tw-h-auto tw-w-full tw-items-center tw-justify-between tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey aria-expanded:tw-bg-uofg-grey [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current [&>svg]:tw-transition-transform [&>svg]:aria-expanded:tw-rotate-180"
                            slot="button"
                          >
                            <span>{item.title}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                          </button>
                          <ul slot="content" class="tw-flex tw-w-full tw-flex-col [&>li]:tw-contents">
                            {item.links.map(item => (
                              <li>
                                <a
                                  class="tw-border-0 tw-border-b tw-border-solid tw-border-uofg-grey-400 tw-p-5 tw-transition-colors hover:tw-bg-uofg-grey"
                                  href={item.href}
                                >
                                  {item.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </uofg-menu>
                      </li>
                    );
                  })}
                </ul>
              </uofg-menu>
            )}
          </nav>
        )}
      </header>
    );
  }
}
