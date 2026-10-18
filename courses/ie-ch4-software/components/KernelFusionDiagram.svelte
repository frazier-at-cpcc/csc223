<script>
  // Matches the two-kernel worked example on the Memory Round Trips page.
  // Each arrow is one memory access, labeled in order; dashed arrows are the round trip fusion removes.
  const unfused = [
    { y: 62, dir: 'in', label: '1 Read [1, 2, 3]', removed: false },
    { y: 100, dir: 'out', label: '2 Write [2, 4, 6]', removed: true },
    { y: 138, dir: 'in', label: '3 Read [2, 4, 6]', removed: true },
    { y: 176, dir: 'out', label: '4 Write [6, 12, 18]', removed: false },
  ];
  const fused = [
    { y: 266, dir: 'in', label: '1 Read [1, 2, 3]', removed: false },
    { y: 304, dir: 'out', label: '2 Write [6, 12, 18]', removed: false },
  ];
  const X_MEM = 90;
  const X_CMP = 312;
</script>

{#snippet arrow(a)}
  <text x={(X_MEM + X_CMP) / 2} y={a.y - 8} text-anchor="middle" font-size="16" fill="#1f2937">{a.label}</text>
  <line
    x1={a.dir === 'in' ? X_MEM : X_CMP}
    y1={a.y}
    x2={a.dir === 'in' ? X_CMP : X_MEM}
    y2={a.y}
    stroke="#1f2937"
    stroke-width="2"
    stroke-dasharray={a.removed ? '6 5' : undefined}
    marker-end="url(#kf-arrow)"
  />
{/snippet}

<figure class="figure">
  <svg class="diagram" viewBox="0 0 440 330" role="img" aria-labelledby="kf-title kf-desc">
    <title id="kf-title">Kernel fusion removes the intermediate round trip</title>
    <desc id="kf-desc">
      The top row shows two separate kernels and four memory accesses: read [1, 2, 3], write [2, 4, 6],
      read [2, 4, 6], and write [6, 12, 18]. The middle write and read are dashed because fusion removes them.
      The bottom row shows one fused kernel and two memory accesses: read [1, 2, 3] and write [6, 12, 18].
    </desc>
    <defs>
      <marker id="kf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#1f2937" />
      </marker>
    </defs>

    <!-- Row 1: two separate kernels -->
    <text x="4" y="18" font-size="15" font-weight="700" fill="#1f2937">Two separate kernels: 4 memory accesses</text>
    <rect x="4" y="30" width="82" height="160" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="2" />
    <text x="45" y="115" text-anchor="middle" font-size="16" font-weight="700" fill="#1f2937">VRAM</text>
    <rect x="316" y="30" width="120" height="78" rx="6" fill="#ffffff" stroke="#1e40af" stroke-width="2" />
    <text x="376" y="66" text-anchor="middle" font-size="13" fill="#1f2937">Kernel 1</text>
    <text x="376" y="84" text-anchor="middle" font-size="14" font-family="monospace" fill="#1f2937">multiply_by_2</text>
    <rect x="316" y="112" width="120" height="78" rx="6" fill="#ffffff" stroke="#1e40af" stroke-width="2" />
    <text x="376" y="148" text-anchor="middle" font-size="13" fill="#1f2937">Kernel 2</text>
    <text x="376" y="166" text-anchor="middle" font-size="14" font-family="monospace" fill="#1f2937">multiply_by_3</text>
    {#each unfused as a (a.label)}{@render arrow(a)}{/each}

    <!-- Row 2: one fused kernel -->
    <text x="4" y="224" font-size="15" font-weight="700" fill="#1f2937">One fused kernel: 2 memory accesses</text>
    <rect x="4" y="236" width="82" height="86" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="2" />
    <text x="45" y="284" text-anchor="middle" font-size="16" font-weight="700" fill="#1f2937">VRAM</text>
    <rect x="316" y="236" width="120" height="86" rx="6" fill="#ffffff" stroke="#1e40af" stroke-width="2" />
    <text x="376" y="274" text-anchor="middle" font-size="13" fill="#1f2937">Fused kernel</text>
    <text x="376" y="292" text-anchor="middle" font-size="14" font-family="monospace" fill="#1f2937">multiply_by_6</text>
    {#each fused as a (a.label)}{@render arrow(a)}{/each}
  </svg>
  <details>
    <summary>Text description</summary>
    <p>
      The figure has two rows. Each row shows VRAM on the left and the kernels on
      the right, with numbered arrows for each memory access. In the top row, two
      kernels make four accesses in order: kernel 1 reads [1, 2, 3] and writes
      [2, 4, 6], then kernel 2 reads [2, 4, 6] and writes [6, 12, 18]. Accesses 2
      and 3 are drawn dashed. They form the intermediate round trip that fusion
      removes. In the bottom row, one fused kernel, multiply_by_6, reads [1, 2, 3]
      and writes [6, 12, 18], for two accesses in total.
    </p>
  </details>
  <figcaption>
    Figure 4.2. Each arrow is one memory access. Fusing two kernels removes one
    write and one read, the dashed arrows.
  </figcaption>
</figure>
