import { Component, Fragment, Element, Prop, h } from '@stencil/core';
import { attachTailwind } from '../../utils/utils';

@Component({ tag: 'uofg-card', shadow: true })
export class UofgCard {
  /**
   * The URL the card should link to. If this property is set, the card will be rendered as an anchor ("a" tag).
   */
  @Prop() href: string;
  @Element() el: HTMLUofgCardElement;

  connectedCallback() {
    attachTailwind(this.el.shadowRoot as ShadowRoot);
  }

  render() {
    const Body = () => (
      <Fragment>
        <div class="tw-flex tw-items-center tw-justify-center tw-overflow-hidden [&>slot::slotted(img)]:tw-w-full [&>slot::slotted(img)]:tw-object-cover [&>slot::slotted(img)]:tw-transition-transform">
          <slot name="img"></slot>
        </div>
        <div class='tw-flex tw-p-4 tw-flex-col [&>slot[name="body"]::slotted(*)]:tw-m-0 [&>slot[name="body"]::slotted(*)]:tw-text-xl [&>slot[name="body"]::slotted(*)]:tw-font-normal [&>slot[name="subtitle"]::slotted(*)]:tw-m-0 [&>slot[name="subtitle"]::slotted(*)]:tw-py-4 [&>slot[name="subtitle"]::slotted(*)]:tw-text-2xl [&>slot[name="subtitle"]::slotted(*)]:tw-font-normal [&>slot[name="title"]::slotted(*)]:tw-m-0 [&>slot[name="title"]::slotted(*)]:tw-py-4 [&>slot[name="title"]::slotted(*)]:tw-text-4xl [&>slot[name="title"]::slotted(*)]:tw-font-normal'>
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
          <slot name="body"></slot>
        </div>
        <div class="tw-bg-uofg-blue-200 tw-px-4 tw-py-2">
          <slot name="footer"></slot>
        </div>
      </Fragment>
    );

    const classes = 'tw-flex tw-flex-col tw-bg-uofg-blue-50 tw-text-2xl tw-rounded tw-overflow-hidden';

    return (this?.href ?? '') != '' ? (
      <a
        href={this.href}
        class={`${classes} tw-border tw-border-solid tw-border-transparent tw-transition-colors focus-within:tw-border-uofg-blue-400 hocus:tw-border-uofg-blue-400 [&>div>slot::slotted(img)]:hocus:tw-scale-110 [&>div>slot::slotted(img)]:hocus:tw-transform [&>div>slot::slotted(img)]:hocus:tw-transition-transform`}
      >
        <Body />
      </a>
    ) : (
      <div class={classes}>
        <Body />
      </div>
    );
  }
}
