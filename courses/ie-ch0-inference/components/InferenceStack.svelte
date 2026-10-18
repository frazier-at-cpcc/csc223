<script>
  import Figure from './Figure.svelte';

  const techniques = ['Batching', 'Caching', 'Quantization', 'Speculation', 'Parallelism', 'Disaggregation'];
  const engines = ['vLLM', 'SGLang', 'TensorRT-LLM'];
</script>

<Figure number="0.1" caption="A complete inference stack includes both runtime and infrastructure optimizations.">
  <div class="stack">
    <div class="layer" role="group" aria-labelledby="stack-runtime">
      <p id="stack-runtime" class="layer-title">Runtime</p>
      <p class="group-label">Model performance techniques</p>
      <ul class="grid three">
        {#each techniques as t (t)}<li>{t}</li>{/each}
      </ul>
      <p class="group-label">Software stack, from inference engines down to CUDA</p>
      <ul class="grid three">
        {#each engines as e (e)}<li>{e}</li>{/each}
      </ul>
      <ul class="grid one">
        <li>PyTorch</li>
        <li>CUDA</li>
      </ul>
    </div>
    <div class="layer" role="group" aria-labelledby="stack-infra">
      <p id="stack-infra" class="layer-title">Infrastructure</p>
      <ul class="grid two">
        <li>Routing</li>
        <li>Load Balancing</li>
      </ul>
      <ul class="grid one">
        <li>Autoscaling</li>
        <li>Multi-Cloud Capacity Management</li>
      </ul>
      <ul class="grid three">
        <li>GPUs</li>
        <li>Storage</li>
        <li>Networking</li>
      </ul>
    </div>
  </div>
  {#snippet description()}
    <p>
      The figure shows two stacked layers. The runtime layer lists six model performance techniques: batching, caching,
      quantization, speculation, parallelism, and disaggregation. Below them sits the runtime software stack. The inference
      engines vLLM, SGLang, and TensorRT-LLM run on PyTorch, which runs on CUDA.
    </p>
    <p>
      The infrastructure layer lists routing and load balancing at the top, then autoscaling, then multi-cloud capacity
      management. GPUs, storage, and networking form its base.
    </p>
  {/snippet}
</Figure>

<style>
  .stack {
    display: grid;
    gap: var(--tessera-spacing-md);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9rem;
  }
  .layer {
    border: 2px solid #1f7a4d;
    border-radius: 4px;
    padding: var(--tessera-spacing-sm);
    background: #f1faf5;
  }
  .layer-title {
    margin: 0 0 var(--tessera-spacing-sm);
    padding: 0.25rem;
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #1f7a4d;
    color: #ffffff;
  }
  .group-label {
    margin: var(--tessera-spacing-sm) 0 0.25rem;
    font-size: 0.85rem;
    text-align: center;
    color: #14532d;
  }
  .grid {
    display: grid;
    gap: 0.35rem;
    margin: 0 0 0.35rem;
    padding: 0;
    list-style: none;
  }
  .grid.one {
    grid-template-columns: 1fr;
  }
  .grid.two {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid.three {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid li {
    padding: 0.4rem 0.25rem;
    text-align: center;
    border: 1px solid #1f7a4d;
    background: #ffffff;
    color: #14532d;
    overflow-wrap: anywhere;
  }
  @media (max-width: 480px) {
    .grid.three {
      grid-template-columns: 1fr;
    }
  }
</style>
