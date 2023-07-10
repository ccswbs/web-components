import { Component, h } from '@stencil/core';
import { FontAwesomeIcon } from 'utils/font-awesome-icon';
import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';

@Component({ tag: 'uofg-alert', styleUrl: 'uofg-alert.scss', shadow: true })
export class UofgAlert {
  render() {
    return (
      <div id="uofg-alert">
        <div id="uofg-alert-title">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <slot name="title"></slot>
        </div>

        <div id="uofg-alert-body">
          <slot name="subtitle"></slot>
          <slot name="message"></slot>
        </div>

        <div id="uofg-alert-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
