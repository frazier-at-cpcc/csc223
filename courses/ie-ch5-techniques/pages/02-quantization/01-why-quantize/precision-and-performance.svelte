<script module>
  export const pageConfig = { title: 'Precision and Performance' };
</script>

<h1>Precision and Performance</h1>

<p>
  Models are trained with weights, activations, and other values stored in a native number format. The native
  format is usually BF16 or FP16. Training in 8-bit and 4-bit native precision is becoming more common.
</p>
<p>
  <strong>Post-training quantization</strong> lowers the precision of weights, activations, and potentially the KV
  cache from the native format to a lower-precision format. The goal is to reduce the compute and memory bandwidth
  that inference demands.
</p>

<h2>Both phases of inference get faster</h2>
<p>Cutting precision in half helps prefill and decode for different reasons.</p>
<table class="ie-table">
  <caption>Effect of halving precision on each phase of inference</caption>
  <thead>
    <tr><th scope="col">Phase</th><th scope="col">Bottleneck</th><th scope="col">Effect of halving precision</th></tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Prefill</th>
      <td>Compute</td>
      <td>Matrix math runs on lower-precision Tensor Cores that deliver twice the FLOPS.</td>
    </tr>
    <tr>
      <th scope="row">Decode</th>
      <td>Memory bandwidth</td>
      <td>Each value takes half as many bytes to load, which effectively doubles memory bandwidth.</td>
    </tr>
  </tbody>
</table>

<h2>The gain is less than double</h2>
<p>
  Working with quantized data adds overhead, so moving from 16 bits to 8 bits does not make inference twice as
  fast. In practice, quantizing an LLM down one level of precision yields 30 to 50 percent better performance.
</p>
<p>
  Quantization improves time to first token (TTFT) and tokens per second (TPS), and it increases system
  throughput. It also frees headroom that makes disaggregation, speculation, and prefix caching more effective. The
  cost is risk: a poorly executed quantization can materially reduce output quality.
</p>
