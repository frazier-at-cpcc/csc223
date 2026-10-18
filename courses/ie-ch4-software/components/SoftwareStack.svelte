<script>
  const layers = [
    {
      name: 'NVIDIA Dynamo',
      section: 'Section 4.4',
      role: 'Orchestrates inference engines across many GPUs and nodes for large-scale deployments.',
    },
    {
      name: 'Inference engines',
      section: 'Section 4.3',
      role: 'Configurable, PyTorch-backed serving for common model architectures: vLLM, SGLang, TensorRT-LLM.',
    },
    {
      name: 'Deep learning frameworks',
      section: 'Section 4.2',
      role: 'Python abstractions over CUDA for training, exporting, and running neural networks: PyTorch.',
    },
    {
      name: 'CUDA',
      section: 'Section 4.1',
      role: 'Direct communication with the GPU for explicit control over computation and memory.',
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
          <span class="layer-section">{layer.section}</span>
          <span class="layer-role">{layer.role}</span>
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
    grid-template-columns: 1fr auto;
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

  .layer-section {
    font-size: 0.85rem;
    color: var(--tessera-text);
  }

  .layer-role {
    grid-column: 1 / -1;
    font-size: 0.95rem;
  }
</style>
