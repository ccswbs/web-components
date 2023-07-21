import { Component, Fragment, Prop, h } from '@stencil/core';

@Component({ tag: 'uofg-card', styleUrl: 'uofg-card.scss', shadow: true })
export class UofgCard {
  @Prop() href: string;

  render() {
    const Body = () => (
      <Fragment>
        <div id="uofg-card-img">
          <slot name="img"></slot>
        </div>
        <div id="uofg-card-content">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
          <slot name="body"></slot>
        </div>
        <div id="uofg-card-footer">
          <slot name="footer"></slot>
        </div>
      </Fragment>
    );

    return this.href ? (
      <a href={this.href} id="uofg-card">
        <Body />
      </a>
    ) : (
      <div id="uofg-card">
        <Body />
      </div>
    );
  }
}
