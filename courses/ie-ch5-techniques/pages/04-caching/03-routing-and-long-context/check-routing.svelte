<script module>
  export const pageConfig = { title: 'Knowledge Check: Routing and Long Context' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Routing and Long Context</h1>
<p>These questions are ungraded. All three practice objective 6: choosing a KV cache technique for a caching problem.</p>

<Matching
  id="kc_routing_1"
  question="Match each technique to the caching problem it solves."
  pairs={[
    { left: 'Cache-aware routing', right: 'Follow-up requests land on replicas that do not hold their prefix' },
    { left: 'KV cache offloading', right: 'Useful prefixes are evicted because VRAM is full' },
    { left: 'Chunked prefill', right: 'One very long input stalls decode for every other request' },
    { left: 'PagedAttention', right: 'KV cache memory is lost to fragmentation' },
  ]}
  correctFeedback="Correct. Each technique targets a different point where the KV cache loses value."
  incorrectFeedback="Routing fixes where requests land. Offloading fixes running out of VRAM. Chunked prefill fixes scheduling of long inputs. PagedAttention fixes fragmentation inside the cache."
/>

<MultipleChoice
  id="kc_routing_2"
  question="A deployment stores a global KV cache on G4 networked storage. What does the global cache provide that per-replica caches do not?"
  options={[
    'Cached sequences that survive when a node scales down',
    'Prefix reads at G1 bandwidth for every single request',
    'Routing decisions that no longer affect request latency',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A global cache keeps precomputed sequences available to every replica, even after nodes cycle or scale down.',
    'Incorrect. G4 is the slowest storage level. Only a replica with the prefix in its own VRAM reads at G1 bandwidth.',
    'Incorrect. Routing still matters, because a replica with a hot G1 cache serves the request faster than one reading from G4.',
  ]}
/>

<MultipleChoice
  id="kc_routing_3"
  question="One 200,000-token document arrives and stalls decode for every other request on the engine. Which optimization addresses this problem directly?"
  options={['Cache-aware routing', 'Chunked prefill', 'FlashAttention', 'PagedAttention']}
  correct={1}
  optionFeedback={[
    'Incorrect. Routing chooses a replica, but the long prefill would still stall whichever replica receives it.',
    'Correct. Chunked prefill splits the long input into chunks that run alongside decode instead of monopolizing the engine.',
    'Incorrect. FlashAttention reduces memory reads and writes inside attention but still processes the whole input at once.',
    'Incorrect. PagedAttention reduces KV cache fragmentation and duplication. It does not schedule prefill work.',
  ]}
/>
