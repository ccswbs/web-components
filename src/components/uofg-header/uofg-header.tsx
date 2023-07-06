import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import {
  PageSpecific,
  type PageSpecificContent,
  type PageSpecificLink,
  type PageSpecificSubMenu,
} from './page-specific';
import Decoration from './decoration.svg';
import FullSizeLogo from './logo-full-size.svg';
import ReducedSizeLogo from './logo-reduced-size.svg';
import { GlobalLinks } from './global-links';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faBars, faRightToBracket, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { HelloYou } from './hello-you';
import { SearchBar } from './search';

@Component({ tag: 'uofg-header', styleUrl: 'uofg-header.scss', shadow: true })
export class UofgHeader {
  /**
   * The title of the pages that the header is being used on. For example, for the Convocation pages, this would be set to "Convocation".
   */
  @Prop() pageTitle: string = '';

  /**
   * The URL to the home/landing page for the pages the header is being used on. For example, for the Convocation pages, this would be set to "https://www.uoguelph.ca/convocation/".
   */
  @Prop() pageUrl: string = '';

  @Element() el: HTMLUofgHeaderElement;
  @State() isFullSize: boolean = false;
  @State() pageSpecificContent: PageSpecificContent;
  private observer: MutationObserver;

  connectedCallback() {
    this.updateFullSize();
    this.updatePageSpecificContent();

    this.observer ??= new MutationObserver(() => {
      this.updatePageSpecificContent();
    });
    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  @Listen('resize', { target: 'window' })
  updateFullSize() {
    this.isFullSize = window.innerWidth >= 1024;
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
            <ul>
              <li>
                <a href="https://bbis.alumni.uoguelph.ca/BBIS_Cannon/give/uofg">GIVE</a>
              </li>
              <li>
                <a href="https://uoguelph.ca/apply">APPLY</a>
              </li>
              <li>
                <a href="https://news.uoguelph.ca/">NEWS</a>
              </li>
            </ul>

            <HelloYou autoCollapse={true} />
          </div>
        )}

        <div id="uofg-header-main-content-container" class={{ 'full-height': this.isFullSize }}>
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
              <GlobalLinks />

              <a href="https://intranet.uoguelph.ca" aria-label="Intranet">
                <FontAwesomeIcon icon={faRightToBracket} />
              </a>

              <uofg-menu class="uofg-header-search-menu" auto-collapse={true}>
                <button slot="button" aria-label="Search Menu">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <div slot="content">
                  <span>Search the University of Guelph</span>
                  <SearchBar />
                </div>
              </uofg-menu>
            </div>
          ) : (
            <div id="uofg-header-reduced-main-content" class="uofg-header-main-content">
              <a href="https://intranet.uoguelph.ca" aria-label="Intranet">
                <FontAwesomeIcon icon={faRightToBracket} />
              </a>

              <uofg-menu class="uofg-header-search-menu" auto-collapse={true}>
                <button slot="button" aria-label="Search Menu">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <div slot="content">
                  <span>Search the University of Guelph</span>
                  <SearchBar />
                </div>
              </uofg-menu>

              <uofg-menu id="uofg-header-main-menu" auto-collapse={true}>
                <button slot="button" aria-label="Main Menu">
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div slot="content">
                  <span>University of Guelph</span>
                  <GlobalLinks />
                  <HelloYou autoCollapse={false} />
                </div>
              </uofg-menu>
            </div>
          )}
        </div>

        {this.pageSpecificContent.length > 0 && (
          <div id="uofg-header-sub-content-container">
            {this.pageTitle &&
              (this.pageUrl ? (
                <a id="uofg-header-page-title" href={this.pageUrl}>
                  {this.pageTitle}
                </a>
              ) : (
                <span id="uofg-header-page-title">{this.pageTitle}</span>
              ))}

            {this.isFullSize ? (
              <div id="uofg-header-full-sub-content" class="uofg-header-sub-content">
                <PageSpecific content={this.pageSpecificContent} autoCollapseMenus={true} />
              </div>
            ) : (
              <div id="uofg-header-reduced-sub-content" class="uofg-header-sub-content">
                <uofg-menu id="uofg-header-sub-menu" auto-collapse={true}>
                  <button slot="button" aria-label={this.pageTitle + ' Menu'}>
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                  <div slot="content">
                    <PageSpecific content={this.pageSpecificContent} />
                  </div>
                </uofg-menu>
              </div>
            )}
          </div>
        )}
      </header>
    );
  }
}
