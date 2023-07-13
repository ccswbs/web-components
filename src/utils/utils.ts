export const WEB_ANIMATIONS_SUPPORTED = () => {
  return typeof window !== 'undefined' && 'animate' in HTMLElement.prototype;
};

export const PREFERS_REDUCED_MOTION = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const IS_INERT_SUPPORTED = () => {
  return typeof window !== 'undefined' && 'inert' in HTMLElement.prototype;
};

export const getAllFocusableElements = (container: Element | Document): Element[] => {
  const query =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], audio[controls], video[controls], details, summary, [tabindex]:not([tabindex="-1"])';

  return Array.from(container.querySelectorAll(query));
};
