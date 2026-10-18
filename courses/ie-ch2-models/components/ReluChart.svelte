<script>
  // Plot area: x from -10 to 10 maps to 70..510; y from 0 to 10 maps to 290..30.
  const px = (x) => 290 + x * 22;
  const py = (y) => 290 - y * 26;
  const xTicks = [-10, -7.5, -5, -2.5, 0, 2.5, 5, 7.5, 10];
  const yTicks = [0, 2, 4, 6, 8, 10];
</script>

<svg viewBox="0 0 540 350" role="img" aria-labelledby="relu-title">
  <title id="relu-title">Line chart of ReLU. For inputs from negative 10 to 0 the output stays at 0. For inputs from 0 to 10 the output rises in a straight line equal to the input, reaching 10.</title>
  <line class="ie-svg-line" x1={px(-10)} y1={py(0)} x2={px(10)} y2={py(0)} />
  <line class="ie-svg-line" x1={px(-10)} y1={py(0)} x2={px(-10)} y2={py(10)} />
  <line class="ie-svg-line" x1={px(0)} y1={py(0)} x2={px(0)} y2={py(10)} stroke-dasharray="4 4" />
  {#each xTicks as t}
    <text class="ie-svg-text" x={px(t)} y={py(0) + 20} text-anchor="middle">{t}</text>
  {/each}
  {#each yTicks as t}
    <text class="ie-svg-text" x={px(-10) - 10} y={py(t) + 4} text-anchor="end">{t}</text>
  {/each}
  <polyline
    points="{px(-10)},{py(0)} {px(0)},{py(0)} {px(10)},{py(10)}"
    fill="none"
    stroke="var(--tessera-primary-dark)"
    stroke-width="3"
  />
  <text class="ie-svg-label" x={px(0)} y="340" text-anchor="middle">Input (x)</text>
  <text class="ie-svg-label" transform="translate(16 160) rotate(-90)" text-anchor="middle">Output ReLU(x)</text>
  <rect class="ie-svg-box--plain" x={px(-8.5)} y={py(2.6)} width="150" height="26" rx="4" />
  <text class="ie-svg-text" x={px(-8.5) + 75} y={py(2.6) + 17} text-anchor="middle">ReLU(x) = max(0, x)</text>
</svg>
