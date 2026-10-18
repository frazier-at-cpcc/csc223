<script>
  // Wraps a recreated book figure: visual (exposed as one image), caption, text description.
  let { number, caption, alt, description, children } = $props();
</script>

<figure class="ie-figure">
  <div class="ie-figure-visual" role="img" aria-label={alt}>
    {@render children()}
  </div>
  <details class="ie-figure-description">
    <summary>Text description of Figure {number}</summary>
    <p>{description}</p>
  </details>
  <figcaption>
    <span class="ie-figure-label">Figure {number}.</span>
    {caption}
  </figcaption>
</figure>

<style>
  .ie-figure {
    margin: var(--tessera-spacing-lg) 0;
    padding: var(--tessera-spacing-md);
    border: 1px dashed var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg-secondary);
  }
  .ie-figure-visual {
    overflow-x: auto;
  }
  figcaption {
    margin-top: var(--tessera-spacing-md);
    font-size: 0.95rem;
    color: var(--tessera-text);
  }
  .ie-figure-label {
    font-weight: 700;
  }
  .ie-figure-description {
    margin-top: var(--tessera-spacing-sm);
    font-size: 0.95rem;
  }
  .ie-figure-description summary {
    cursor: pointer;
    color: var(--tessera-primary-dark);
  }
</style>
