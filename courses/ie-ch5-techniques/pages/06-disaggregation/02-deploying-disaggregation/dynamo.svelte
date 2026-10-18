<script module>
  export const pageConfig = { title: 'Dynamic Disaggregation with NVIDIA Dynamo' };
</script>

<h1>Dynamic Disaggregation with NVIDIA Dynamo</h1>

<p>
  NVIDIA Dynamo provides production-ready support for disaggregation and handles mixed real-world traffic. It
  includes developer tools and prebuilt optimizations.
</p>
<ul>
  <li>A prefill queue holds requests when every prefill engine is saturated.</li>
  <li>
    Conditional disaggregation routes prefill using configurable thresholds. The thresholds consider the input
    sequence length (ISL) that remains after the prefix cache, and the size of the prefill queue.
  </li>
  <li>
    NIXL-based KV transfer moves the cache from prefill to decode engines. A dedicated kernel transposes KV blocks
    between layouts when the two engines use different Tensor Parallelism configurations.
  </li>
</ul>
<p>
  Together these features enable <strong>dynamic disaggregation</strong>, in which the number of prefill and decode
  engines can be changed at runtime to follow shifts in incoming traffic.
</p>

<h2>xPyD notation</h2>
<p>
  Disaggregation rarely pairs one prefill engine with one decode engine. Real systems run several of each. The
  notation xPyD records the counts. For example, 5P3D means five prefill engines and three decode engines serve one
  model deployment together.
</p>

<h2>New bottlenecks</h2>
<table class="ie-table">
  <caption>Bottlenecks introduced by disaggregation and their remedies</caption>
  <thead>
    <tr><th scope="col">Bottleneck</th><th scope="col">Remedies</th></tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Prefill queue grows too large</th>
      <td>Set a reasonable threshold for local prefill on the decode engine, and reconfigure xPyD at runtime to give prefill more engines.</td>
    </tr>
    <tr>
      <th scope="row">Decode engines run out of KV cache under high load</th>
      <td>Quantize the KV cache and offload KV cache to other storage tiers.</td>
    </tr>
  </tbody>
</table>
