<script module>
  export const pageConfig = { title: 'Knowledge Check: Routing and Long Context' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Routing and Long Context</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_routing_1"
  question="A deployment stores a global KV cache on G4 networked storage. What does the global cache provide that per-replica caches do not?"
  options={[
    'Cached sequences survive when a node scales down',
    'Every request reads its prefix at G1 bandwidth',
    'Routing decisions no longer affect latency',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A global cache keeps precomputed sequences available to every replica, even after nodes cycle or scale down.',
    'Incorrect. G4 is the slowest storage level. Only a replica with the prefix in its own VRAM reads at G1 bandwidth.',
    'Incorrect. Routing still matters, because a replica with a hot G1 cache serves the request faster than one reading from G4.',
  ]}
/>

<MultipleChoice
  id="kc_routing_2"
  question="One 200,000-token document arrives and stalls decode for every other request on the engine. Which optimization addresses this problem directly?"
  options={['Chunked prefill', 'FlashAttention', 'PagedAttention']}
  correct={0}
  optionFeedback={[
    'Correct. Chunked prefill splits the long input into chunks that run alongside decode instead of monopolizing the engine.',
    'Incorrect. FlashAttention reduces memory reads and writes inside attention but still processes the whole input at once.',
    'Incorrect. PagedAttention reduces KV cache fragmentation and duplication. It does not schedule prefill work.',
  ]}
/>
