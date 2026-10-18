<script>
  let { number, caption, description, children } = $props();
</script>

<figure class="ie-figure">
  {@render children()}
  <details>
    <summary>Text description of Figure {number}</summary>
    {@render description()}
  </details>
  <figcaption>
    <span class="ie-figure-label">Figure {number}:</span>
    {caption}
  </figcaption>
</figure>

<style>
  .ie-figure {
    margin: var(--tessera-spacing-lg) 0;
    padding: var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg);
  }
  figcaption {
    margin-top: var(--tessera-spacing-md);
    font-size: 0.95rem;
  }
  .ie-figure-label {
    font-weight: 700;
  }
  details {
    margin-top: var(--tessera-spacing-sm);
    font-size: 0.95rem;
  }
  summary {
    cursor: pointer;
    color: var(--tessera-primary-dark);
  }
</style>
