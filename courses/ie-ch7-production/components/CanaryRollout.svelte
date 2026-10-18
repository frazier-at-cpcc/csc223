<script>
  // Figure 7.13: a canary deployment shifts live traffic to the new deployment in stages.
  // Stage percentages are illustrative; the book does not prescribe specific values.
  const stages = [
    { label: 'Ready', pct: 0 },
    { label: 'Canary', pct: 5 },
    { label: 'Ramp', pct: 25 },
    { label: 'Ramp', pct: 50 },
    { label: 'Complete', pct: 100 },
  ];
  let current = $state(0);
  const pct = $derived(stages[current].pct);
</script>

<div class="ie-canary" role="group" aria-label="Canary rollout stages">
  <div class="ie-canary-controls">
    {#each stages as s, i}
      <button type="button" aria-pressed={current === i} onclick={() => (current = i)}>
        {s.label}: {s.pct} percent
      </button>
    {/each}
  </div>
  <div class="ie-canary-row">
    <span>Old deployment</span>
    <div class="ie-canary-track"><div class="ie-canary-fill" style="width: {100 - pct}%"></div></div>
    <span>{100 - pct}%</span>
  </div>
  <div class="ie-canary-row">
    <span>New deployment</span>
    <div class="ie-canary-track"><div class="ie-canary-fill ie-new" style="width: {pct}%"></div></div>
    <span>{pct}%</span>
  </div>
  <p aria-live="polite">
    {pct === 0
      ? 'The new deployment is built and ready but receives no live traffic yet.'
      : pct === 100
        ? 'The new deployment handles all traffic. The old deployment can be retired.'
        : `The new deployment receives ${pct} percent of live traffic while engineers monitor it. Any issue triggers a revert to the old deployment.`}
  </p>
</div>
