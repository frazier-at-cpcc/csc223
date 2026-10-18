<script>
  // Figure 7.11: a global control plane coordinates workload planes in three clouds.
  const clouds = [
    { name: 'Cloud A', x: 20, planes: [70, 150, 230] },
    { name: 'Cloud B', x: 200, planes: [70, 230] },
    { name: 'Cloud C', x: 380, planes: [70, 150, 230] },
  ];
  const cx = 280, cy = 165;
</script>

<svg viewBox="0 0 560 290" role="img" aria-label="Three cloud regions labeled Cloud A, Cloud B, and Cloud C. Cloud A and Cloud C each hold three workload planes, and Cloud B holds two. Lines connect every workload plane to one global control plane in the center.">
  {#each clouds as c}
    <rect x={c.x} y="20" width="160" height="260" rx="6" fill="var(--ie-panel)" stroke="var(--ie-line)" stroke-width="1.5" />
    <text class="ie-svg-text" x={c.x + 80} y="42" text-anchor="middle" font-size="14" font-weight="600">{c.name}</text>
    {#each c.planes as py}
      <line x1={c.x + 80} y1={py + 15} x2={cx} y2={cy} stroke="var(--ie-line)" stroke-width="1.5" />
    {/each}
  {/each}
  {#each clouds as c}
    {#each c.planes as py}
      <rect x={c.x + 15} y={py} width="130" height="30" rx="3" fill="#ffffff" stroke="var(--ie-accent)" stroke-width="2" />
      <text class="ie-svg-text" x={c.x + 80} y={py + 20} text-anchor="middle" font-size="12">Workload plane</text>
    {/each}
  {/each}
  <rect x={cx - 75} y={cy - 18} width="150" height="36" rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" stroke-dasharray="5 3" />
  <text class="ie-svg-text" x={cx} y={cy + 5} text-anchor="middle" font-size="13" font-weight="600">Global control plane</text>
</svg>
