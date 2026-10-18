<script>
  import BookFigure from './BookFigure.svelte';

  // Log-normal response-time distribution (mu = 0, sigma = 0.6), in seconds: median 1.0 s.
  const sigma = 0.6;
  const W = 600, H = 300, left = 40, right = 20, top = 30, bottom = 40;
  const xMax = 4.5;
  const pdf = (x) => Math.exp(-(Math.log(x) ** 2) / (2 * sigma * sigma)) / (x * sigma * Math.sqrt(2 * Math.PI));
  const yMax = pdf(Math.exp(-sigma * sigma)) * 1.1;
  const sx = (x) => left + (x / xMax) * (W - left - right);
  const sy = (y) => H - bottom - (y / yMax) * (H - top - bottom);

  const pts = [];
  for (let i = 1; i <= 200; i++) {
    const x = (i / 200) * xMax;
    pts.push(`${sx(x).toFixed(1)},${sy(pdf(x)).toFixed(1)}`);
  }
  const curve = `M${sx(0)},${sy(0)} L${pts.join(' L')}`;
  const area = `${curve} L${sx(xMax)},${sy(0)} Z`;

  const markers = [
    { label: 'Median (P50)', x: 1, labelY: top + 20, anchor: 'end', dx: -6 },
    { label: 'Mean', x: Math.exp((sigma * sigma) / 2), labelY: top + 45, anchor: 'start', dx: 6 },
    { label: 'P90', x: Math.exp(sigma * 1.2816), labelY: top + 120, anchor: 'start', dx: 6, dash: '2 4' },
    { label: 'P99', x: Math.exp(sigma * 2.3263), labelY: top + 170, anchor: 'end', dx: -6, dash: '10 3 2 3' },
  ];
  const ticks = [0, 1, 2, 3, 4];
</script>

<BookFigure
  number="1.5"
  caption="Mean latency is generally higher than P50 latency due to outliers in the right-skewed distribution of inference times."
  alt="A right-skewed curve of LLM response times in seconds, with a tall peak below 1 second and a long tail to the right. The median line sits at 1.0 second, the mean line at about 1.2 seconds, the P90 line at about 2.2 seconds, and the P99 line at about 4.0 seconds."
  description="The chart plots frequency on the vertical axis against response time in seconds on the horizontal axis, from 0 to 4.5 seconds. The curve rises steeply to a peak at about 0.7 seconds, then falls off slowly into a long tail on the right, which makes the distribution right-skewed. A dashed vertical line marks the median, or P50, at 1.0 second. A second dashed line marks the mean at about 1.2 seconds, to the right of the median, because the slow outliers in the tail pull the average upward. A dotted line marks P90 at about 2.2 seconds, and one request in ten falls to the right of it. A dash-dot line marks P99 at about 4.0 seconds, and one request in a hundred falls to the right of it."
>
  <svg viewBox="0 0 {W} {H}" width="100%" class="dist" aria-hidden="true" focusable="false">
    <text x={W / 2} y={top - 10} text-anchor="middle" class="title">LLM response time distribution</text>
    <path d={area} class="area" />
    <path d={curve} class="curve" />
    <line x1={sx(0)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} class="axis" />
    <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={top} class="axis" />
    {#each ticks as t}
      <line x1={sx(t)} y1={sy(0)} x2={sx(t)} y2={sy(0) + 5} class="axis" />
      <text x={sx(t)} y={sy(0) + 18} text-anchor="middle" class="tick">{t}</text>
    {/each}
    <text x={W / 2} y={H - 4} text-anchor="middle" class="axis-label">Response time (seconds)</text>
    <text x={14} y={(H - bottom + top) / 2} text-anchor="middle" class="axis-label" transform="rotate(-90 14 {(H - bottom + top) / 2})">Frequency</text>
    {#each markers as m, i}
      <line x1={sx(m.x)} y1={sy(0)} x2={sx(m.x)} y2={m.labelY - 4} class="marker" stroke-dasharray={m.dash ?? '6 4'} />
      <text x={sx(m.x) + m.dx} y={m.labelY} text-anchor={m.anchor} class="marker-label">{m.label}</text>
    {/each}
  </svg>
</BookFigure>

<style>
  .dist {
    max-width: 640px;
    display: block;
    margin: 0 auto;
  }
  .area {
    fill: var(--tessera-primary-light);
  }
  .curve {
    fill: none;
    stroke: var(--tessera-primary-dark);
    stroke-width: 2.5;
  }
  .axis {
    stroke: var(--tessera-text);
    stroke-width: 1.5;
  }
  .marker {
    stroke: var(--tessera-text);
    stroke-width: 1.5;
  }
  .title,
  .tick,
  .axis-label,
  .marker-label {
    fill: var(--tessera-text);
    font-size: 14px;
  }
  .title {
    font-weight: 700;
  }
</style>
