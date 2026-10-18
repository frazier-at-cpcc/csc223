<script>
  let { number, caption, description = '', children } = $props();
</script>

<figure class="ie-figure">
  <div class="ie-figure__body">
    {@render children()}
  </div>
  {#if description}
    <details class="ie-figure__desc">
      <summary>Text description of Figure {number}</summary>
      <p>{description}</p>
    </details>
  {/if}
  <figcaption><strong>Figure {number}.</strong> {caption}</figcaption>
</figure>
