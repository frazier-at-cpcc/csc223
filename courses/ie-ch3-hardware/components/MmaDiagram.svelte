<script>
  import Figure from './Figure.svelte';
  const cells = [0, 1, 2];
  const grids = [
    { x: 20, label: 'A' },
    { x: 180, label: 'B' },
    { x: 340, label: 'C' },
    { x: 500, label: 'D' },
  ];
  const ops = [
    { x: 154, sym: '×' },
    { x: 314, sym: '+' },
    { x: 474, sym: '=' },
  ];
</script>

<Figure
  caption="Figure 3.1: Matrix Multiply and Accumulate (MMA) multiplies matrix A by matrix B, adds matrix C, and stores the result as matrix D."
  description="Four three-by-three matrices sit in a row, labeled A, B, C, and D. A multiplication sign separates A and B, a plus sign separates B and C, and an equals sign separates C and D. The equation reads D equals A times B plus C. A bracket under A and B reads multiply, and a bracket under C reads accumulate. Matrix D is the output."
>
  <svg viewBox="0 0 640 200" role="img" aria-labelledby="mma-title">
    <title id="mma-title">D equals A times B plus C</title>
    {#each grids as g (g.label)}
      <text x={g.x + 54} y="24" text-anchor="middle" class="ie-svg-label">{g.label}</text>
      {#each cells as r (r)}
        {#each cells as c (c)}
          <rect
            x={g.x + c * 36}
            y={36 + r * 36}
            width="36"
            height="36"
            class={g.label === 'D' ? 'ie-svg-accent' : 'ie-svg-box'}
          />
        {/each}
      {/each}
    {/each}
    {#each ops as o (o.sym)}
      <text x={o.x} y="100" text-anchor="middle" class="ie-svg-op">{o.sym}</text>
    {/each}
    <path d="M20 160 v8 h268 v-8" class="ie-svg-line" />
    <text x="154" y="188" text-anchor="middle" class="ie-svg-small">multiply</text>
    <path d="M340 160 v8 h108 v-8" class="ie-svg-line" />
    <text x="394" y="188" text-anchor="middle" class="ie-svg-small">accumulate</text>
    <text x="554" y="188" text-anchor="middle" class="ie-svg-small">output</text>
  </svg>
</Figure>
