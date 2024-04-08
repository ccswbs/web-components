import './styles/global.css';

export function loadComponent(name) {
  import(`./components/uofg-${name}.svelte`)
    .then(() => {
      console.log(`Loaded UofG web component: ${name}`);
    })
    .catch(err => {
      console.error(`Failed to load UofG web component: ${name}, ${err.message}`);
    });
}

if (typeof window !== 'undefined') {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, node => {
    if (node.tagName.startsWith('UOFG-')) {
      return NodeFilter.FILTER_ACCEPT;
    }

    return NodeFilter.FILTER_SKIP;
  });

  const needed = new Set();

  while (walker.nextNode()) {
    const name = walker?.currentNode?.tagName?.toLowerCase()?.replace('uofg-', '');
    needed.add(name);
  }

  for (const name of needed) {
    loadComponent(name);
  }
}
