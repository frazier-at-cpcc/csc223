<script>
  // Figures 7.3 and 7.4: traffic over a day against provisioned GPU count.
  // The traffic curve is schematic, shaped like the book's figure; it is not measured data.
  let { autoscaled = false } = $props();

  const traffic = [12, 14, 13, 16, 15, 18, 17, 22, 30, 42, 55, 66, 72, 70, 74, 73, 68, 60, 48, 36, 26, 20, 17, 15, 14, 14];
  const W = 520, H = 220, left = 50, top = 20, plotH = 160, step = (W - left - 20) / (traffic.length - 1);
  const x = (i) => left + i * step;
  const y = (v) => top + plotH - (v / 80) * plotH;

  const trafficPath = traffic.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const areaPath = `${trafficPath} L${x(traffic.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  // Fixed capacity sits between the lull and the peak. Autoscaled capacity steps close to demand.
  const fixed = 45;
  const caps = traffic.map((v) => Math.ceil((v + 4) / 6) * 6);
  const gpuPath = $derived(
    autoscaled
    ? `M${x(0)},${y(caps[0])} ` + caps.slice(1).map((c, i) => `H${x(i + 1).toFixed(1)} V${y(c).toFixed(1)}`).join(' ')
    : `M${x(0)},${y(fixed)} H${x(traffic.length - 1)}`,
  );

  const label = $derived(
    autoscaled
    ? 'Line chart with autoscaling. Provisioned GPU count steps up and down close to the traffic curve through the lull, the peak, and the decline.'
    : 'Line chart without autoscaling. A flat GPU count sits above traffic during the early and late lulls, labeled wasted spend, and below traffic during the midday peak, labeled missed latency targets.',
  );
</script>

<svg viewBox="0 0 {W} {H + 40}" role="img" aria-label={label}>
  <text class="ie-svg-text" x={left} y="14" font-size="14" font-weight="600">{autoscaled ? 'With autoscaling' : 'Without autoscaling'}</text>
  <line x1={left} y1={top} x2={left} y2={top + plotH} stroke="var(--ie-line)" />
  <line x1={left} y1={top + plotH} x2={W - 20} y2={top + plotH} stroke="var(--ie-line)" />
  <path d={areaPath} fill="var(--ie-accent-soft)" />
  <path d={trafficPath} fill="none" stroke="var(--ie-accent)" stroke-width="2.5" />
  <path d={gpuPath} fill="none" stroke="var(--ie-ink)" stroke-width="2" stroke-dasharray="6 4" />
  {#if !autoscaled}
    <text class="ie-svg-text" x={x(3)} y={y(fixed) + 22} font-size="12">Wasted spend</text>
    <text class="ie-svg-text" x={x(13)} y={y(fixed) - 10} text-anchor="middle" font-size="12" font-weight="600">Missed targets</text>
    <text class="ie-svg-text" x={x(20)} y={y(fixed) + 22} font-size="12">Wasted spend</text>
  {/if}
  <text class="ie-svg-text" x={(left + W) / 2} y={top + plotH + 22} text-anchor="middle" font-size="12">Time</text>
  <text class="ie-svg-text" x="14" y={top + plotH / 2} font-size="12" transform="rotate(-90 14 {top + plotH / 2})" text-anchor="middle">Traffic</text>
  <!-- Legend: line style, not color alone, separates the two series. -->
  <line x1={left} y1={H + 28} x2={left + 30} y2={H + 28} stroke="var(--ie-accent)" stroke-width="2.5" />
  <text class="ie-svg-text" x={left + 36} y={H + 32} font-size="12">Traffic (solid)</text>
  <line x1={left + 150} y1={H + 28} x2={left + 180} y2={H + 28} stroke="var(--ie-ink)" stroke-width="2" stroke-dasharray="6 4" />
  <text class="ie-svg-text" x={left + 186} y={H + 32} font-size="12">GPU count (dashed)</text>
</svg>
