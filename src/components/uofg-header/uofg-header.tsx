import { Component, FunctionalComponent, Element, h, Listen, Prop, State } from '@stencil/core';
import Decoration from './decoration.svg';
import FullSizeLogo from './logo-full.svg';
import ReducedSizeLogo from './logo-reduced.svg';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';

const TopLinks: FunctionalComponent = () => (
  <ul>
    <li>
      <a href="https://bbis.alumni.uoguelph.ca/BBIS_Cannon/give/uofg">GIVE</a>
    </li>
    <li>
      <a href="https://admission.uoguelph.ca/applynow">APPLY</a>
    </li>
    <li>
      <a href="https://news.uoguelph.ca/">NEWS</a>
    </li>
  </ul>
);

const HelloMenu: FunctionalComponent<{ autoCollapse: boolean }> = props => (
  <uofg-menu class="uofg-header-hello-you-menu" auto-collapse={props.autoCollapse}>
    <button slot="button">
      <span>HELLO!</span>
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
    <ul slot="content">
      <li>
        <a href="https://uoguelph.ca/future-students">Future Students</a>
      </li>
      <li>
        <a href="https://www.uoguelph.ca/students">Current Students</a>
      </li>
      <li>
        <a href="https://alumni.uoguelph.ca/">Alumni & Donors</a>
      </li>
      <li>
        <a href="https://www.uoguelph.ca/faculty">Faculty & Staff</a>
      </li>
      <li>
        <a href="https://cecs.uoguelph.ca/employers-institutions">Employers & Partners</a>
      </li>
    </ul>
  </uofg-menu>
);

const MainLinks: FunctionalComponent = () => (
  <ul class="uofg-header-global-links">
    <li>
      <a href="https://uoguelph.ca/about">About</a>
    </li>
    <li>
      <a href="https://www.uoguelph.ca/explore-all-programs/">Academics</a>
    </li>
    <li>
      <a href="https://uoguelph.ca/admissions">Admissions</a>
    </li>
    <li>
      <a href="https://uoguelph.ca/research">Research</a>
    </li>
    <li>
      <a href="https://www.uoguelph.ca/studentexperience/">Student Life</a>
    </li>
  </ul>
);

const AccountLink: FunctionalComponent = () => (
  <a href="https://intranet.uoguelph.ca" aria-label="University of Guelph Intranet">
    <FontAwesomeIcon icon={faRightToBracket} />
  </a>
);

const SearchLink: FunctionalComponent = () => (
  <a href="https://uoguelph.ca/search" aria-label="Search University of Guelph">
    <FontAwesomeIcon icon={faSearch} />
  </a>
);

interface PageSpecificLink {
  text: string;
  href: string;
  attributes?: Record<string, string>;
}

interface PageSpecificSubMenu {
  title: string;
  links: PageSpecificLink[];
}

type PageSpecificContent = Array<PageSpecificLink | PageSpecificSubMenu | null | undefined>;

const PageSpecific: FunctionalComponent<{ content: PageSpecificContent; autoCollapse?: boolean }> = props => (
  <ul class="uofg-header-page-specific">
    {props.content
      ?.map(item => {
        if (!item) {
          return null;
        }

        if ('text' in item) {
          return (
            <li>
              <a href={item.href} {...item.attributes}>
                {item.text}
              </a>
            </li>
          );
        }

        return (
          <li>
            <uofg-menu autoCollapse={props.autoCollapse}>
              <button slot="button">
                <span>{item.title}</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <ul slot="content">
                {item.links.map(link => (
                  <li>
                    <a href={link.href} {...link.attributes}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </uofg-menu>
          </li>
        );
      })
      .filter(Boolean)}
  </ul>
);

const TRANSITION_BREAKPOINT = 1024;
const MAX_CONTENT_WIDTH = 1320;

@Component({ tag: 'uofg-header', styleUrl: 'uofg-header.scss', shadow: true })
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
            return {
              title: child.getAttribute('data-title'),
              links: Array.from(child.querySelectorAll('a')).map(aToPageSpecificLink),
            } as PageSpecificSubMenu;
        }
      });
  }

  render() {
    return (
      <header id="uofg-header">
        {this.isFullSize && (
          <div id="uofg-header-top-content-container">
            <TopLinks />
            <HelloMenu autoCollapse={true} />
          </div>
        )}

        <nav id="uofg-header-main-content-container" class={{ 'full-height': this.isFullSize }} aria-label="Main">
          <div id="uofg-header-logo-container">
            {this.isFullSize && <div id="uofg-header-decorative-img" innerHTML={Decoration}></div>}

            <a
              id="uofg-header-logo"
              href="https://www.uoguelph.ca"
              innerHTML={this.isFullSize ? FullSizeLogo : ReducedSizeLogo}
              aria-label="University of Guelph Home Page"
            ></a>
          </div>

          {this.isFullSize ? (
            <div id="uofg-header-full-main-content" class="uofg-header-main-content">
              <MainLinks />
              <AccountLink />
              <SearchLink />
            </div>
          ) : (
            <div id="uofg-header-reduced-main-content" class="uofg-header-main-content">
              <AccountLink />
              <SearchLink />
              <uofg-menu id="uofg-header-main-menu" auto-collapse={true}>
                <button slot="button" aria-label="Main Menu">
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div slot="content">
                  <span>University of Guelph</span>
                  <MainLinks />
                  <HelloMenu autoCollapse={false} />
                </div>
              </uofg-menu>
            </div>
          )}
        </nav>

        {this.pageSpecificContent.length > 0 && (
          <nav id="uofg-header-sub-content-container" ref={node => (this.subContainer = node)} aria-label="Department/Topic">
            {this.pageTitle &&
              (this.pageUrl ? (
                <a id="uofg-header-page-title" href={this.pageUrl}>
                  {this.pageTitle}
                </a>
              ) : (
                <span id="uofg-header-page-title">{this.pageTitle}</span>
              ))}

            {this.isFullSize && !this.isSubContainerOverflowing ? (
              <div id="uofg-header-full-sub-content" class="uofg-header-sub-content">
                <PageSpecific content={this.pageSpecificContent} autoCollapse={true} />
              </div>
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
                    <PageSpecific content={this.pageSpecificContent} />
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
