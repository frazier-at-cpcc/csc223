<script module>
  export const pageConfig = { title: 'Expert Parallelism for Higher Throughput' };
</script>

<script>
  import ExpertParallel from '../../../components/ExpertParallel.svelte';
  import HybridLayout from '../../../components/HybridLayout.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Expert Parallelism for Higher Throughput</h1>

<p>
  <strong>Expert Parallelism (EP)</strong> divides whole experts across GPUs. A model with 128 experts served in EP8
  across eight GPUs places 16 complete experts on each GPU.
</p>

<ExpertParallel />

<h2>System throughput and per-token speed</h2>
<p>
  EP raises total system <Term id="throughput">throughput</Term>, which makes inference more scalable and less expensive. Each expert processes
  its tokens separately. An individual token takes as long as before, but the system as a whole handles more tokens
  at once.
</p>

<h2>Communication compared with TP</h2>
<p>
  The expert router, a small component of every <Term id="mixture-of-experts">MoE</Term> layer, decides which experts each token activates. Every GPU holds a full copy of it. GPUs still communicate to pass tokens from expert to expert. Unlike TP, EP does not need to collect the
  results of every layer. This lower communication overhead lets EP scale well across nodes and on systems with
  limited interconnect bandwidth.
</p>

<h2>Combining TP and EP</h2>
<p>
  Many deployments combine the two forms to gain both benefits. The layout below applies TP to <Term id="attention">attention</Term> and EP to
  the sparse MoE layer.
</p>

<HybridLayout />
