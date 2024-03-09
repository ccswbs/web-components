import { Component, Element, Listen, Prop, State, h } from '@stencil/core';
import { FontAwesomeIcon } from '../../utils/font-awesome-icon';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { attachTailwind } from '../../utils/utils';

@Component({ tag: 'uofg-back-to-top', shadow: true })
export class UofgBackToTop {
  /**
   * The number of pixels the user has to scroll down before the button appears.
   */
  @Prop() threshold: number = 50;
  @State() isVisible: boolean = false;
  @Element() el: HTMLUofgBackToTopElement;

  connectedCallback() {
    attachTailwind(this.el.shadowRoot as ShadowRoot);
    this.onScroll();
  }

  @Listen('scroll', { target: 'window' })
  onScroll() {
    this.isVisible = window.scrollY >= this.threshold;
  }

  render() {
    return (
      <button
        aria-label="Go back to the top"
        class={{
          'tw-opacity-100': this.isVisible,
          'tw-fixed tw-bottom-0 tw-right-0 tw-z-[1000] tw-m-4 tw-flex tw-h-[3.5rem] tw-w-[3.5rem] tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-[50%] tw-border tw-border-solid tw-border-white tw-bg-black tw-text-white tw-opacity-0 tw-transition hocus:tw-bg-uofg-red [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current':
            true,
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    );
  }
}
