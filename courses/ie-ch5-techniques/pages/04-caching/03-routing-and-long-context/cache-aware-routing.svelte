<script module>
  export const pageConfig = { title: 'Cache-Aware Routing' };
</script>

<script>
  import CacheAwareRouting from '../../../components/CacheAwareRouting.svelte';
</script>

<h1>Cache-Aware Routing</h1>

<p>
  A production deployment runs multiple replicas of the inference server and splits incoming traffic across them.
  A typical router assigns each request based on how busy each replica is.
</p>
<p>
  Load-based routing ignores the prefix cache. A user in a long chatbot conversation, or a user asking several
  questions about one codebase, gains a cache hit only when the request reaches the replica that already holds the
  prefix. <strong>Cache-aware routing</strong> sends each request to that replica whenever possible, which makes the
  request faster and less expensive.
</p>

<CacheAwareRouting />

<h2>A global KV cache</h2>
<p>
  Another option uses G4 networked storage as a global KV cache shared by all replicas. Every replica can
  eventually reach any precomputed sequence, and cached sequences survive when nodes cycle or scale down during
  autoscaling.
</p>
<p>
  Routing still matters with a global cache. A replica that holds the prefix in its G1 cache serves the request
  faster than a replica that reads the prefix from G4.
</p>
