import { type FunctionalComponent, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';

export interface PageSpecificLink {
  text: string;
  href: string;
  attributes?: Record<string, string>;
}

export interface PageSpecificSubMenu {
  title: string;
  links: PageSpecificLink[];
}

export type PageSpecificContent = Array<PageSpecificLink | PageSpecificSubMenu | null | undefined>;

type PageSpecificProps = {
  content: PageSpecificContent;
  autoCollapseMenus?: boolean;
};

export const PageSpecific: FunctionalComponent<PageSpecificProps> = props => (
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
            <uofg-menu autoCollapse={props.autoCollapseMenus}>
              <button slot="button">
                <span>{item.title}</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <ul slot="content" role="menu">
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
