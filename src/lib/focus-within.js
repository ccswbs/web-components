const focusWithin = (node) => {
  const focusOutside = function(e) {
    if (!node.contains(e.relatedTarget)) {
      node.dispatchEvent(new CustomEvent('focusoutside', { bubbles: false }));
    }
  };

  const focusInside = function(e) {
    if (!node.contains(e.relatedTarget)) {
      node.dispatchEvent(new CustomEvent('focusinside', { bubbles: false }));
    }
  };

  node.addEventListener('focusin', focusInside);
  node.addEventListener('focusout', focusOutside);

  return {
    destroy() {
      node.removeEventListener('focusin', focusInside);
      node.removeEventListener('focusout', focusOutside);
    }
  };
};

export default focusWithin;

