<script>
  // Arrow y-offsets inside each row. The unfused row has four round trips; the fused row has one.
  const unfused = [38, 52, 66, 80, 94, 108, 122, 136];
  const fused = [222, 238];
</script>

<figure class="figure">
  <svg
    class="diagram"
    viewBox="0 0 560 300"
    role="img"
    aria-labelledby="kf-title kf-desc"
  >
    <title id="kf-title">Kernel fusion reduces memory traffic</title>
    <desc id="kf-desc">
      Two rows compare memory traffic between VRAM and the GPU compute units.
      In the top row, original separate kernels move data back and forth eight
      times. In the bottom row, one fused kernel moves data once in each
      direction.
    </desc>
    <defs>
      <marker id="kf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#1f2937" />
      </marker>
    </defs>

    <!-- Row 1: original kernels -->
    <rect x="20" y="30" width="130" height="116" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="2" />
    <text x="85" y="94" text-anchor="middle" font-size="20" font-weight="700" fill="#1f2937">VRAM</text>
    <rect x="410" y="30" width="130" height="116" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="2" />
    <text x="475" y="94" text-anchor="middle" font-size="20" font-weight="700" fill="#1f2937">Compute</text>
    {#each unfused as y, i (y)}
      {#if i % 2 === 0}
        <line x1="155" y1={y} x2="405" y2={y} stroke="#1f2937" stroke-width="1.5" marker-end="url(#kf-arrow)" />
      {:else}
        <line x1="405" y1={y} x2="155" y2={y} stroke="#1f2937" stroke-width="1.5" marker-end="url(#kf-arrow)" />
      {/if}
    {/each}
    <rect x="215" y="72" width="130" height="32" rx="4" fill="#ffffff" stroke="#1e40af" />
    <text x="280" y="93" text-anchor="middle" font-size="14" fill="#1f2937">Original kernels</text>

    <!-- Row 2: fused kernel -->
    <rect x="20" y="172" width="130" height="116" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="2" />
    <text x="85" y="236" text-anchor="middle" font-size="20" font-weight="700" fill="#1f2937">VRAM</text>
    <rect x="410" y="172" width="130" height="116" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="2" />
    <text x="475" y="236" text-anchor="middle" font-size="20" font-weight="700" fill="#1f2937">Compute</text>
    <line x1="155" y1={fused[0]} x2="405" y2={fused[0]} stroke="#1f2937" stroke-width="1.5" marker-end="url(#kf-arrow)" />
    <line x1="405" y1={fused[1]} x2="155" y2={fused[1]} stroke="#1f2937" stroke-width="1.5" marker-end="url(#kf-arrow)" />
    <rect x="225" y="214" width="110" height="32" rx="4" fill="#ffffff" stroke="#1e40af" />
    <text x="280" y="235" text-anchor="middle" font-size="14" fill="#1f2937">Fused kernel</text>
  </svg>
  <details>
    <summary>Text description</summary>
    <p>
      The figure has two rows. Each row shows a VRAM block on the left and a
      compute block on the right. In the top row, labeled "Original kernels,"
      eight arrows alternate direction between VRAM and compute. Each pair of
      arrows is one kernel reading its input from memory and writing its output
      back. In the bottom row, labeled "Fused kernel," one arrow carries the
      input from VRAM to compute and one arrow carries the result back. The
      fused kernel performs the same work with far less memory traffic.
    </p>
  </details>
  <figcaption>
    Figure 4.2, recreated. Kernel fusion reduces reads and writes between memory
    and compute within a GPU.
  </figcaption>
</figure>
