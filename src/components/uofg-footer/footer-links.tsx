import { FunctionalComponent, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import {
  faBriefcase,
  faCalendar,
  faCircleCheck,
  faHandHoldingHeart,
  faKey,
  faList,
  faSitemap,
  faTree,
  faUniversalAccess,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type FooterLinkProps = { text: string; url: string; icon: IconDefinition; title?: string };
const FooterLink: FunctionalComponent<FooterLinkProps> = props => (
  <li>
    <a href={props.url} title={props.title}>
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.text}</span>
    </a>
  </li>
);

export const FooterLinks: FunctionalComponent = () => (
  <ul id="uofg-footer-links" class="uofg-footer-content-separator">
    <FooterLink
      text="Accessibility"
      url="https://www.uoguelph.ca/diversity-human-rights/accessibility-u-g"
      icon={faUniversalAccess}
    />
    <FooterLink text="Privacy" url="https://www.uoguelph.ca/web/privacy/" icon={faKey} />
    <FooterLink text="Site Map" url="https://www.uoguelph.ca/site-map/" icon={faSitemap} />
    <FooterLink text="Status Page" url="https://uoguelph.statuspage.io/" icon={faCircleCheck} />
    <FooterLink
      text="Land Acknowledgement"
      url="https://www.uoguelph.ca/land-acknowledgement/"
      icon={faTree}
      title="The University of Guelph resides on the treaty lands and territory of the Mississaugas of the Credit. We recognize that today this gathering place is home to many First Nations, Inuit and Métis peoples and acknowledging them reminds us of our collective responsibility to the land where we learn and work."
    />
    <FooterLink
      text="Careers"
      url="https://www.uoguelph.ca/hr/careers-guelph/current-opportunities"
      icon={faBriefcase}
    />
    <FooterLink
      text="Undergraduate Calendar"
      url="https://www.uoguelph.ca/registrar/calendars/undergraduate/current/"
      icon={faCalendar}
    />
    <FooterLink
      text="Graduate Calendar"
      url="https://www.uoguelph.ca/registrar/calendars/graduate/current/"
      icon={faCalendar}
    />
    <FooterLink text="Program Plans" url="https://admission.uoguelph.ca/programs" icon={faList} />
    <FooterLink
      text="Give to U of G"
      url="https://www.alumni.uoguelph.ca/give-to-guelph/how-to-give"
      icon={faHandHoldingHeart}
    />
  </ul>
);
