<script>
  import Figure from './Figure.svelte';
  const sms = [0, 1, 2, 3, 4, 5, 6, 7];
  const tcs = [0, 1, 2, 3];
</script>

<Figure
  caption="Figure 3.2: A GPU has multiple SMs, each of which has multiple Tensor Cores. L1 cache sits within SMs and L2 cache is shared."
  description="Eight tall boxes labeled SM stand side by side. Each SM box holds four small boxes labeled TC, for Tensor Core, and one box labeled L1 at its base. Below all eight SMs runs one wide bar labeled L2, which every SM shares. Below the L2 bar sits a larger bar labeled VRAM, the off-chip high-bandwidth memory that feeds the cache hierarchy."
>
  <svg viewBox="0 0 720 330" role="img" aria-labelledby="gpu-anatomy-title">
    <title id="gpu-anatomy-title">GPU anatomy: Streaming Multiprocessors, Tensor Cores, L1 and L2 caches, and VRAM</title>
    {#each sms as i (i)}
      <rect x={16 + i * 88} y="16" width="76" height="180" class="ie-svg-box" />
      <text x={54 + i * 88} y="38" text-anchor="middle" class="ie-svg-label">SM</text>
      {#each tcs as t (t)}
        <rect x={26 + i * 88} y={50 + t * 24} width="56" height="20" class="ie-svg-inner" />
        <text x={54 + i * 88} y={65 + t * 24} text-anchor="middle" class="ie-svg-small">TC</text>
      {/each}
      <rect x={26 + i * 88} y="160" width="56" height="24" class="ie-svg-accent" />
      <text x={54 + i * 88} y="177" text-anchor="middle" class="ie-svg-small">L1</text>
    {/each}
    <rect x="16" y="212" width="692" height="36" class="ie-svg-inner" stroke-dasharray="6 4" />
    <text x="362" y="235" text-anchor="middle" class="ie-svg-label">L2 cache (shared by all SMs)</text>
    <rect x="16" y="262" width="692" height="52" class="ie-svg-accent" />
    <text x="362" y="294" text-anchor="middle" class="ie-svg-label">VRAM (HBM, off-chip)</text>
  </svg>
</Figure>
