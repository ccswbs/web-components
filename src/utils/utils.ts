export const WEB_ANIMATIONS_SUPPORTED = 'animate' in HTMLElement.prototype;
export const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getAllFocusableElements = (container: Element | Document): Element[] => {
  const query =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], audio[controls], video[controls], details, summary, [tabindex]:not([tabindex="-1"])';

  return Array.from(container.querySelectorAll(query));
};
