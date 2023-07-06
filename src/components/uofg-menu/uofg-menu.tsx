import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { PREFERS_REDUCED_MOTION, WEB_ANIMATIONS_SUPPORTED } from '../../utils/feature-check';

const DURATION_REGEX = /^(\d*\.?\d+)(s|ms)$/;
const EASING_FUNCTION_REGEX =
  /^cubic-bezier\((\s*-?\d*\.?\d+\s*,){3}\s*-?\d*\.?\d+\s*\)$|^steps\(\s*\d+\s*(,\s*(start|end))?\s*\)$/;

type UofGMenuAnimation = {
  keyframes: Keyframe[] | PropertyIndexedKeyframes;
  callback?: () => void;
};

const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    mutation.target.dispatchEvent(new CustomEvent('childListChange', { bubbles: false }));
  }
});

const observerConfig = {
  childList: true,
};

@Component({ tag: 'uofg-menu', shadow: false })
export class UofgMenu {
  @Element() el: HTMLUofgMenuElement;
  @State() isExpanded: boolean = false;

  /**
   * Controls whether the menu should automatically collapse when the focused element in the page is not contained within the menu (e.g. it's button or content). This is useful for when you want the menu to collapse whenever a user interacts with any other part of the page.
   */
  @Prop() autoCollapse: boolean = false;

  /**
   * Dispatched whenever the menu is expanded whether by user interaction or or programmatically (e.g. expand()).
   */
  @Event({ bubbles: false, cancelable: false }) expanded: EventEmitter<void>;

  /**
   * Dispatched whenever the menu is collapsed whether by user interaction or programmatically (e.g. collapse()).
   */
  @Event({ bubbles: false, cancelable: false }) collapsed: EventEmitter<void>;

  /**
   * Dispatched whenever the menu is expanding or collapsing and the animation has started. This event is not dispatched if the animation is disabled (e.g. due to reduced motion, css variable set to none, or lack of Web Animations API support).
   */
  @Event({ bubbles: false, cancelable: false }) animationStarted: EventEmitter<boolean>;

  /**
   * Dispatched whenever the menu is expanding or collapsing and the animation has ended. This event is not dispatched if the animation is disabled (e.g. due to reduced motion, css variable set to none, or lack of Web Animations API support).
   */
  @Event({ bubbles: false, cancelable: false }) animationEnded: EventEmitter<boolean>;

  private computedStyle: CSSStyleDeclaration | null = null;
  private button: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private contentComputedStyle: CSSStyleDeclaration | null = null;

  connectedCallback() {
    // Bind functions so that "this" correctly refers to the component's instance.
    this.handleChildListChange = this.handleChildListChange.bind(this);
    this.updateButton = this.updateButton.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFocusout = this.handleFocusout.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.computedStyle = window.getComputedStyle(this.el);

    this.isExpanded = false;

    this.handleChildListChange();
    observer.observe(this.el, observerConfig);
  }

