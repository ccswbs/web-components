import { Component, Listen, Prop, State, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';

@Component({ tag: 'uofg-back-to-top', styleUrl: 'uofg-back-to-top.scss', shadow: true })
export class UofgBackToTop {
  /**
   * The number of pixels the user has to scroll down before the button appears.
   */
  @Prop() threshold: number = 50;
  @State() isVisible: boolean = false;

  connectedCallback() {
    this.onScroll();
  }

  @Listen('scroll', { target: 'window' })
  onScroll() {
    this.isVisible = window.scrollY >= this.threshold;
  }

  render() {
    return (
      <button
        id="uofg-back-to-top"
        aria-label="Go back to the top"
        class={{ visible: this.isVisible }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    );
  }
}
