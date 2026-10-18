<script module>
  export const pageConfig = { title: 'Sizing VRAM for a Model' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Sizing VRAM for a Model</h1>

<p>Total VRAM limits the size of the model a GPU can serve. Sizing starts with the weights.</p>

<h2>Step 1: weight memory</h2>
<p>
  Each <Term id="parameter">parameter</Term> occupies a fixed number of bytes set by its
  <Term id="precision">precision</Term>. Weight memory therefore follows one formula:
</p>
<p><code>weight memory (GB) = parameters (billions) × bytes per parameter</code></p>
<div class="ie-table-wrap" role="region" aria-label="Bytes per parameter at common precisions" use:scrollable>
  <table class="ie-table">
    <caption>Bytes per parameter at common precisions</caption>
    <thead>
      <tr><th scope="col">Precision</th><th scope="col">Bytes per parameter</th><th scope="col">70 billion parameters occupy</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">FP16 or BF16</th><td>2</td><td>140 GB</td></tr>
      <tr><th scope="row">FP8</th><td>1</td><td>70 GB</td></tr>
      <tr><th scope="row">FP4</th><td>0.5</td><td>35 GB</td></tr>
    </tbody>
  </table>
</div>
<p>This chapter uses 1 GB = 10<sup>9</sup> bytes, so one billion parameters at one byte each occupy one gigabyte.</p>

<h2>Step 2: the planning factor</h2>
<p>
  VRAM must also hold <Term id="kv-cache-headroom" />: room for the <Term id="kv-cache">KV cache</Term>, the
  activations, and the runtime's own overhead. The series expresses that room as a
  <strong>planning factor</strong>, a multiplier on weight memory:
</p>
<p><code>minimum VRAM = planning factor × weight memory</code></p>
<p>
  Use a planning factor of at least 1.5, which reserves headroom equal to half the weight size. Long contexts,
  many concurrent requests, and video generation models need more. Chapter 5's Sizing and Strategy lesson
  raises the factor to 1.8 for long-context, high-concurrency production workloads.
</p>

<h2>What happens when VRAM runs short</h2>
<ul>
  <li>If VRAM cannot hold the weights, loading the model fails with an <Term id="out-of-memory">out-of-memory (OOM) error</Term>.</li>
  <li>If VRAM holds the weights but lacks headroom, inference runs slowly or crashes with an OOM error.</li>
</ul>

<Signal kind="worked" title="A 32-billion-parameter model in FP16">
  <ol class="ie-steps">
    <li>Weight memory: 32 billion parameters × 2 bytes = 64 GB.</li>
    <li>Minimum VRAM: 1.5 × 64 GB = 96 GB.</li>
    <li>
      Compare against candidate GPUs. One 80 GB H100 falls short of 96 GB, although it can load the weights.
      One 141 GB H200 meets the minimum. Two H100s, with 160 GB together, also meet it.
    </li>
  </ol>
</Signal>

<Signal kind="mistake" title="Reading parameters as gigabytes">
  <p>
    The shortcut "one billion parameters is one gigabyte" holds only at one byte per parameter, which is <Term id="fp8">FP8</Term>. At
    FP16 the same model needs twice as much memory, and at <Term id="fp4">FP4</Term> it needs half. Always multiply by the bytes per
    parameter before you apply the planning factor.
  </p>
</Signal>

<h2>Faded example: a 24-billion-parameter model in FP8</h2>
<p>Step 1 is done: 24 billion parameters × 1 byte = 24 GB of weights.</p>
<NumericQuestion
  id="vram_faded"
  question="Step 2: apply a planning factor of 1.5. What is the minimum VRAM for this model?"
  answer={36}
  unit="GB"
  correctFeedback="Correct. 1.5 × 24 GB = 36 GB, so a 48 GB GPU meets the minimum and a 24 GB GPU does not."
  incorrectFeedback="Multiply the weight memory by the planning factor: 1.5 × 24 GB = 36 GB."
/>

<h2>Practice: minimum VRAM</h2>

<p class="ie-obj">Objective 4: Calculate the minimum VRAM for a model</p>
<NumericQuestion
  id="vram_practice_1"
  question="A model has 13 billion parameters stored in FP16. Using a planning factor of 1.5, what is the minimum VRAM?"
  answer={39}
  unit="GB"
  correctFeedback="Correct. Weights: 13 × 2 = 26 GB. Minimum VRAM: 1.5 × 26 = 39 GB."
  incorrectFeedback="Find the weights first: 13 billion × 2 bytes = 26 GB. Then apply the factor: 1.5 × 26 GB = 39 GB."
/>

<p class="ie-obj">Objective 4: Calculate the minimum VRAM for a model</p>
<NumericQuestion
  id="vram_practice_2"
  question="A model has 120 billion parameters quantized to FP4. Using a planning factor of 1.5, what is the minimum VRAM?"
  answer={90}
  unit="GB"
  correctFeedback="Correct. FP4 uses half a byte per parameter: 120 × 0.5 = 60 GB of weights. Minimum VRAM: 1.5 × 60 = 90 GB."
  incorrectFeedback="FP4 uses 0.5 bytes per parameter, so the weights occupy 120 × 0.5 = 60 GB. Then 1.5 × 60 GB = 90 GB."
/>
