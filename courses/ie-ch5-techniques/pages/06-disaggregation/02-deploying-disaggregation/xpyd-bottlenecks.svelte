<script module>
  export const pageConfig = { title: 'xPyD Configurations and Bottlenecks' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>xPyD Configurations and Bottlenecks</h1>

<h2>xPyD notation</h2>
<p>
  Disaggregation rarely pairs one prefill engine with one decode engine. Real systems run several of each. The
  notation xPyD records the counts. For example, 5P3D means five prefill engines and three decode engines serve one
  model deployment together.
</p>

<h2>Bottlenecks and remedies</h2>
<p>Separating the phases creates two new places where a deployment can run short.</p>
<table class="ie-table">
  <caption>Bottlenecks introduced by disaggregation and their remedies</caption>
  <thead>
    <tr><th scope="col">Bottleneck</th><th scope="col">Symptom</th><th scope="col">Remedies</th></tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Prefill queue grows too large</th>
      <td><Term id="time-to-first-token">TTFT</Term> climbs while decode engines sit partly idle.</td>
      <td>Set a reasonable threshold for local prefill on the decode engines, and reconfigure xPyD at runtime to give prefill more engines.</td>
    </tr>
    <tr>
      <th scope="row">Decode engines run out of <Term id="kv-cache">KV cache</Term> under high load</th>
      <td>Decode engines evict or pause sequences, and <Term id="tokens-per-second">TPS</Term> drops, while the prefill queue stays short.</td>
      <td>
        <Term id="kv-cache-quantization">Quantize the KV cache</Term> and
        <Term id="kv-cache-offloading">offload KV cache</Term> blocks to other storage tiers.
      </td>
    </tr>
  </tbody>
</table>

<Signal kind="worked" title="Rebalancing a 4P4D deployment">
  <p>
    A deployment runs 4P4D on eight engines. During a surge of long documents, the prefill queue grows past 300
    requests and TTFT triples. The decode engines run at 55 percent utilization.
  </p>
  <ol>
    <li>Diagnose: the queue sits in front of prefill, and decode has spare capacity, so prefill is the bottleneck.</li>
    <li>Rebalance: move one engine from decode to prefill, giving 5P3D on the same eight engines.</li>
    <li>
      Check decode: the same decode load now spreads over three engines instead of four, so utilization rises to
      about 55 × 4 ÷ 3 ≈ 73 percent. Decode still has headroom.
    </li>
    <li>Check prefill: five engines drain the queue 25 percent faster than four.</li>
  </ol>
  <p>
    If decode utilization had been near 90 percent, removing a decode engine would have moved the bottleneck
    instead of relieving it. The deployment would then need more engines in total, not a different split.
  </p>
</Signal>
