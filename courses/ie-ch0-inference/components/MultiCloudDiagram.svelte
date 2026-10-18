<script>
  import Figure from './Figure.svelte';

  // Workload plane boxes: [x, y]. Width 180, height 36. Positions follow the book figure.
  const planes = [
    [50, 72], [50, 192], [50, 312], // Cloud A, left column
    [290, 312], // Cloud A, lower middle
    [290, 72], // Cloud B
    [530, 72], [530, 192], [530, 312], // Cloud C
  ];
  const cx = 380;
  const cy = 210;
</script>

<Figure number="0.3" caption="Serving model inference at scale requires unifying capacity across multiple cloud service providers.">
  <svg viewBox="0 0 760 400" role="img" aria-labelledby="mc-title mc-desc" class="mc">
    <title id="mc-title">Global control plane connected to workload planes in three clouds</title>
    <desc id="mc-desc">
      A global control plane in the center links to eight workload planes. Cloud A holds four, Cloud B holds one, and Cloud
      C holds three.
    </desc>
    <path class="cloud" d="M30 50 H250 V290 H490 V380 H30 Z" />
    <rect class="cloud" x="270" y="50" width="220" height="90" />
    <rect class="cloud" x="510" y="50" width="220" height="330" />
    <text class="cloud-label" x="140" y="36">CLOUD A</text>
    <text class="cloud-label" x="380" y="36">CLOUD B</text>
    <text class="cloud-label" x="620" y="36">CLOUD C</text>
    {#each planes as [x, y] (`${x}-${y}`)}
      <line class="link" x1={cx} y1={cy} x2={x + 90} y2={y + 18} />
    {/each}
    {#each planes as [x, y] (`${x}-${y}`)}
      <rect class="plane" {x} {y} width="180" height="36" />
      <text class="plane-label" x={x + 90} y={y + 23}>WORKLOAD PLANE</text>
    {/each}
    <rect class="control" x="280" y="190" width="200" height="40" />
    <text class="control-label" x={cx} y="215">GLOBAL CONTROL PLANE</text>
  </svg>
  {#snippet description()}
    <p>
      The figure shows three cloud providers, labeled Cloud A, Cloud B, and Cloud C. Each provider contributes a different
      amount of capacity. Cloud A runs four workload planes, Cloud B runs one, and Cloud C runs three.
    </p>
    <p>
      A single global control plane sits in the center. A line connects it to every one of the eight workload planes. The
      control plane deploys models and allocates resources across all three clouds, so the workload planes act as one pool
      of compute instead of three separate silos.
    </p>
  {/snippet}
</Figure>

<style>
  .mc {
    display: block;
    width: 100%;
    height: auto;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .cloud {
    fill: #e3f4ea;
    stroke: #1f7a4d;
    stroke-width: 1.5;
  }
  .cloud-label {
    font-size: 15px;
    font-weight: 700;
    fill: #14532d;
    text-anchor: middle;
  }
  .link {
    stroke: #1f7a4d;
    stroke-width: 2;
  }
  .plane {
    fill: #ffffff;
    stroke: #1f7a4d;
    stroke-width: 2;
  }
  .plane-label {
    font-size: 13px;
    fill: #14532d;
    text-anchor: middle;
  }
  .control {
    fill: #ffffff;
    stroke: #14532d;
    stroke-width: 2;
    stroke-dasharray: 5 3;
  }
  .control-label {
    font-size: 14px;
    font-weight: 700;
    fill: #14532d;
    text-anchor: middle;
  }
</style>
