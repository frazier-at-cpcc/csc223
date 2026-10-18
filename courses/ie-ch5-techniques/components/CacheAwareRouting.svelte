<script>
  import Figure from './Figure.svelte';

  const instances = [
    { name: 'Instance 1', cached: ['Conversation A', 'Conversation B'] },
    { name: 'Instance 2', cached: ['Conversation C', 'Conversation D'] },
    { name: 'Instance 3', cached: ['Conversation E', 'Conversation F'] },
  ];
  const requests = [
    ['Conversation A, turn 4', 'Instance 1'],
    ['Conversation C, turn 2', 'Instance 2'],
    ['Conversation F, turn 6', 'Instance 3'],
    ['Conversation B, turn 3', 'Instance 1'],
  ];
</script>

<Figure
  number="5.10"
  caption="Cache-aware routing allocates traffic based on KV cache contents rather than dividing requests evenly across replicas."
  description="Three replicas each hold the KV cache for two conversations. Instance 1 holds conversations A and B, instance 2 holds C and D, and instance 3 holds E and F. The router sends each new request to the instance that already caches its conversation: A and B go to instance 1, C goes to instance 2, and F goes to instance 3. Every request is a cache hit."
>
  <div class="ie-cols">
    <div>
      <p style="margin-top: 0;"><strong>Incoming requests</strong></p>
      <ul class="ie-flow">
        {#each requests as [req, dest] (req)}
          <li class="ie-box">{req} <span aria-hidden="true">→</span><span class="ie-sr-only">routed to</span> {dest}</li>
        {/each}
      </ul>
    </div>
    <div>
      <p style="margin-top: 0;"><strong>Replicas and their cached prefixes</strong></p>
      <ul class="ie-flow">
        {#each instances as inst (inst.name)}
          <li class="ie-box is-strong">
            <strong>{inst.name}</strong><br />Cache: {inst.cached.join(', ')}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</Figure>
