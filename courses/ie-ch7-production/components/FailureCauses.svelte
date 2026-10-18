<script>
  // Figure 7.12: root causes of unexpected interruptions during Llama 3 training.
  // Bar lengths approximate the slice sizes in the book's pie chart; the book prints no values.
  const causes = [
    { name: 'GPU', share: 60 },
    { name: 'Dependency', share: 12 },
    { name: 'Host', share: 10 },
    { name: 'Network', share: 10 },
    { name: 'Maintenance', share: 8 },
  ];
</script>

<svg viewBox="0 0 540 230" role="img" aria-label="Horizontal bar chart of failure causes during Llama 3 training. The GPU bar is far longer than the rest and covers more than half of all interruptions. Dependency, host, network, and maintenance bars are each short and similar in length.">
  {#each causes as c, i}
    {@const y = 20 + i * 40}
    <text class="ie-svg-text" x="110" y={y + 19} text-anchor="end" font-size="14">{c.name}</text>
    <rect x="120" {y} width={c.share * 6.5} height="26" rx="3" fill={i === 0 ? 'var(--ie-accent)' : 'var(--ie-accent-soft)'} stroke="var(--ie-accent)" stroke-width="1.5" />
  {/each}
  <text class="ie-svg-text" x="120" y="222" font-size="11" fill="var(--ie-muted)">Bar length shows approximate share of interruptions.</text>
</svg>
