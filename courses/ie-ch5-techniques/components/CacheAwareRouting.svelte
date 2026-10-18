<script>
  import Figure from './Figure.svelte';

  const instances = [
    { name: 'Instance 1', cached: ['A', 'B'] },
    { name: 'Instance 2', cached: ['C', 'D'] },
    { name: 'Instance 3', cached: ['E', 'F'] },
  ];
  // Each request: conversation, replica chosen by a load-based router, replica chosen by a cache-aware router.
  const requests = [
    { conv: 'A', turn: 4, load: 'Instance 2', cache: 'Instance 1' },
    { conv: 'C', turn: 2, load: 'Instance 3', cache: 'Instance 2' },
    { conv: 'F', turn: 6, load: 'Instance 1', cache: 'Instance 3' },
    { conv: 'B', turn: 3, load: 'Instance 1', cache: 'Instance 1' },
  ];
  const holds = (inst, conv) => instances.find((i) => i.name === inst).cached.includes(conv);
  const panels = [
    { key: 'load', title: 'Load-based routing: least busy replica' },
    { key: 'cache', title: 'Cache-aware routing: replica that holds the prefix' },
  ];
</script>

<Figure
  number="5.10"
  caption="Cache-aware routing allocates traffic based on KV cache contents rather than dividing requests evenly across replicas. The same four requests earn one cache hit under load-based routing and four under cache-aware routing."
  description="Three replicas each hold the KV cache for two conversations: instance 1 holds A and B, instance 2 holds C and D, and instance 3 holds E and F. Four requests arrive: conversation A turn 4, C turn 2, F turn 6, and B turn 3. A load-based router sends them to instances 2, 3, 1, and 1, so only B lands on a replica that holds its prefix: one hit and three misses. A cache-aware router sends A and B to instance 1, C to instance 2, and F to instance 3: four hits."
>
  <p style="margin-top: 0;"><strong>Replicas and their cached conversations</strong></p>
  <ul class="ie-row" style="list-style: none; padding: 0;">
    {#each instances as inst (inst.name)}
      <li class="ie-box is-strong">{inst.name}: {inst.cached.map((c) => `Conversation ${c}`).join(', ')}</li>
    {/each}
  </ul>
  <div class="ie-cols" style="margin-top: 0.75rem;">
    {#each panels as p (p.key)}
      {@const hits = requests.filter((r) => holds(r[p.key], r.conv)).length}
      <div>
        <p style="margin: 0 0 0.25rem;"><strong>{p.title}</strong></p>
        <ul class="ie-flow">
          {#each requests as r (r.conv)}
            {@const hit = holds(r[p.key], r.conv)}
            <li class="ie-box">
              Conversation {r.conv}, turn {r.turn} <span aria-hidden="true">→</span><span class="ie-sr-only">routed to</span>
              {r[p.key]}: <strong>{hit ? 'cache hit' : 'cache miss'}</strong>
            </li>
          {/each}
        </ul>
        <p style="margin: 0.25rem 0 0;">{hits} of {requests.length} requests hit the cache.</p>
      </div>
    {/each}
  </div>
</Figure>
