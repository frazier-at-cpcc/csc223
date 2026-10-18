<script>
  // Series map of the inference stack. `highlight` is the current chapter number (0-7);
  // Chapter 0 highlights nothing because it introduces the whole map.
  let { highlight } = $props();

  const rows = [
    { ch: 1, name: 'Product requirements and metrics', detail: 'latency, throughput, cost, quality targets', layer: 'Requirements' },
    { ch: 7, name: 'Production', detail: 'containers, autoscaling, multi-cloud capacity, client code', layer: 'Infrastructure and tooling' },
    { ch: 5, name: 'Techniques', detail: 'quantization, speculation, caching, parallelism, disaggregation', layer: 'Runtime' },
    { ch: 4, name: 'Software', detail: 'CUDA, PyTorch, inference engines, benchmarking', layer: 'Runtime' },
    { ch: 2, name: 'Models', detail: 'transformers, prefill and decode, bottlenecks', layer: 'Runtime' },
    { ch: 3, name: 'Hardware', detail: 'GPUs, memory, interconnects, instances', layer: 'Runtime' },
  ];
</script>

<figure class="stackmap">
  <div class="sm-grid">
    <ol class="sm-stack" aria-label="Inference stack, top to bottom">
      {#each rows as r (r.ch)}
        {@const here = r.ch === highlight}
        <li class="sm-row" class:here aria-current={here ? 'true' : undefined}>
          <span class="sm-ch">Ch {r.ch}</span>
          <span class="sm-name">{r.name}{#if here}<span class="sm-here">{' (this chapter)'}</span>{/if}</span>
          <span class="sm-detail">{r.detail}</span>
          <span class="sm-layer">{r.layer}</span>
        </li>
      {/each}
    </ol>
    <div class="sm-side" class:here={highlight === 6} aria-current={highlight === 6 ? 'true' : undefined}>
      <span class="sm-ch">Ch 6</span>
      <span class="sm-name">Modalities{#if highlight === 6}<span class="sm-here">{' (this chapter)'}</span>{/if}</span>
      <span class="sm-detail">vision, embeddings, speech, image, video: each one reshapes every layer</span>
    </div>
  </div>
  <figcaption>
    The inference stack as this series teaches it. Chapter 0 introduces the whole map. Chapter 6
    runs alongside the stack because each modality changes the model, the bottleneck, and the metrics.
  </figcaption>
</figure>

<style>
  .stackmap { margin: var(--tessera-spacing-lg) 0; }
  .sm-grid { display: grid; grid-template-columns: 1fr 9rem; gap: var(--tessera-spacing-sm); }
  .sm-stack { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
  .sm-row, .sm-side {
    display: grid;
    grid-template-columns: 3.25rem 1fr;
    column-gap: var(--tessera-spacing-sm);
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg-secondary);
  }
  .sm-side { grid-template-columns: 1fr; align-content: center; text-align: center; }
  .sm-ch { grid-row: span 3; font-weight: 700; color: var(--tessera-text-light); font-size: 0.85rem; }
  .sm-name { font-weight: 600; }
  .sm-detail, .sm-layer { font-size: 0.85rem; color: var(--tessera-text-light); }
  .sm-layer { font-style: italic; }
  .here { border: 3px solid var(--tessera-primary); background: var(--tessera-primary-light); }
  .here .sm-ch, .here .sm-detail, .here .sm-layer { color: var(--tessera-text); }
  .sm-here { font-weight: 700; }
  figcaption { margin-top: var(--tessera-spacing-sm); font-size: 0.9rem; color: var(--tessera-text-light); }
  @media (max-width: 560px) {
    .sm-grid { grid-template-columns: 1fr; }
    .sm-ch { grid-row: auto; }
  }
</style>
