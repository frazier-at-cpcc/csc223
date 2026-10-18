<script>
  const ops = [
    { label: 'QKᵀ matmul', x: 30, w: 160 },
    { label: 'softmax(S)', x: 200, w: 160 },
    { label: 'PV matmul', x: 370, w: 160 },
  ];
  const ticks = Array.from({ length: 26 }, (_, i) => 30 + i * 20);
</script>

<figure class="figure">
  <svg
    class="diagram"
    viewBox="0 0 560 170"
    role="img"
    aria-labelledby="kp-title kp-desc"
  >
    <title id="kp-title">Kernel profile of an attention kernel</title>
    <desc id="kp-desc">
      A timeline for one attention kernel is divided into three consecutive
      operations: the QK transpose matrix multiplication, the softmax over the
      score matrix S, and the PV matrix multiplication. The width of each block
      shows how long that operation takes.
    </desc>
    <rect x="20" y="10" width="520" height="110" rx="6" fill="#f9fafb" stroke="#1e40af" stroke-width="2" />
    <rect x="215" y="20" width="130" height="28" rx="4" fill="#ffffff" stroke="#1e40af" />
    <text x="280" y="39" text-anchor="middle" font-size="14" font-weight="700" fill="#1f2937">Kernel profile</text>
    <line x1="20" y1="58" x2="540" y2="58" stroke="#1e40af" />
    {#each ops as op (op.label)}
      <rect x={op.x} y="70" width={op.w} height="38" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5" />
      <text x={op.x + op.w / 2} y="94" text-anchor="middle" font-size="15" fill="#1f2937">{op.label}</text>
    {/each}
    <line x1="30" y1="138" x2="530" y2="138" stroke="#1f2937" />
    {#each ticks as t (t)}
      <line x1={t} y1="133" x2={t} y2="143" stroke="#1f2937" />
    {/each}
    <text x="530" y="162" text-anchor="end" font-size="13" fill="#1f2937">Time &#8594;</text>
  </svg>
  <details>
    <summary>Text description</summary>
    <p>
      The figure shows a kernel profile for an attention kernel laid out along a
      time axis. Three blocks sit side by side in execution order. The first
      block is the matrix multiplication of Q by the transpose of K. The second
      block is the softmax over the resulting score matrix, S. The third block
      is the matrix multiplication of the probabilities by V. In a real
      profiler, a block that is wider than expected points to the operation
      that is slowing the kernel down.
    </p>
  </details>
  <figcaption>
    Figure 4.7, recreated. A kernel profiler shows how long each operation
    within a kernel takes to execute, which reveals bottlenecks.
  </figcaption>
</figure>
