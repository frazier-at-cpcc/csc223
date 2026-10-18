<script>
  // Shared wrapper: figure + expandable text description (WCAG 1.1.1) + caption as last child.
  let { caption, description, children } = $props();
</script>

<figure class="ie-figure">
  {@render children()}
  <details class="ie-figure-desc">
    <summary>Text description of the figure</summary>
    <p>{description}</p>
  </details>
  <figcaption>{caption}</figcaption>
</figure>
