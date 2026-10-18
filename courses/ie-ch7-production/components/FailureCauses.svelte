<script>
  // Figure 7.12: root causes of the 419 unexpected interruptions during 54 days of Llama 3 405B
  // pre-training. Counts are the rows of Table 5 in Grattafiori et al. (2024), summed by the
  // category label the paper gives each row. The rows sum to 419.
  const causes = [
    { name: 'GPU', count: 268 },
    { name: 'Dependency', count: 56 },
    { name: 'Network', count: 35 },
    { name: 'Unplanned maintenance', count: 32 },
    { name: 'Host', count: 21 },
    { name: 'Unknown', count: 7 },
  ];
  const max = 268;
  const scale = 300 / max;
</script>

<svg viewBox="0 0 560 300" role="img" aria-label="Horizontal bar chart of the 419 unexpected interruptions during Llama 3 training, by category. GPU 268, dependency 56, network 35, unplanned maintenance 32, host 21, unknown 7. The GPU bar is about five times longer than the next bar.">
  {#each causes as c, i}
    {@const y = 16 + i * 42}
    <text class="ie-svg-text" x="170" y={y + 19} text-anchor="end" font-size="13">{c.name}</text>
    <rect x="180" {y} width={Math.max(2, c.count * scale)} height="26" rx="3" fill={i === 0 ? 'var(--ie-accent)' : 'var(--ie-accent-soft)'} stroke="var(--ie-accent)" stroke-width="1.5" />
    <text class="ie-svg-text" x={186 + c.count * scale} y={y + 19} font-size="13" font-weight="600">{c.count}</text>
  {/each}
  <text class="ie-svg-text" x="180" y="290" font-size="11" fill="var(--ie-muted)">Interruption count, out of 419 unexpected interruptions in 54 days.</text>
</svg>
