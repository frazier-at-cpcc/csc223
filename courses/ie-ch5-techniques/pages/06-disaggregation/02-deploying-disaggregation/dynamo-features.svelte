<script module>
  export const pageConfig = { title: 'Dynamic Disaggregation with NVIDIA Dynamo' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Dynamic Disaggregation with NVIDIA Dynamo</h1>

<p>
  <Term id="nvidia-dynamo" /> provides production-ready support for disaggregation and handles mixed real-world
  traffic. It includes developer tools and prebuilt optimizations.
</p>

<h2>Dynamo features for disaggregation</h2>
<ul>
  <li>A <strong>prefill queue</strong> holds requests when every prefill engine is saturated.</li>
  <li>
    Conditional disaggregation routes prefill using configurable thresholds. The thresholds consider the
    <Term id="input-sequence-length">input sequence length (ISL)</Term> that remains after the prefix cache, and the
    size of the prefill queue.
  </li>
  <li>
    KV transfer runs on NIXL, the NVIDIA Inference Xfer Library, which moves the cache from prefill to decode
    engines. A dedicated <Term id="kernel">kernel</Term> transposes KV blocks between layouts when the two engines use different Tensor
    Parallelism configurations.
  </li>
</ul>

<h2>Dynamic disaggregation</h2>
<p>
  Together these features enable <strong>dynamic disaggregation</strong>, in which the number of prefill and decode
  engines can be changed at runtime to follow shifts in incoming traffic. A morning of long document uploads can run
  with more prefill engines, and an afternoon of short chat turns can run with more decode engines, on the same
  pool of GPUs.
</p>
