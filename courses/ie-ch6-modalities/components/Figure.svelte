<script>
  // Shared figure shell: the diagram, a numbered caption, and a text description.
  let { number, caption, description, children } = $props();
</script>

<figure class="ie-figure">
  <div class="ie-figure-art">{@render children()}</div>
  <details class="ie-figure-desc">
    <summary>Text description of Figure {number}</summary>
    <p>{description}</p>
  </details>
  <figcaption><span class="ie-figure-label">Figure {number}.</span> {caption}</figcaption>
</figure>

<style>
  .ie-figure {
    margin: 1.5rem 0;
    padding: 1rem;
    border: 1px solid var(--tessera-border, #e5e7eb);
    border-radius: 0.5rem;
    background: #ffffff;
  }
  .ie-figure-art :global(svg) {
    display: block;
    width: 100%;
    height: auto;
  }
  .ie-figure-art :global(svg text) {
    font-family: var(--tessera-font-family, system-ui, sans-serif);
    fill: #1f2937;
  }
  figcaption {
    margin-top: 0.75rem;
    font-size: 0.95rem;
    color: #1f2937;
  }
  .ie-figure-label {
    font-weight: 700;
  }
  .ie-figure-desc {
    margin-top: 0.75rem;
    font-size: 0.95rem;
  }
  .ie-figure-desc summary {
    cursor: pointer;
    color: #0b5cad;
  }
</style>
