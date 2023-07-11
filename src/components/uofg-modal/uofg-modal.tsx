import { Component, Watch, Element, State, Prop, Method, h } from '@stencil/core';
import { FontAwesomeIcon } from 'utils/font-awesome-icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getAllFocusableElements } from 'utils/utils';

@Component({ tag: 'uofg-modal', styleUrl: 'uofg-modal.scss', shadow: true })
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

  @State() isOpen: boolean = false;
  @Element() el: HTMLUofgModalElement;
  private dismissButton: HTMLButtonElement;

  connectedCallback() {
    // Bind event handlers so that 'this' is always the component instance.
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    if (this.autoOpen) {
      this.isOpen = true;
    }
  }

  handleClick(e: MouseEvent) {
    if (!this.staticBackdrop && e.target === e.currentTarget) {
      this.isOpen = false;
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    // If the modal is open and the user presses the tab key, we need to ensure that focus is trapped within the modal.
    if (e.key === 'Tab' && this.isOpen) {
      const focusableElements = getAllFocusableElements(this.el);
      
      // If there are no focusable elements in the modal, focus the dismiss button.
      if(focusableElements.length === 0) { 
        e.preventDefault();
        this.dismissButton.focus();
      }

      const firstFocusable = this.dismissButton; // The dismiss button is always the first focusable element in the modal.
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.target === firstFocusable && e.shiftKey) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (e.target === lastFocusable && !e.shiftKey) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  @Watch('isOpen')
  handleIsOpenChange(newValue: boolean) {
    if (newValue === true) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.dismissButton.focus();
          });
        });
      });
    }
  }

  render() {
    return (
      <div
        id="uofg-modal"
        class={{ open: this.isOpen }}
        role={this.isOpen ? (this.alertDialog ? 'alertdialog' : 'dialog') : ''}
        aria-modal={this.isOpen}
        aria-label={this.label}
        aria-hidden={!this.isOpen}
        tabIndex={-1}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
      >
        <div id="uofg-modal-content" part="content" class={{ centered: this.centered }}>
          <button
            id="uofg-modal-dismiss"
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
