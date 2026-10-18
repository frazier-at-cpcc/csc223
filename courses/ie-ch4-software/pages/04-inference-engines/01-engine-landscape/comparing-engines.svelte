<script module>
  export const pageConfig = { title: 'Comparing the Three Engines' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Comparing the Three Engines</h1>

<p>
  At a high level, <Term id="vllm" /> and <Term id="sglang" /> are general tools. They are
  easier to adopt and offer day-zero support, meaning support on a model's release
  day, for more models. <Term id="tensorrt-llm" /> has a steeper learning curve but
  usually achieves the best performance.
</p>

<div class="table-wrap" role="region" aria-label="Inference engine comparison, as summarized in the book at the time of publication (2025)" use:scrollable>
<table class="data">
  <caption>Inference engine comparison, as summarized in the book at the time of publication (2025)</caption>
  <thead>
    <tr>
      <th scope="col">Engine</th>
      <th scope="col">vLLM</th>
      <th scope="col">SGLang</th>
      <th scope="col">TensorRT-LLM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Performance</th>
      <td>Good</td>
      <td>Good</td>
      <td>Best</td>
    </tr>
    <tr>
      <th scope="row">Ease of use</th>
      <td>Easy</td>
      <td>Easy</td>
      <td>Hard</td>
    </tr>
    <tr>
      <th scope="row">Model support</th>
      <td>Most</td>
      <td>Most</td>
      <td>Some</td>
    </tr>
    <tr>
      <th scope="row">Hardware</th>
      <td>NVIDIA, AMD, and Intel GPUs, plus Google TPUs</td>
      <td>NVIDIA and AMD GPUs</td>
      <td>NVIDIA GPUs only</td>
    </tr>
    <tr>
      <th scope="row">License</th>
      <td>Apache 2.0</td>
      <td>Apache 2.0</td>
      <td>Apache 2.0</td>
    </tr>
  </tbody>
</table>
</div>

<Callout type="info">
  <p>
    Hardware support changes faster than any other row. The SGLang team announced
    a TPU backend, SGLang-Jax, in late 2025, after the book went to press. Check
    each engine's current documentation before you rule an engine in or out on
    hardware. TensorRT-LLM is NVIDIA's own engine, so its NVIDIA-only support is
    a durable property.
  </p>
</Callout>

<h2>More constraints allow better performance</h2>

<p>
  A core principle of inference engineering holds that more constraints allow
  better performance. A broad engine must work across many models and many
  types of hardware. A narrow engine can specialize for one vendor's hardware and
  extract more from it. The performance row of the table reflects this tradeoff.
</p>
