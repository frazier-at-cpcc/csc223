<script>
  // Lets a wide table scroll inside its own region on narrow screens instead of widening the page.
  let { label, children } = $props();
</script>

<div class="scroll-table" role="region" aria-label={label}>
  {@render children()}
</div>

<style>
  .scroll-table {
    max-width: 100%;
    overflow-x: auto;
    margin: var(--tessera-spacing-md) 0;
  }
  .scroll-table:focus-visible {
    outline: 2px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .scroll-table :global(table) {
    margin: 0;
  }
</style>
