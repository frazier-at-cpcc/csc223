// Svelte action for a horizontally scrolling wrapper: keyboard-focusable only while its content
// overflows, so keyboard users can scroll it (WCAG 2.1.1) without adding needless tab stops.
export function scrollable(node) {
  const update = () => {
    if (node.scrollWidth > node.clientWidth + 1) node.setAttribute('tabindex', '0');
    else node.removeAttribute('tabindex');
  };
  const ro = new ResizeObserver(update);
  ro.observe(node);
  update();
  return { destroy: () => ro.disconnect() };
}
