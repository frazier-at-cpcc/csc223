<script>
  // Figures 7.6 to 7.8: request timelines under static, dynamic, and continuous batching.
  // Times in milliseconds are read from the book's figures.
  let { mode = 'static' } = $props();

  const data = {
    static: {
      title: 'Static batching',
      cutoff: 240,
      rows: [
        { arrive: 0, start: 240, end: 600 },
        { arrive: 40, start: 240, end: 400 },
        { arrive: 90, start: 240, end: 600 },
        { arrive: 230, start: 240, end: 370 },
      ],
    },
    dynamic: {
      title: 'Dynamic batching',
      cutoff: 150,
      rows: [
        { arrive: 0, start: 150, end: 500 },
        { arrive: 40, start: 150, end: 320 },
        { arrive: 90, start: 150, end: 510 },
        { arrive: 230, start: 230, end: 230, note: 'Batched separately' },
      ],
    },
    continuous: {
      title: 'Continuous batching',
      cutoff: null,
      rows: [
        { arrive: 0, start: 0, end: 400, freed: true },
        { arrive: 40, start: 40, end: 220, freed: true },
        { arrive: 90, start: 90, end: 470, freed: true },
        { arrive: 230, start: 230, end: 380, freed: true },
      ],
    },
  };

  const d = $derived(data[mode]);
  const px = (ms) => 70 + ms * 0.7;

  const labels = {
    static: 'Timeline of four requests under static batching. Requests arrive at 0, 40, 90, and 230 milliseconds. All four wait, shown as dashed queue time, until the batch fills at about 240 milliseconds. Inference then runs for all four, ending between 370 and 600 milliseconds.',
    dynamic: 'Timeline of four requests under dynamic batching. Requests arrive at 0, 40, and 90 milliseconds and wait only until a cutoff at 150 milliseconds, when the partial batch starts. A fourth request arrives at 230 milliseconds, after the cutoff, and is batched separately.',
    continuous: 'Timeline of four requests under continuous batching. Each request starts inference the moment it arrives, because a slot is free. When every slot is full, a new request waits in a queue until a slot frees. When a request finishes, its slot is freed, shown as a dotted line, and a new request can take its place.',
  };
</script>

<svg viewBox="0 0 540 280" role="img" aria-label={labels[mode]}>
  <text class="ie-svg-text" x="270" y="20" text-anchor="middle" font-size="15" font-weight="600">{d.title}</text>
  {#if d.cutoff !== null}
    <line x1={px(d.cutoff)} y1="40" x2={px(d.cutoff)} y2="200" stroke="var(--ie-muted)" stroke-dasharray="3 3" />
    <text class="ie-svg-text" x={px(d.cutoff) + 4} y="44" font-size="11">{mode === 'static' ? 'Batch full' : 'Cutoff time'}</text>
  {/if}
  {#each d.rows as r, i}
    {@const y = 70 + i * 36}
    {#if r.start > r.arrive}
      <line x1={px(r.arrive)} y1={y} x2={px(r.start)} y2={y} stroke="var(--ie-muted)" stroke-width="2" stroke-dasharray="6 4" />
    {/if}
    {#if r.end > r.start}
      <line x1={px(r.start)} y1={y} x2={px(r.end)} y2={y} stroke="var(--ie-accent)" stroke-width="4" />
    {/if}
    {#if r.freed}
      <line x1={px(r.end)} y1={y} x2={px(640)} y2={y} stroke="var(--ie-line)" stroke-width="2" stroke-dasharray="1 4" />
    {/if}
    <circle cx={px(r.arrive)} cy={y} r="5" fill="var(--ie-ink)" />
    {#if r.note}
      <text class="ie-svg-text" x={px(r.arrive) + 12} y={y + 4} font-size="12">{r.note}</text>
    {/if}
  {/each}
  <line x1={px(0)} y1="210" x2={px(640)} y2="210" stroke="var(--ie-line)" />
  {#each [0, 100, 200, 300, 400, 500, 600] as t}
    <line x1={px(t)} y1="206" x2={px(t)} y2="214" stroke="var(--ie-line)" />
    <text class="ie-svg-text" x={px(t)} y="228" text-anchor="middle" font-size="11">{t}</text>
  {/each}
  <text class="ie-svg-text" x="270" y="246" text-anchor="middle" font-size="11">Milliseconds</text>
  <!-- Legend: dash pattern and weight distinguish the segments. -->
  <line x1="20" y1="268" x2="44" y2="268" stroke="var(--ie-muted)" stroke-width="2" stroke-dasharray="6 4" />
  <text class="ie-svg-text" x="48" y="272" font-size="11">Queue time</text>
  <line x1="120" y1="268" x2="144" y2="268" stroke="var(--ie-accent)" stroke-width="4" />
  <text class="ie-svg-text" x="148" y="272" font-size="11">Inference time</text>
  {#if mode === 'continuous'}
    <line x1="240" y1="268" x2="264" y2="268" stroke="var(--ie-line)" stroke-width="2" stroke-dasharray="1 4" />
    <text class="ie-svg-text" x="268" y="272" font-size="11">Slot freed for a new request</text>
  {/if}
</svg>
