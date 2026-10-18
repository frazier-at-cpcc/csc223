<script>
  const layers = [
    {
      name: 'NVIDIA Dynamo',
      role: 'Orchestrates inference engines across many GPUs and nodes for large-scale deployments.',
      example: 'Example task: set a planner target for time to first token.',
    },
    {
      name: 'Inference engines',
      role: 'Configurable, PyTorch-backed serving for common model architectures: vLLM, SGLang, TensorRT-LLM.',
      example: 'Example task: choose launch flags for an engine server.',
    },
    {
      name: 'Deep learning frameworks',
      role: 'Python abstractions over CUDA for training, exporting, and running neural networks: PyTorch.',
      example: 'Example task: export a model or compile it for one GPU.',
    },
    {
      name: 'CUDA',
      role: 'Direct communication with the GPU for explicit control over computation and memory.',
      example: 'Example task: write, select, or fuse a kernel.',
    },
  ];
</script>

<figure class="figure">
  <div class="stack">
    <p class="axis">&#8593; Higher abstraction</p>
    <ol class="layers" aria-label="Software stack layers, from highest to lowest abstraction">
      {#each layers as layer, i (layer.name)}
        <li class="layer" style="--depth: {i}">
          <span class="layer-name">{layer.name}</span>
          <span class="layer-role">{layer.role}</span>
          <span class="layer-example">{layer.example}</span>
        </li>
      {/each}
    </ol>
    <p class="axis">&#8595; Closer to the GPU</p>
  </div>
  <figcaption>
    The inference software stack covered in this chapter. Each layer builds on
    the one below it. The list runs from the highest level of abstraction at the
    top to CUDA, the layer closest to the hardware, at the bottom.
  </figcaption>
</figure>

<style>
  .axis {
    margin: 0.25rem 0;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .layers {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .layer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.25rem 0.75rem;
    padding: 0.75rem 1rem;
    border: 2px solid var(--tessera-primary);
    border-left-width: calc(4px + var(--depth) * 4px);
    border-radius: 6px;
    background: var(--tessera-bg);
  }

  .layer-name {
    font-weight: 700;
  }

  .layer-role,
  .layer-example {
    grid-column: 1 / -1;
    font-size: 0.95rem;
  }

  .layer-example {
    font-style: italic;
  }
</style>
