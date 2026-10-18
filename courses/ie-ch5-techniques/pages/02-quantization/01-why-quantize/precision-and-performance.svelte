<script module>
  export const pageConfig = { title: 'Precision and Performance' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Precision and Performance</h1>

<p>
  Models are trained with <Term id="weights">weights</Term>, <Term id="activations">activations</Term>, and other values stored in a native
  number format. The <strong>native format</strong> is the format a model was trained and released in, usually
  <Term id="bf16" /> or FP16. Training in 8-bit and 4-bit native precision is becoming more common.
</p>
<p>
  <strong>Post-training quantization</strong> lowers the precision of weights, activations, and potentially the
  <Term id="kv-cache" /> from the native format to a lower-precision format. The goal is to reduce the compute and
  memory bandwidth that inference demands.
</p>

<Signal kind="recall" chapter={2} title="Two bottlenecks">
  <p>
    <Term id="prefill">Prefill</Term> processes the whole prompt at once and is <Term id="compute-bound">compute bound</Term>. <Term id="decode">Decode</Term> reads
    every weight from memory to produce each token and is <Term id="memory-bound">memory bound</Term>. Lower
    precision relieves each bottleneck in a different way.
  </p>
</Signal>

<h2>Effect on prefill and decode</h2>
<div class="ie-table-wrap" role="region" aria-label="Effect of halving precision on each phase of inference" use:scrollable>
  <table class="ie-table">
    <caption>Effect of halving precision on each phase of inference</caption>
    <thead>
      <tr><th scope="col">Phase</th><th scope="col">Bottleneck</th><th scope="col">Effect of halving precision</th><th scope="col">What must be quantized</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Prefill</th>
        <td>Compute</td>
        <td>Matrix math runs on lower-precision <Term id="tensor-core">Tensor Cores</Term> that deliver twice the <Term id="flops" />.</td>
        <td>Weights and activations, because both operands of the matrix multiplication must be in the lower format</td>
      </tr>
      <tr>
        <th scope="row">Decode</th>
        <td><Term id="memory-bandwidth">Memory bandwidth</Term></td>
        <td>Each value takes half as many bytes to load, which effectively doubles memory bandwidth.</td>
        <td>Weights alone are enough, because weight reads dominate decode</td>
      </tr>
    </tbody>
  </table>
</div>

<Signal kind="mistake" title="Expecting weights-only quantization to speed up prefill">
  <p>
    Quantizing only the weights halves the bytes that decode reads, so it speeds up decode. It does not move prefill
    onto faster Tensor Core math, because the activations stay at the higher precision. A team that needs a lower
    time to first token must quantize activations as well.
  </p>
</Signal>

<h2>Size of the performance gain</h2>
<p>
  Working with quantized data adds overhead, so moving from 16 bits to 8 bits does not make inference twice as
  fast. In practice, quantizing an LLM down one level of precision yields 30 to 50 percent better performance.
</p>
<p>
  Quantization improves <Term id="time-to-first-token">time to first token (TTFT)</Term> and <Term id="tokens-per-second">tokens per second</Term>
  (TPS), and it increases system <Term id="throughput">throughput</Term>. It also frees memory that makes <Term id="disaggregation">disaggregation</Term>,
  speculation, and <Term id="prefix-caching">prefix caching</Term> more effective. The cost is risk. A poorly executed quantization can materially
  reduce output quality.
</p>
