<script>
  import Figure from './Figure.svelte';
  import TokenChip from './TokenChip.svelte';

  let { number, caption, description, rows } = $props();
</script>

<Figure {number} {caption} {description}>
  {#each rows as row, r (r)}
    <p style="margin: 0.75rem 0 0.25rem;"><strong>Prompt {r + 1}</strong></p>
    <div class="ie-row">
      {#each row as [t, st], i (i)}
        <TokenChip text={t} status={st} />
      {/each}
    </div>
  {/each}
  <ul class="ie-legend" aria-label="Legend">
    <li>✓ Match: read from cache</li>
    <li>✗ Miss: first non-repeated token</li>
    <li>– Discarded: computed in prefill</li>
  </ul>
</Figure>
