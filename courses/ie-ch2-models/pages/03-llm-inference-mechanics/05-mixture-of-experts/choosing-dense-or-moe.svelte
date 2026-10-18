<script module>
  export const pageConfig = { title: 'Choosing Dense or Mixture of Experts' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Choosing Dense or Mixture of Experts</h1>

<p>
  A fair comparison of a dense model and an MoE model looks at memory and compute separately. Memory follows
  the total parameter count. Compute per token follows the active count, at about 2 floating-point operations
  per active parameter.
</p>

<Signal kind="worked" title="Qwen3-235B-A22B against a dense 70-billion-parameter model, both in FP16">
  <div class="ie-table-wrap" role="region" aria-label="Weight memory and compute per token" use:scrollable>
    <table class="ie-table">
      <caption>Weight memory and compute per token</caption>
      <thead>
        <tr><th scope="col">Quantity</th><th scope="col">Qwen3-235B-A22B (MoE)</th><th scope="col">Dense 70B</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">Weight memory, parameters × 2 bytes</th><td>235 × 10<sup>9</sup> × 2 = 470 GB</td><td>70 × 10<sup>9</sup> × 2 = 140 GB</td></tr>
        <tr><th scope="row">Compute per token, active parameters × 2</th><td>22 × 10<sup>9</sup> × 2 = 44 GFLOPs</td><td>70 × 10<sup>9</sup> × 2 = 140 GFLOPs</td></tr>
      </tbody>
    </table>
  </div>
  <p>
    The MoE model needs about 3.4 times the memory but about one third of the compute per token. It suits a
    deployment with enough GPU memory and a need for fast, high-quality tokens. A team that budgeted memory from
    the 22 billion active parameters would plan 44 GB and fall short by more than 400 GB.
  </p>
</Signal>

<h2>When dense models are the better fit</h2>

<ul>
  <li>As of early 2026, MoE architectures are most common for models with more than 100 billion parameters. Some MoE models are as small as 20 to 30 billion parameters.</li>
  <li>Models under 32 billion parameters, and especially models under 8 billion parameters, usually use dense architectures efficiently.</li>
  <li>Domain-specific models, such as code tab-completion models, gain little from MoE. The entire model is effectively one expert.</li>
  <li>A deployment with tight memory and light traffic often prefers a dense model, because an MoE model of equal quality occupies more <Term id="vram">VRAM</Term>.</li>
</ul>
