<script>
  // Profile of one prefill forward pass behind a 350 ms time to first token.
  // Time is summed per operation type across all layers. The activation row is the anomaly.
  const ops = [
    { label: 'Embedding and normalization', ms: 20 },
    { label: 'Attention kernels', ms: 110 },
    { label: 'MLP matrix multiplications', ms: 120 },
    { label: 'Activation function', ms: 80, flag: 'Unexpectedly long for an elementwise operation' },
    { label: 'Sampling and other', ms: 20 },
  ];
  const max = Math.max(...ops.map((o) => o.ms));
  const total = ops.reduce((s, o) => s + o.ms, 0);
</script>

<figure class="figure">
  <table class="prof">
    <caption>GPU time per operation type in one prefill pass, total {total} ms</caption>
    <thead>
      <tr>
        <th scope="col">Operation</th>
        <th scope="col">Time</th>
      </tr>
    </thead>
    <tbody>
      {#each ops as o (o.label)}
        <tr class:flagged={o.flag}>
          <th scope="row">
            {o.label}
            {#if o.flag}<span class="flag">{o.flag}</span>{/if}
          </th>
          <td>
            <span class="bar-wrap" aria-hidden="true"><span class="bar" style="width: {(o.ms / max) * 100}%"></span></span>
            <span class="val">{o.ms} ms</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <figcaption>
    Figure 4.7. A profiler splits a 350 ms time to first token into the
    operations that produced it. The activation function takes 80 ms, far more
    than an elementwise operation should, which points to excess memory reads.
  </figcaption>
</figure>

<style>
  .prof {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .prof caption {
    text-align: left;
    font-weight: 600;
    margin-bottom: var(--tessera-spacing-sm);
  }
  .prof th,
  .prof td {
    padding: 0.4rem 0.5rem;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid var(--tessera-border);
  }
  .prof tbody th {
    font-weight: 600;
    width: 45%;
  }
  .flag {
    display: block;
    font-weight: 400;
    font-style: italic;
    font-size: 0.85rem;
  }
  .bar-wrap {
    display: block;
    height: 1rem;
    background: var(--tessera-bg);
    border: 1px solid var(--tessera-border);
    border-radius: 3px;
  }
  .bar {
    display: block;
    height: 100%;
    background: var(--tessera-primary-light);
    border-right: 2px solid var(--tessera-primary-dark);
  }
  .flagged .bar {
    background: repeating-linear-gradient(45deg, #fde68a, #fde68a 4px, #f59e0b 4px, #f59e0b 8px);
    border-right-color: #92400e;
  }
  .val {
    display: block;
    margin-top: 0.2rem;
  }
</style>
