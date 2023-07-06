import { FunctionalComponent, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';

export const SearchBar: FunctionalComponent = () => (
  <form class="uofg-header-search-bar" method="get" role="search" action="https://uoguelph.ca/search/">
    <input type="text" name="q" />
    <input type="hidden" name="cx" value="002616817380988741256:tp3ks5ha2dw" />
    <input type="hidden" name="cof" value="FORID:11" />
    <input type="hidden" name="ie" value="UTF-8" />
    <button class="uofg-search-bar-button" aria-label="Search" type="submit">
      <FontAwesomeIcon icon={faSearch} />
    </button>
  </form>
);
