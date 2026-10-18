<script>
  import TokenChip from './TokenChip.svelte';

  let first = $state('You are a support agent for Acme. Answer briefly. Where is my order?');
  let second = $state('You are a support agent for Acme. Answer briefly. How do I reset my password?');

  const split = (s) => s.trim().split(/\s+/).filter(Boolean);
  let a = $derived(split(first));
  let b = $derived(split(second));
  let shared = $derived.by(() => {
    let n = 0;
    while (n < a.length && n < b.length && a[n] === b[n]) n++;
    return n;
  });

  function status(i) {
    if (i < shared) return 'match';
    if (i === shared) return 'miss';
    return 'discarded';
  }
</script>

<section class="ie-figure" aria-labelledby="prefix-explorer-title">
  <h3 id="prefix-explorer-title" style="margin-top: 0;">Prefix match explorer</h3>
  <p>
    Edit the two prompts. Each word stands in for one token. The explorer marks the cached prefix of the
    second prompt, which ends at the first word that differs from the first prompt.
  </p>
  <label for="prefix-first"><strong>First request</strong></label>
  <textarea id="prefix-first" rows="2" style="width: 100%;" bind:value={first}></textarea>
  <label for="prefix-second"><strong>Second request</strong></label>
  <textarea id="prefix-second" rows="2" style="width: 100%;" bind:value={second}></textarea>
  <p aria-live="polite">
    The second request reads <strong>{shared}</strong> of its {b.length} tokens from the cache and runs prefill on
    {b.length - shared}.
  </p>
  <div class="ie-row" aria-hidden="true">
    {#each b as t, i (i)}
      <TokenChip text={t} status={status(i)} />
    {/each}
  </div>
</section>
