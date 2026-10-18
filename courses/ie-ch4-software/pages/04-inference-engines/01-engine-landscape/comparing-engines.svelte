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

<h2>A principle behind the table</h2>

<p>
  A core principle of inference engineering holds that more constraints allow
  better performance. A broad engine must work across many models and many
  types of hardware. A narrow engine can specialize for one vendor's hardware and
  extract more from it. The performance row of the table reflects this tradeoff.
</p>

<h2>Four questions for choosing an engine</h2>

<p>Work through four questions in order. Each one can rule an engine out.</p>

<ol>
  <li>Hardware: which accelerators will the deployment run on?</li>
  <li>Model support: does each candidate engine support this model's architecture today?</li>
  <li>Performance need: does the workload need peak performance, or does good performance meet its targets?</li>
  <li>Engineering effort: how much time and expertise can the team spend on setup and tuning?</li>
</ol>

<Signal kind="worked" title="Selecting an engine for a high-volume API">
  <p>
    A company serves one open dense LLM through a public API. Traffic is heavy and
    steady, and cost per token is the company's main metric. The fleet is NVIDIA
    B200 GPUs. The model's architecture is a year old and well supported. The
    inference team includes engineers who have tuned engines before, and the
    company plans to add NVIDIA Dynamo next year.
  </p>
  <ol>
    <li>
      Hardware. The fleet is NVIDIA Blackwell, which all three engines support.
      Nothing is ruled out yet.
    </li>
    <li>
      Model support. The architecture is mature, so all three engines support it.
      Day-zero breadth, the main advantage of vLLM and SGLang, does not matter here.
    </li>
    <li>
      Performance need. At heavy, steady volume, a few percent of throughput
      becomes a large cost saving. Peak performance matters, which favors
      TensorRT-LLM and its NVIDIA-written kernels for the newest architectures.
    </li>
    <li>
      Engineering effort. The team can absorb TensorRT-LLM's steeper learning
      curve, and the planned Dynamo rollout favors the engine that Dynamo
      integrates most deeply.
    </li>
  </ol>
  <p>
    Decision: TensorRT-LLM. vLLM is rejected because its strength, breadth of
    models and hardware, buys nothing for one mature model on one vendor's GPUs.
    SGLang is a strong runner-up, so the team benchmarks both engines on
    production-shaped traffic before committing, using the method in Section 06.
  </p>
</Signal>

<Callout type="info">
  <p>
    The author's company, Baseten, uses all three engines and relies on
    TensorRT-LLM most often. The book recommends that inference engineers learn
    all three and choose one for each deployment based on its needs.
  </p>
</Callout>
