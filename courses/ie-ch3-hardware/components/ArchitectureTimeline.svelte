<script>
  import Figure from './Figure.svelte';
  const years = [2017, 2018, 2020, 2022, 2024, 2026, 2028];
  const x = (i) => 50 + i * 103;
  const archs = [
    { name: 'Volta', i: 0, y: 80 },
    { name: 'Turing', i: 1, y: 80 },
    { name: 'Ampere', i: 2, y: 80 },
    { name: 'Hopper', i: 3, y: 44 },
    { name: 'Ada Lovelace', i: 3, y: 80 },
    { name: 'Blackwell', i: 4, y: 80 },
    { name: 'Rubin', i: 5, y: 80, future: true },
    { name: 'Feynman', i: 6, y: 80, future: true },
  ];
</script>

<Figure
  caption="NVIDIA GPU architecture names from 2017 through all announced future architectures."
  description="A horizontal timeline runs from 2017 to 2028. Volta appears at 2017, Turing at 2018, and Ampere at 2020. Hopper and Ada Lovelace both appear at 2022, with Hopper stacked above Ada Lovelace. Blackwell appears at 2024. Rubin at 2026 and Feynman at 2028 have dashed outlines because they are announced but not yet released."
>
  <svg viewBox="0 0 720 190" role="img" aria-labelledby="arch-timeline-title">
    <title id="arch-timeline-title">NVIDIA GPU architecture timeline, 2017 to 2028</title>
    <line x1="10" y1="130" x2="710" y2="130" class="ie-svg-line" />
    {#each years as yr, i (yr)}
      <line x1={x(i)} y1="124" x2={x(i)} y2="136" class="ie-svg-line" />
      <text x={x(i)} y="156" text-anchor="middle" class="ie-svg-small">{yr}</text>
    {/each}
    {#each archs as a (a.name)}
      <rect
        x={x(a.i) - 47}
        y={a.y}
        width="94"
        height="28"
        class={a.future ? 'ie-svg-future' : 'ie-svg-box'}
      />
      <text x={x(a.i)} y={a.y + 19} text-anchor="middle" class="ie-svg-small">{a.name}</text>
    {/each}
    <rect x="200" y="168" width="22" height="14" class="ie-svg-future" />
    <text x="230" y="180" class="ie-svg-small">Dashed outline: announced, not yet released</text>
  </svg>
</Figure>
