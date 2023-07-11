import { FunctionalComponent, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

type HelloYouProps = {
  autoCollapse: boolean;
};

export const HelloYou: FunctionalComponent<HelloYouProps> = props => (
  <uofg-menu class="uofg-header-hello-you-menu" auto-collapse={props.autoCollapse}>
    <button slot="button" aria-label="Hello, YOU! menu">
      <span>Hello, YOU!</span>
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
    <ul slot="content">
      <li>
        <a href="https://uoguelph.ca/future-students">Future Students</a>
      </li>
      <li>
        <a href="https://uoguelph.ca/current-students">Current Students</a>
      </li>
      <li>
        <a href="https://uoguelph.ca/alumni-and-donors">Alumni & Donors</a>
      </li>
      <li>
        <a href="https://uoguelph.ca/staff-and-faculty">Staff & Faculty</a>
      </li>
      <li>
        <a href="https://uoguelph.ca/parents-and-visitors">Parents & Visitors</a>
      </li>
      <li>
        <a href="https://uoguelph.ca/employers-and-partners">Employers & Partners</a>
      </li>
    </ul>
  </uofg-menu>
);
