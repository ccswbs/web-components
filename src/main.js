import './styles/global.css';

let observer = null;

export function loadComponent(name) {
  import(`./components/${name}.svelte`)
    .then(() => {
      console.log(`Loaded UofG web component: ${name}`);
    })
    .catch(err => {
      console.error(`Failed to load UofG web component: ${name}, ${err.message}`);
    });
}

export function watchDOM(root) {
  if (typeof document !== 'undefined' && typeof MutationObserver === 'function') {
    observer?.observe(root ?? document.body, { subtree: true, childList: true });
  }
}

export function stopWatchingDOM() {
  observer?.disconnect();
}

export function scan(root) {
  const toLoad = new Set();

  if (typeof window !== 'undefined') {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, node => {
      if (node.tagName.startsWith('UOFG-')) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_SKIP;
    });

    while (walker.nextNode()) {
      const name = walker?.currentNode?.tagName?.toLowerCase();
      toLoad.add(name);
    }
  }

  return toLoad;
}

if (typeof window !== 'undefined') {
  for (const name of scan(document.body)) {
    loadComponent(name);
  }

  if (typeof MutationObserver === 'function') {
    observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const added of mutation.addedNodes) {
          if (added.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          if (added.tagName.startsWith('UOFG-')) {
            const name = added.tagName.toLowerCase();
            loadComponent(name);
          }

          const toLoad = scan(added);
          for (const name of toLoad) {
            loadComponent(name);
          }
        }
      }
    });
  }

  watchDOM();
}
