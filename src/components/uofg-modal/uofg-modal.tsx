import { Component, Watch, Element, Event, EventEmitter, State, Prop, Method, h } from '@stencil/core';
import { FontAwesomeIcon } from 'utils/font-awesome-icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getAllFocusableElements } from 'utils/utils';

/**
 * @part content - The modal content container.
 * @part dismiss-button - The button that closes the modal.
 */
@Component({ tag: 'uofg-modal', styleUrl: 'uofg-modal.css', shadow: true })
export class UofgModal {
  /**
   * The label for the modal. It is recommended that you set this to describe the modal's content.
   * This is required for accessibility.
   */
  @Prop() label: string;

  /**
   * Used to determine whether the modal should be rendered as an alert dialog.
   * This is useful for when you want to use the modal to alert the user of something, rather than to ask the user to make a decision.
   * If this is set to true, the modal will be rendered with a role of "alertdialog" instead of "dialog".
   */
  @Prop() alertDialog: boolean = false;

  /**
   * Used to determine whether the modal content is centered vertically.
   */
  @Prop() centered: boolean = false;

  /**
   * Used to determine whether clicking on the backdrop of the modal will close the modal.
   * If this is set to true, clicking on the backdrop will NOT close the modal.
   */
  @Prop() staticBackdrop: boolean = false;

  /**
   * Used to determine whether the modal should open automatically when the component is first rendered.
   * It is important to ensure this is only set to true for ONE modal on the page.
   */
  @Prop() autoOpen: boolean = false;

  /**
   * Dispatched whenever the modal is opened whether by user interaction or programmatically (e.g. open()).
   */
  @Event({ bubbles: false, cancelable: false }) opened: EventEmitter<void>;

  /**
   * Dispatched whenever the modal is closed whether by user interaction or programmatically (e.g. close()).
   */
  @Event({ bubbles: false, cancelable: false }) closed: EventEmitter<void>;

  @State() isOpen: boolean = false;
  @Element() el: HTMLUofgModalElement;
  private container: HTMLDivElement;
  private dismissButton: HTMLButtonElement;
  private inertElements: HTMLElement[] = [];

  connectedCallback() {
    // Bind event handlers so that 'this' is always the component instance.
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);

