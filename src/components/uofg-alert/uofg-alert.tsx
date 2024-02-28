import { Component, h } from '@stencil/core';
import { FontAwesomeIcon } from 'utils/font-awesome-icon';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({ tag: 'uofg-alert', styleUrl: 'uofg-alert.css', shadow: true })
export class UofgAlert {
  render() {
    return (
      <div class="tw-flex tw-flex-col tw-text-3xl">
        <div class="tw-flex tw-items-center tw-bg-uofg-red tw-p-8 tw-text-4xl tw-text-white [&>svg]:tw-mr-4 [&>svg]:tw-h-[1.5em] [&>svg]:tw-fill-current">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <slot name="title"></slot>
        </div>

        <div class='tw-flex tw-flex-col tw-bg-white tw-px-8 tw-py-6 [&>slot[name="message"]::slotted(*)]:tw-text-2xl [&>slot[name="subtitle"]::slotted(*)]:tw-mb-8 [&>slot[name="subtitle"]::slotted(*)]:tw-text-4xl [&>slot[name="subtitle"]::slotted(*)]:tw-font-bold'>
          <slot name="subtitle"></slot>
          <slot name="message"></slot>
        </div>

        <div class="tw-flex tw-bg-uofg-grey tw-py-4 tw-px-8 tw-text-2xl">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
