<script>
  // Columns: input (3 nodes), three hidden layers (4 nodes each), output (3 nodes).
  const columns = [
    { x: 90, ys: [125, 195, 265], hidden: false },
    { x: 220, ys: [90, 160, 230, 300], hidden: true },
    { x: 310, ys: [90, 160, 230, 300], hidden: true },
    { x: 400, ys: [90, 160, 230, 300], hidden: true },
    { x: 530, ys: [125, 195, 265], hidden: false },
  ];
  const edges = [];
  for (let c = 0; c < columns.length - 1; c++) {
    for (const y1 of columns[c].ys) {
      for (const y2 of columns[c + 1].ys) {
        edges.push({ x1: columns[c].x, y1, x2: columns[c + 1].x, y2 });
      }
    }
  }
</script>

<svg viewBox="0 0 620 330" role="img" aria-labelledby="nn-title">
  <title id="nn-title">A neural network with one input layer of three nodes, three hidden layers of four nodes each, and one output layer of three nodes. Every node connects to every node in the next layer.</title>
  {#each edges as e}
    <line class="ie-svg-line" x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
  {/each}
  {#each columns as col}
    {#each col.ys as y}
      <circle
        cx={col.x}
        cy={y}
        r="16"
        class={col.hidden ? 'ie-svg-box' : 'ie-svg-box--plain'}
      />
    {/each}
  {/each}
  <text class="ie-svg-label" x="90" y="60" text-anchor="middle">Input layer</text>
  <text class="ie-svg-label" x="310" y="30" text-anchor="middle">Hidden layers</text>
  <path class="ie-svg-line" d="M 210 58 L 210 48 L 410 48 L 410 58 M 310 48 L 310 38" />
  <text class="ie-svg-label" x="530" y="60" text-anchor="middle">Output layer</text>
</svg>
