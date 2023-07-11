import { Component, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { SocialLinks } from './social-links';
import { FooterLinks } from './footer-links';
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import improveLifeLogo from './improve-life.svg';

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

            <SocialLinks />

            <a href="https://www.uoguelph.ca/web/socialmedia/">Social Media Directory</a>
            <a href="//www.uoguelph.ca/web/">© {new Date().getFullYear()} University of Guelph</a>
          </div>

          <FooterLinks />

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
