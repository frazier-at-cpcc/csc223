<script>
  // Disaggregated Dynamo deployment: requests flow top to bottom; the planner watches and scales both pools.
  const flow = [
    { name: 'Incoming requests', role: 'Prompts arrive from clients.' },
    { name: 'Router', role: 'Cache-aware routing sends each request to a worker that already holds a matching prefix in its KV cache.' },
    { name: 'Prefill worker pool', role: 'Engine instances (vLLM, SGLang, or TensorRT-LLM) process prompts and build the KV cache.' },
    { name: 'KV cache transfer', role: 'The KV cache moves from the prefill worker to a decode worker.' },
    { name: 'Decode worker pool', role: 'Engine instances generate output tokens and stream them back to the client.' },
  ];
</script>

<figure class="figure">
  <div class="dyn">
    <ol class="flow" aria-label="Request path through a disaggregated Dynamo deployment, top to bottom">
      {#each flow as f, i (f.name)}
        <li class="step">
          <span class="name">{f.name}</span>
          <span class="role">{f.role}</span>
        </li>
        {#if i < flow.length - 1}<li class="arrow" aria-hidden="true">&#8595;</li>{/if}
      {/each}
    </ol>
    <div class="planner">
      <span class="name">Planner</span>
      <span class="role">
        Watches time to first token and tokens per second. Adds or removes
        prefill workers and decode workers, each pool on its own, to keep both
        metrics within their targets.
      </span>
    </div>
  </div>
  <figcaption>
    A disaggregated deployment under NVIDIA Dynamo. Dynamo supplies the router,
    the KV cache transfer, and the planner. The inference engines still run the
    model in each worker.
  </figcaption>
</figure>

<style>
  .dyn {
    display: grid;
    grid-template-columns: 1fr 12rem;
    gap: var(--tessera-spacing-md);
    align-items: center;
  }
  .flow {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .step,
  .planner {
    display: grid;
    gap: 0.15rem;
    padding: 0.5rem 0.75rem;
    border: 2px solid var(--tessera-primary);
    border-radius: 6px;
    background: var(--tessera-bg);
  }
  .planner {
    border-style: dashed;
  }
  .name {
    font-weight: 700;
  }
  .role {
    font-size: 0.9rem;
  }
  .arrow {
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.4;
  }
  @media (max-width: 560px) {
    .dyn {
      grid-template-columns: 1fr;
    }
  }
</style>
