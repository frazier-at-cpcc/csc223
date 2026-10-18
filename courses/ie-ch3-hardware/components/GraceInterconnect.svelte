<script>
  import Figure from './Figure.svelte';
  const wide = Array.from({ length: 10 }, (_, i) => 196 + i * 9);
</script>

<Figure
  caption="Figure 3.3: Grace CPUs have a higher-bandwidth interconnect to the GPU than standard CPUs do."
  description="Two CPU-to-GPU pairs are stacked. In the top pair, a standard CPU connects to a GPU through two thin lines that represent a PCIe or similar standard link. In the bottom pair, a Grace CPU connects to a GPU through ten lines that represent NVLink Chip to Chip, which provides up to 900 GB/s of bidirectional bandwidth between CPU and GPU memory. The larger number of lines shows the several-times-higher bandwidth of the Grace connection."
>
  <svg viewBox="0 0 640 310" role="img" aria-labelledby="grace-title">
    <title id="grace-title">Standard CPU to GPU link compared with Grace CPU to GPU link</title>
    <rect x="20" y="20" width="180" height="110" class="ie-svg-box" />
    <text x="110" y="80" text-anchor="middle" class="ie-svg-label">Standard CPU</text>
    <rect x="440" y="20" width="180" height="110" class="ie-svg-accent" />
    <text x="530" y="80" text-anchor="middle" class="ie-svg-label">GPU</text>
    <line x1="200" y1="68" x2="440" y2="68" class="ie-svg-line" />
    <line x1="200" y1="82" x2="440" y2="82" class="ie-svg-line" />
    <text x="320" y="56" text-anchor="middle" class="ie-svg-small">PCIe or similar standard link</text>

    <rect x="20" y="170" width="180" height="120" class="ie-svg-box" />
    <text x="110" y="235" text-anchor="middle" class="ie-svg-label">Grace CPU</text>
    <rect x="440" y="170" width="180" height="120" class="ie-svg-accent" />
    <text x="530" y="235" text-anchor="middle" class="ie-svg-label">GPU</text>
    {#each wide as y (y)}
      <line x1="200" y1={y} x2="440" y2={y} class="ie-svg-line" />
    {/each}
    <text x="320" y="184" text-anchor="middle" class="ie-svg-small">NVLink Chip to Chip: up to 900 GB/s</text>
  </svg>
</Figure>
