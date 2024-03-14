import styles from '../styles/tailwind.css?inline';

let stylesheet = null;

if (typeof CSSStyleSheet === 'function') {
  stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(styles);
}

export default function attachTailwind(root) {
  if (stylesheet) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, stylesheet];
  } else {
    const style = document.createElement('style');
    style.innerHTML = styles;
    root.prepend(style);
  }
}
