import { Component, FunctionalComponent, h } from '@stencil/core';
import { FontAwesomeIcon } from 'utils/font-awesome-icon';
import improveLifeLogo from './improve-life.svg';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons/';
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

const SocialLink: FunctionalComponent<{ name: string; url: string; icon: IconDefinition }> = props => (
  <li>
    <a href={props.url} aria-label={props.name}>
      <FontAwesomeIcon icon={props.icon} />
    </a>
  </li>
);

const FooterLink: FunctionalComponent<{ text: string; url: string; icon: IconDefinition; title?: string }> = props => (
  <li>
    <a href={props.url} title={props.title}>
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.text}</span>
    </a>
  </li>
);

@Component({ tag: 'uofg-footer', styleUrl: 'uofg-footer.scss', shadow: true })
export class UofgFooter {
  render() {
    return (
      <footer id="uofg-footer">
        <div id="uofg-footer-content">
          <div id="uofg-footer-social" class="uofg-footer-content-separator">
            <a
              id="uofg-footer-improve-life"
              href="//www.uoguelph.ca/improve-life"
              aria-label="Improve Life"
              innerHTML={improveLifeLogo}
            ></a>

            <ul id="uofg-footer-social-links">
              <SocialLink name="Twitter" url="https://twitter.com/uofg" icon={faTwitterSquare} />
              <SocialLink name="Facebook" url="https://www.facebook.com/uofguelph" icon={faFacebookSquare} />
              <SocialLink name="Instagram" url="https://www.instagram.com/uofguelph/" icon={faInstagram} />
              <SocialLink name="Youtube" url="https://www.youtube.com/user/uofguelph" icon={faYoutube} />
              <SocialLink
                name="LinkedIn"
                url="https://www.linkedin.com/school/university-of-guelph/"
                icon={faLinkedin}
              />
              <SocialLink name="TikTok" url="https://www.tiktok.com/@uofguelph" icon={faTiktok} />
            </ul>

            <a href="https://www.uoguelph.ca/web/socialmedia/">Social Media Directory</a>
            <a href="//www.uoguelph.ca/web/">© {new Date().getFullYear()} University of Guelph</a>
          </div>

          <ul id="uofg-footer-links" class="uofg-footer-content-separator">
            <FooterLink
              text="Accessibility"
              url="https://www.uoguelph.ca/diversity-human-rights/accessibility-u-g"
              icon={faUniversalAccess}
            />
            <FooterLink text="Privacy" url="https://www.uoguelph.ca/web/privacy/" icon={faKey} />
            <FooterLink text="Site Map" url="https://www.uoguelph.ca/sitemap" icon={faSitemap} />
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

          <address id="uofg-footer-address" class="uofg-footer-content-separator">
            <strong>University of Guelph</strong>
            <span>50 Stone Road East,</span>
            <span>Guelph, Ontario, Canada</span>
            <span>N1G 2W1</span>
            <a href="tel:1-519-824-4120">
              <FontAwesomeIcon icon={faPhoneFlip} />
              <span>519-824-4120</span>
            </a>
          </address>
        </div>
      </footer>
    );
  }
}
