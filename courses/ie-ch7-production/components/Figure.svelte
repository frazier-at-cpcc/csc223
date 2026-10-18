<script>
  // Shared figure frame: the diagram, a text description, and a numbered caption.
  // The figcaption stays the last child of <figure> (Svelte a11y_figcaption_index).
  let { number, caption, description, children } = $props();
</script>

<figure class="ie-figure">
  <div class="ie-figure-body">{@render children()}</div>
  <details class="ie-figure-description">
    <summary>Text description of Figure {number}</summary>
    <p>{description}</p>
  </details>
  <figcaption><strong>Figure {number}:</strong> {caption}</figcaption>
</figure>
