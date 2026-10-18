<script>
  // Two paths from a trained PyTorch model to a serving runtime. Each step names the artifact and what it holds.
  const paths = [
    {
      name: 'Export path',
      steps: [
        { what: 'PyTorch model', holds: 'Python model code and weights' },
        { what: 'ONNX file', holds: 'Weights plus an execution graph' },
        { what: 'ONNX Runtime, or a TensorRT engine file', holds: 'ONNX Runtime executes the graph on many GPU types. TensorRT compiles it into an engine file for one NVIDIA GPU.' },
      ],
    },
    {
      name: 'Engine path',
      steps: [
        { what: 'PyTorch model', holds: 'Python model code and weights' },
        { what: 'Safetensors files', holds: 'Weights only' },
        { what: 'vLLM, SGLang, or TensorRT-LLM', holds: 'The engine supplies its own optimized model code and loads the weights' },
      ],
    },
  ];
</script>

<figure class="figure">
  <div class="paths">
    {#each paths as p (p.name)}
      <section class="path" aria-label={p.name}>
        <p class="path-name">{p.name}</p>
        <ol>
          {#each p.steps as s, i (s.what)}
            <li>
              <span class="what">{s.what}</span>
              <span class="holds">{s.holds}</span>
            </li>
            {#if i < p.steps.length - 1}<li class="arrow" aria-hidden="true">&#8595;</li>{/if}
          {/each}
        </ol>
      </section>
    {/each}
  </div>
  <figcaption>
    Two paths from a trained PyTorch model to a serving runtime. The export path
    ships the graph with the weights. The engine path ships weights only and
    relies on the engine's own model code.
  </figcaption>
</figure>

<style>
  .paths {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--tessera-spacing-md);
  }
  .path {
    border: 2px solid var(--tessera-primary);
    border-radius: 6px;
    padding: var(--tessera-spacing-md);
    background: var(--tessera-bg);
  }
  .path-name {
    margin: 0 0 var(--tessera-spacing-sm);
    font-weight: 700;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li:not(.arrow) {
    display: grid;
    gap: 0.15rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg-secondary);
  }
  .what {
    font-weight: 600;
  }
  .holds {
    font-size: 0.9rem;
  }
  .arrow {
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.4;
  }
</style>
