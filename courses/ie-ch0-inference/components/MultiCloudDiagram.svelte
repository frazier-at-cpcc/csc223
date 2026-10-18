<script>
  import Figure from './Figure.svelte';

  // Capacity per cloud follows the book figure: Cloud A 4 planes, Cloud B 1, Cloud C 3.
  const clouds = [
    { name: 'Cloud A', planes: 4 },
    { name: 'Cloud B', planes: 1 },
    { name: 'Cloud C', planes: 3 },
  ];

  let outage = $state(false);

  const status = $derived(
    outage
      ? 'Cloud A is down, and its four workload planes are offline. The global control plane redeploys the models from Cloud A onto the four workload planes in Clouds B and C. Routing sends requests to those planes, so users stay served.'
      : 'All eight workload planes are healthy. The global control plane places each model wherever capacity exists across the three clouds.',
  );
</script>

<Figure number="0.3" caption="Serving model inference at scale requires unifying capacity across multiple cloud service providers.">
  <div class="mc">
    <div class="control">
      <p class="control-name">Global control plane</p>
      <p class="control-note">Deploys models and allocates resources across all eight workload planes</p>
    </div>
    <ul class="clouds" aria-label="Clouds and their workload planes">
      {#each clouds as c (c.name)}
        {@const down = outage && c.name === 'Cloud A'}
        <li class="cloud" class:down>
          <p class="cloud-name">{c.name}{#if down}: outage{/if}</p>
          <ul class="planes" aria-label="{c.name} workload planes">
            {#each Array(c.planes) as _, i (i)}
              <li class="plane">
                <span>Workload plane {i + 1}</span>
                <span class="state">{down ? 'offline' : 'serving'}</span>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
    <div class="toggle">
      <button type="button" aria-pressed={outage ? 'true' : 'false'} onclick={() => (outage = !outage)}>
        Simulate a Cloud A outage
      </button>
    </div>
    <p class="status" role="status">{status}</p>
  </div>
  {#snippet description()}
    <p>
      The figure shows three cloud providers, labeled Cloud A, Cloud B, and Cloud C. Each provider contributes a different
      amount of capacity. Cloud A runs four workload planes, Cloud B runs one, and Cloud C runs three.
    </p>
    <p>
      A single global control plane sits above all three clouds and connects to every one of the eight workload planes. The
      control plane deploys models and allocates resources across all three clouds, so the workload planes act as one pool
      of compute instead of three separate silos.
    </p>
    <p>
      A button simulates an outage in Cloud A. During the outage, Cloud A's four planes show as offline, and the status text
      explains that the control plane moves their models to the planes in Clouds B and C.
    </p>
  {/snippet}
</Figure>

<style>
  .mc {
    display: grid;
    gap: var(--tessera-spacing-md);
  }
  .control {
    position: relative;
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border: 2px dashed #14532d;
    border-radius: 6px;
    background: #ffffff;
    text-align: center;
  }
  .control::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: calc(-1 * var(--tessera-spacing-md) - 2px);
    height: var(--tessera-spacing-md);
    border-left: 2px solid #1f7a4d;
  }
  .control-name {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #14532d;
  }
  .control-note {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: #14532d;
  }
  .clouds {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    gap: var(--tessera-spacing-sm);
    margin: 0;
    padding: var(--tessera-spacing-sm) 0 0;
    border-top: 2px solid #1f7a4d;
    list-style: none;
  }
  .cloud {
    padding: var(--tessera-spacing-sm);
    border: 1.5px solid #1f7a4d;
    border-radius: 6px;
    background: #e3f4ea;
  }
  .cloud.down {
    border-style: dashed;
    background: #f3f4f6;
  }
  .cloud-name {
    margin: 0 0 0.35rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #14532d;
  }
  .down .cloud-name {
    color: #7f1d1d;
  }
  .planes {
    display: grid;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .plane {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.35rem 0.5rem;
    border: 2px solid #1f7a4d;
    border-radius: 4px;
    background: #ffffff;
    color: #14532d;
    font-size: 0.9rem;
  }
  .down .plane {
    border-style: dotted;
    border-color: #6b7280;
    color: #374151;
    text-decoration: line-through;
  }
  .down .plane .state {
    text-decoration: none;
    font-weight: 700;
  }
  .state {
    font-size: 0.8rem;
  }
  .toggle button {
    font: inherit;
    padding: 0.45rem 0.9rem;
    border: 2px solid var(--tessera-primary);
    border-radius: 6px;
    background: var(--tessera-bg);
    color: var(--tessera-primary-dark, var(--tessera-primary));
    cursor: pointer;
  }
  .toggle button[aria-pressed='true'] {
    background: var(--tessera-primary);
    color: #ffffff;
  }
  .toggle button:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .status {
    margin: 0;
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border-left: 4px solid var(--tessera-primary);
    background: var(--tessera-bg-secondary);
  }
</style>
