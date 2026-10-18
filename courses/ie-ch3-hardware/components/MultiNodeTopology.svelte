<script>
  import Figure from './Figure.svelte';
  const nodes = [
    { y: 10, label: 'Node 1: eight B200 GPUs' },
    { y: 300, label: 'Node 2: eight B200 GPUs' },
  ];
  const rows = [0, 1, 2, 3];
  const switches = [74, 144];
</script>

<Figure
  caption="Figure 3.6: NVLink and NVSwitch connect GPUs inside a node, and a network fabric such as InfiniBand or RoCE Ethernet connects nodes."
  description="Two nodes are stacked vertically. Each node holds eight B200 GPUs, four on the left and four on the right, with two NVSwitch chips in the middle. Every GPU has an NVLink line to each NVSwitch, so any GPU in a node can reach any other GPU in that node at NVLink speed, about 1,800 GB/s per GPU counting both directions. A single dashed box labeled network fabric, InfiniBand or RoCE Ethernet, sits between the two nodes and joins them at 400 to 800 Gb/s per NIC, which is 50 to 100 GB/s in each direction. Traffic between a GPU in node 1 and a GPU in node 2 crosses the network fabric, which is about an order of magnitude slower than NVLink."
>
  <svg viewBox="0 0 640 530" role="img" aria-labelledby="topology-title">
    <title id="topology-title">Two 8-GPU nodes joined by a network fabric, each using NVLink and NVSwitch internally</title>
    {#each nodes as n (n.y)}
      <rect x="10" y={n.y} width="620" height="220" class="ie-svg-box" />
      <text x="320" y={n.y + 24} text-anchor="middle" class="ie-svg-label">{n.label}</text>
      {#each rows as r (r)}
        {#each switches as s (s)}
          <line x1="140" y1={n.y + 55 + r * 44} x2="270" y2={n.y + s + 18} class="ie-svg-line" stroke-width="3" />
          <line x1="500" y1={n.y + 55 + r * 44} x2="370" y2={n.y + s + 18} class="ie-svg-line" stroke-width="3" />
        {/each}
        <rect x="30" y={n.y + 40 + r * 44} width="110" height="30" class="ie-svg-accent" />
        <text x="85" y={n.y + 60 + r * 44} text-anchor="middle" class="ie-svg-small">B200</text>
        <rect x="500" y={n.y + 40 + r * 44} width="110" height="30" class="ie-svg-accent" />
        <text x="555" y={n.y + 60 + r * 44} text-anchor="middle" class="ie-svg-small">B200</text>
      {/each}
      {#each switches as s (s)}
        <rect x="270" y={n.y + s} width="100" height="36" class="ie-svg-inner" />
        <text x="320" y={n.y + s + 23} text-anchor="middle" class="ie-svg-small">NVSwitch</text>
      {/each}
      <text x="320" y={n.y + 214} text-anchor="middle" class="ie-svg-small">NVLink: about 1,800 GB/s per GPU, both directions</text>
    {/each}
    <line x1="320" y1="230" x2="320" y2="300" class="ie-svg-thin" />
    <rect x="150" y="242" width="340" height="46" class="ie-svg-future" />
    <text x="320" y="261" text-anchor="middle" class="ie-svg-small">Network fabric: InfiniBand or RoCE Ethernet</text>
    <text x="320" y="279" text-anchor="middle" class="ie-svg-small">400 to 800 Gb/s per NIC (50 to 100 GB/s each way)</text>
  </svg>
</Figure>
