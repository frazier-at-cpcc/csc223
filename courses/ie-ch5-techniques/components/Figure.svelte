<script>
  let { number, caption, description = '', children } = $props();
</script>

<figure class="ie-figure">
  {@render children()}
  {#if description}
    <details>
      <summary>Text description of Figure {number}</summary>
      <p>{description}</p>
    </details>
  {/if}
  <figcaption><strong>Figure {number}:</strong> {caption}</figcaption>
</figure>
