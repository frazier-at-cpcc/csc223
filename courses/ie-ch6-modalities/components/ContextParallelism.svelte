<script>
  // Figure 6.11: Context Parallelism with a ring of context slices on one 8-GPU node.
  import Figure from './Figure.svelte';
  const uid = $props.id();
  const rows = [70, 130, 190, 250];
  const left = rows.map((y, i) => ({ y, n: i + 1 }));
  const right = rows.map((y, i) => ({ y, n: 8 - i }));
  const description =
    'Eight B200 GPUs sit on one node, four on each side of the diagram. Every GPU holds a full copy of the model weights. In the center, the shared latent space is divided into eight context slices, one per GPU. The slices form a ring: slice 1 passes partial attention results to slice 2, and so on down the left side to slice 4, across to slice 5, up the right side to slice 8, and back across the top to slice 1. Each GPU computes attention for its own slice and passes intermediate results to the next GPU in the ring, so the GPUs together compute attention over the entire latent space.';
</script>

<Figure number="6.11" caption="Context Parallelism replicates model weights but shares latent space to compute attention during video model inference. The numbered ring of context slices is an addition that shows ring attention." {description}>
  <svg viewBox="0 0 760 336" role="img" aria-label="Eight B200 GPUs each hold full weights and one slice of a shared latent space; slices pass attention results around a ring">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>
    <text x="380" y="24" text-anchor="middle" font-size="17" font-weight="700">Context Parallelism on one eight-GPU node</text>
    <rect x="250" y="40" width="260" height="268" rx="6" fill="#f3f8fd" stroke="#0b5cad" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="380" y="58" text-anchor="middle" font-size="13" font-weight="700">Shared latent space</text>

    {#each [...left.map((r) => ({ ...r, side: 'l' })), ...right.map((r) => ({ ...r, side: 'r' }))] as r}
      {@const gx = r.side === 'l' ? 10 : 660}
      {@const wx = r.side === 'l' ? 120 : 530}
      {@const sx = r.side === 'l' ? 262 : 392}
      <rect x={gx} y={r.y} width="90" height="44" rx="4" fill="#ffffff" stroke="#0b5cad" stroke-width="1.5" />
      <text x={gx + 45} y={r.y + 16} text-anchor="middle" font-size="13" font-weight="700">GPU {r.n}</text>
      <text x={gx + 45} y={r.y + 33} text-anchor="middle" font-size="12">B200</text>
      <rect x={wx} y={r.y} width="110" height="44" rx="4" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
      <text x={wx + 55} y={r.y + 23} text-anchor="middle" dominant-baseline="middle" font-size="13">Full weights</text>
      <line x1={r.side === 'l' ? 100 : 640} y1={r.y + 22} x2={r.side === 'l' ? 120 : 660} y2={r.y + 22} stroke="#0b5cad" stroke-width="1.5" stroke-dasharray="3 3" />
      <line x1={r.side === 'l' ? 230 : 504} y1={r.y + 22} x2={r.side === 'l' ? 256 : 530} y2={r.y + 22} stroke="#0b5cad" stroke-width="1.5" stroke-dasharray="3 3" />
      <rect x={sx} y={r.y} width="106" height="44" rx="4" fill="#ffffff" stroke="#0b5cad" stroke-width="1.5" />
      <text x={sx + 53} y={r.y + 23} text-anchor="middle" dominant-baseline="middle" font-size="13">Slice {r.n}</text>
    {/each}

    <g stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})">
      {#each [0, 1, 2] as i}
        <line x1="315" y1={rows[i] + 44} x2="315" y2={rows[i + 1] - 2} />
        <line x1="445" y1={rows[i + 1]} x2="445" y2={rows[i] + 46} />
      {/each}
      <line x1="368" y1={rows[3] + 22} x2="390" y2={rows[3] + 22} />
      <line x1="392" y1={rows[0] + 22} x2="370" y2={rows[0] + 22} />
    </g>
    <text x="380" y="328" text-anchor="middle" font-size="12">Ring attention passes partial results slice to slice</text>
  </svg>
</Figure>
