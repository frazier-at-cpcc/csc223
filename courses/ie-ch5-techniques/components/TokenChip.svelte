<script>
  const glyphs = {
    prompt: '',
    unverified: '?',
    accepted: '✓',
    rejected: '✗',
    discarded: '–',
    recomputed: '↻',
    generated: '+',
    match: '✓',
    miss: '✗',
  };
  let { text, status = 'prompt' } = $props();
</script>

<span class="ie-token is-{status}">
  {#if glyphs[status]}<span aria-hidden="true">{glyphs[status]}</span>{/if}
  {text}
  {#if status !== 'prompt'}<span class="ie-sr-only">({status})</span>{/if}
</span>
