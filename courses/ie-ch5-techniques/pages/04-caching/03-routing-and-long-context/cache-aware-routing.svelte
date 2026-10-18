<script module>
  export const pageConfig = { title: 'Cache-Aware Routing' };
</script>

<script>
  import CacheAwareRouting from '../../../components/CacheAwareRouting.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Cache-Aware Routing</h1>

<p>
  A production deployment runs multiple <Term id="replica">replicas</Term> of the inference server and splits
  incoming traffic across them. A typical <Term id="router">router</Term> assigns each request based on how busy
  each replica is.
</p>
<p>
  Load-based routing ignores the <Term id="prefix-caching">prefix cache</Term>. A user in a long chatbot
  conversation, or a user asking several questions about one codebase, gains a cache hit only when the request
  reaches the replica that already holds the prefix. <strong>Cache-aware routing</strong> sends each request to that
  replica whenever possible, which makes the request faster and less expensive.
</p>

<CacheAwareRouting />

<h2>A global KV cache</h2>
<p>
  Another option uses G4 networked storage as a global <Term id="kv-cache">KV cache</Term> shared by all replicas. Every replica can
  eventually reach any precomputed sequence, and cached sequences survive when <Term id="node">nodes</Term> cycle or scale down during
  <Term id="autoscaling">autoscaling</Term>.
</p>
<p>
  Routing still matters with a global cache. A replica that holds the prefix in its G1 cache serves the request
  faster than a replica that reads the prefix from G4.
</p>
