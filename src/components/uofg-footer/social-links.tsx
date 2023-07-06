import { FunctionalComponent, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitterSquare,
  faYoutube,
  type IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

type SocialLinkProps = { name: string; url: string; icon: IconDefinition };
const SocialLink: FunctionalComponent<SocialLinkProps> = props => (
  <li>
    <a href={props.url} aria-label={props.name}>
      <FontAwesomeIcon icon={props.icon} />
    </a>
  </li>
);

export const SocialLinks: FunctionalComponent = () => (
  <ul id="uofg-footer-social-links">
    <SocialLink name="Twitter" url="https://twitter.com/uofg" icon={faTwitterSquare} />
    <SocialLink name="Facebook" url="https://www.facebook.com/uofguelph" icon={faFacebookSquare} />
    <SocialLink name="Instagram" url="https://www.instagram.com/uofguelph/" icon={faInstagram} />
    <SocialLink name="Youtube" url="https://www.youtube.com/user/uofguelph" icon={faYoutube} />
    <SocialLink name="LinkedIn" url="https://www.linkedin.com/school/university-of-guelph/" icon={faLinkedin} />
    <SocialLink name="TikTok" url="https://www.tiktok.com/@uofguelph" icon={faTiktok} />
  </ul>
);