    if (this.autoOpen) {
      this.isOpen = true;
    }
  }

  disconnectedCallback() {
    // Just in case the modal is removed from the DOM before it is closed, make sure to remove the inert attribute from all elements that we marked as inert when the modal was opened.
    for (const element of this.inertElements) {
      element.removeAttribute('inert');
    }
  }

  private handleClick(e: MouseEvent) {
    if (!this.staticBackdrop && e.target === e.currentTarget) {
      this.isOpen = false;
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  private handleFocusOut(e: FocusEvent) {
    if (!this.isOpen) return; // Don't do anything if the modal is closed.

    const relatedTarget = e.relatedTarget as HTMLElement;

    // If the focus is moving outside the modal
    if (!this.container.contains(relatedTarget) && !this.el.contains(relatedTarget)) {
      e.preventDefault();

      // If the focus is moving away from the dismiss button, focus the last focusable element in the modal.
      if (e.target === this.dismissButton) {
        const focusableElements = getAllFocusableElements(this.el);
        (focusableElements[focusableElements.length - 1] as HTMLElement)?.focus();
      } else {
        // Otherwise, focus the dismiss button.
        this.dismissButton.focus();
      }
    }
  }

  @Watch('isOpen')
  handleIsOpenChange(newValue: boolean) {
    if (newValue) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            // Focus the container element when the modal is opened, so that the screen reader's will announce the modal when it opens.
            this.container.focus();
          });
        });
      });

      // Mark outer elements as inert when the modal is open.
      let current: HTMLElement | null = this.el;

      // We want to mark all elements outside the modal as inert, so we need to traverse up the DOM tree until we reach the body element.

      while (current !== null && current !== document.body) {
        const parent = current.parentElement;

        // If parent is null, then we may be inside a shadow root. If so, we get the host element and continue traversing up the DOM tree.
        if (parent === null) {
          const root = current.getRootNode();

          if (root instanceof ShadowRoot) {
            current = root.host as HTMLElement;
            continue;
          }
        }

        if (parent !== null) {
          for (const child of parent.children) {
            if (child !== current && !child.inert) {
              // Mark the element as inert and store it in an array so that we can remove the inert attribute when the modal closes.
              child.inert = true;
              this.inertElements.push(child as HTMLElement);
            }
          }
        }

        current = parent;

        this.opened.emit();
      }
    } else {
      // Remove the inert attribute from all elements that we marked as inert when the modal was opened.
      for (const element of this.inertElements) {
        element.removeAttribute('inert');
      }

      // Clear the array of inert elements. This is important because we don't want to keep a reference to elements as they may be removed from the DOM and we could cause a memory leak.
      this.inertElements = [];

      this.closed.emit();
    }

    // Prevent scrolling of the body when the modal is open.
    document.body.style.overflow = newValue ? 'hidden' : '';
  }

  render() {
    return (
      <div
        class={{
          'tw-visible tw-opacity-100': this.isOpen,
          'tw-invisible tw-opacity-0': !this.isOpen,
          'tw-fixed tw-left-0 tw-top-0 tw-z-[1000] tw-flex tw-h-screen tw-w-screen tw-bg-black tw-bg-opacity-50 tw-transition-[opacity,visibility]':
            true,
        }}
        role={this.alertDialog ? 'alertdialog' : 'dialog'}
        aria-modal={this.isOpen ? 'true' : ''}
        aria-label={this.label}
        tabIndex={-1}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onFocusout={this.handleFocusOut}
        ref={(el: HTMLDivElement) => (this.container = el)}
      >
        <div
          part="content"
          class={{
            'tw-visible tw-opacity-100': this.isOpen,
            'tw-translate-y-[calc(-50%_-_50px)]': !this.isOpen && this.centered,
            'tw-translate-y-[-50px]': (!this.isOpen && !this.centered) || (this.isOpen && this.centered),
            'tw-z-1 tw-absolute tw-left-1/2 tw-h-fit tw-max-h-full tw-w-fit tw-max-w-full -tw-translate-x-1/2 tw-overflow-auto tw-p-8 tw-transition-transform motion-reduce:tw-transition-none':
              true,
          }}
        >
          <button
            class="[&>svg]:h-[1em] tw-absolute tw-right-8 tw-top-8 tw-z-[2] tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-text-3xl tw-p-2 tw-text-[var(--uofg-modal-dismiss-color,white)] [&>svg]:tw-h-[1em] [&>svg]:tw-fill-current"
            part="dismiss-button"
            aria-label="Close modal"
            ref={(el: HTMLButtonElement) => (this.dismissButton = el)}
            onClick={() => (this.isOpen = false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <slot></slot>
        </div>
      </div>
    );
  }

  /**
   * Get the current state of the modal.
   * @returns A promise which will resolve to true when the modal is open, or false when the modal is closed.
   */
  @Method()
  public async getState() {
    return this.isOpen;
  }

  /**
   * Set the state of the modal.
   * @param value The new state, set it to true to open the modal, or false to close the modal.
   */
  @Method()
  public async setState(value: boolean) {
    this.isOpen = value;
  }

  /**
   * Toggle the state of the modal.
   * @returns A promise which will resolve to true (if the modal opened) or false (if the modal closed).
   */
  @Method()
  public async toggle() {
    this.isOpen = !this.isOpen;
    return this.isOpen;
  }

  /**
   * Closes the modal.
   * @returns empty Promise.
   */
  @Method()
  public async close() {
    this.isOpen = false;
  }

  /**
   * Opens the modal.
   * @returns empty Promise.
   */
  @Method()
  public async open() {
    this.isOpen = true;
  }
}
