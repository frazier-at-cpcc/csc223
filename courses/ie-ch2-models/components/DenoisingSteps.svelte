<script>
  // Deterministic noise so the figure renders identically every time.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const grid = 14;
  const cell = 120 / grid;
  const stages = [
    { label: 'Pure noise', noise: 1, shape: 0 },
    { label: 'Early step', noise: 0.65, shape: 0.35 },
    { label: 'Middle step', noise: 0.3, shape: 0.7 },
    { label: 'Final step', noise: 0, shape: 1 },
  ];
  const cells = [];
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) cells.push({ x: i * cell, y: j * cell, v: rand() });
  }
</script>

<svg viewBox="0 0 600 190" role="img" aria-labelledby="dn-title">
  <title id="dn-title">Four panels from left to right. The first panel is random noise. In the second and third panels the outline of a computer monitor emerges as the noise fades. The fourth panel shows a clean image of a computer monitor.</title>
  {#each stages as s, k}
    <g transform="translate({20 + k * 145} 20)">
      <rect width="120" height="120" fill="var(--tessera-bg)" stroke="var(--tessera-primary-dark)" stroke-width="1.5" />
      <g opacity={s.noise}>
        {#each cells as c}
          <rect x={c.x} y={c.y} width={cell} height={cell} fill="var(--tessera-primary-dark)" opacity={c.v * 0.8} />
        {/each}
      </g>
      <g opacity={s.shape}>
        <rect x="25" y="22" width="70" height="52" rx="4" fill="var(--tessera-primary-light)" stroke="var(--tessera-text)" stroke-width="3" />
        <rect x="33" y="30" width="54" height="36" fill="var(--tessera-primary-dark)" />
        <path d="M 52 74 L 48 92 L 72 92 L 68 74" fill="var(--tessera-primary-light)" stroke="var(--tessera-text)" stroke-width="3" />
        <rect x="35" y="92" width="50" height="8" rx="2" fill="var(--tessera-text)" />
      </g>
      <text class="ie-svg-text" x="60" y="145" text-anchor="middle">{s.label}</text>
    </g>
    {#if k < 3}
      <text class="ie-svg-label" x={150 + k * 145} y="85" text-anchor="middle" aria-hidden="true">→</text>
    {/if}
  {/each}
  <text class="ie-svg-text" x="300" y="182" text-anchor="middle">Each step updates the entire latent at once (typically 30 to 50 steps in total)</text>
</svg>