  @Listen('onChildListChange')
  private handleChildListChange() {
    this.updateButton();
    this.updateContent();
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.isExpanded = false;

      if (e.target !== this.button) {
        e.stopPropagation();
        this.isExpanded = false;
        this.button && this.button.focus();
      }
    }
  }

  private updateButton() {
    const button = this.el.querySelector('[slot="button"]') as HTMLElement;

    // Clean up the old button before setting the new one
    this.button?.removeEventListener('click', this.handleButtonClick);
    this.button?.removeAttribute('aria-expanded');
    this.button?.removeAttribute('aria-haspopup');

    // Set up the new button
    button?.setAttribute('aria-expanded', this.isExpanded ? 'true' : 'false');
    button?.setAttribute('aria-haspopup', 'true');
    button?.addEventListener('click', this.handleButtonClick);

    this.button = button;
  }

  private updateContent() {
    const content = this.el.querySelector('[slot="content"]') as HTMLElement;

    if (content == null) {
      this.content = null;
      this.contentComputedStyle = null;
    } else {
      this.content = content;
      this.content.style.display = this.isExpanded ? '' : 'none';
      this.contentComputedStyle = window.getComputedStyle(this.content);
    }
  }

  private handleButtonClick() {
    this.isExpanded = !this.isExpanded;
  }

  private handleFocusout(e: FocusEvent) {
    if (this.autoCollapse && !this.el.contains(e.relatedTarget as Node)) {
      this.isExpanded = false;
    }
  }

  @Watch('isExpanded')
  handleIsExpandedChange(newValue: boolean) {
    this.button?.setAttribute('aria-expanded', newValue ? 'true' : 'false');
    newValue ? this.expanded.emit() : this.collapsed.emit();

    // No content is slotted, so we don't need to do anything else.
    if (this.content == null) {
      return;
    }

    // Determine what animation type the user wants.
    const type: string = this.getAnimationType();

    // If Web Animations API isn't supported, or the user requested no animation, we can simply set display style
    if (!WEB_ANIMATIONS_SUPPORTED || PREFERS_REDUCED_MOTION || type === 'none') {
      this.content.style.display = newValue ? '' : 'none';
      return;
    }

    // Check if we are in the middle of an animation.
    const animations = this.content?.getAnimations().filter(animation => animation.id === 'uofg-menu-animation');

    // If we are, then we want to reverse the existing one rather than starting a new animation.
    if (animations.length > 0) {
      animations?.forEach(animation => animation.reverse());
      return;
    }

    let animationDef: UofGMenuAnimation;

    const options: KeyframeAnimationOptions = {
      id: 'uofg-menu-animation',
      duration: this.getAnimationDuration(),
      fill: 'none',
      easing: this.getAnimationEasing(),
      direction: newValue ? 'normal' : 'reverse',
    };

    // Need to remove display none, otherwise keyframe values won't be calculated correctly.
    this.content.style.display = '';

    switch (type) {
      case 'fade':
        animationDef = this.fadeAnimation();
        break;
      case 'slide':
        animationDef = this.slideAnimation();
        break;
      default:
        animationDef = this.fadeAnimation();
    }

    // We can start the animation.
    this.animationStarted.emit(newValue);
    this.content?.animate(animationDef.keyframes, options).finished.finally(() => {
      // Once the animation is done (or something went wrong during it), we update the content's display style.
      if (this.content) {
        this.content.style.display = this.isExpanded ? '' : 'none';
        animationDef.callback?.();
        this.animationEnded.emit(this.isExpanded);
      }
    });
  }

  private getAnimationType(): string {
    const str = this.computedStyle?.getPropertyValue('--uofg-menu-animation-type') || '';

    switch (str) {
      case 'slide':
      case 'fade':
        return str;
      default:
        return 'none';
    }
  }

  private getAnimationDuration(): number {
    const str = this.computedStyle?.getPropertyValue('--uofg-menu-animation-duration') || '';
    const matches = DURATION_REGEX.exec(str);

    if (matches == null) {
      return 200;
    }

    return Number.parseFloat(matches[1]) * (matches[2] == 's' ? 1000 : 1);
  }

  private getAnimationEasing(): string {
    const str = this.computedStyle?.getPropertyValue('--uofg-menu-animation-easing') || '';

    switch (str) {
      case 'linear':
      case 'ease':
      case 'ease-in':
      case 'ease-out':
      case 'ease-in-out':
      case 'step-start':
      case 'step-end':
        return str;
      default:
        return EASING_FUNCTION_REGEX.test(str) ? str : 'ease-in-out';
    }
  }

  private fadeAnimation(): UofGMenuAnimation {
    return { keyframes: [{ opacity: 0 }, { opacity: 1 }] };
  }

  private slideAnimation(): UofGMenuAnimation {
    this.content && (this.content.style.overflowY = 'hidden');

    return {
      keyframes: [
        {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
        },
        {
          height: this.contentComputedStyle?.height || 0,
          paddingTop: this.contentComputedStyle?.paddingTop || 0,
          paddingBottom: this.contentComputedStyle?.paddingBottom || 0,
          marginTop: this.contentComputedStyle?.marginTop || 0,
          marginBottom: this.contentComputedStyle?.marginBottom || 0,
        },
      ],
      callback: () => {
        this.content && (this.content.style.overflowY = '');
      },
    };
  }

  render() {
    return (
      <Host
        tabindex={-1}
        data-expanded={this.isExpanded}
        onFocusout={this.handleFocusout}
        onKeyUp={this.handleKeyUp}
      ></Host>
    );
  }

  /**
   * Get the current expanded state of the menu.
   * @returns A promise which will resolve to the current expanded state.
   */
  @Method()
  public async getExpanded() {
    return this.isExpanded;
  }

  /**
   * Set the expanded state of the menu.
   * @param value The new expanded state.
   */
  @Method()
  public async setExpanded(value: boolean) {
    this.isExpanded = value;
  }

  /**
   * Toggle the expanded state of the menu.
   * @returns A promise which will resolve to the new expanded state.
   */
  @Method()
  public async toggle() {
    this.isExpanded = !this.isExpanded;
    return this.isExpanded;
  }

  /**
   * Collapse the menu. This is the same as setting the expanded state to false.
   * @returns empty Promise.
   */
  @Method()
  public async collapse() {
    this.isExpanded = false;
  }

  /**
   * Expand the menu. This is the same as setting the expanded state to true.
   * @returns empty Promise.
   */
  @Method()
  public async expand() {
    this.isExpanded = true;
  }
}
