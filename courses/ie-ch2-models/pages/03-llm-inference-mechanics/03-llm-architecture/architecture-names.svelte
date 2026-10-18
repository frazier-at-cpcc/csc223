<script module>
  export const pageConfig = { title: 'Model Architectures and config.json' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Model Architectures and config.json</h1>

<p>
  Every <Term id="llm">LLM</Term> on <Term id="hugging-face">Hugging Face</Term>, the largest repository of open models, includes a
  <code>config.json</code> file. This file runs a few dozen lines and details the model's architecture.
</p>

<h2>What an architecture is</h2>

<p>
  A model's <strong>architecture</strong> is the set of decisions made during training about the nature
  and shape of each component of the model. One architecture can cover many models:
</p>

<ul>
  <li><strong>Multiple sizes:</strong> models at different <Term id="parameter">parameter</Term> counts, such as Llama 8B and Llama 70B.</li>
  <li><strong>Multiple variants:</strong> the base and instruct variants of a model share one architecture.</li>
  <li><strong>Unlimited fine-tunes:</strong> <Term id="fine-tuning">fine-tuning</Term> methods such as <Term id="lora">LoRA</Term> change a model's behavior, not its architecture.</li>
</ul>

<p>
  Architecture determines runtime and inference engine support. A model of an architecture that a team
  already serves keeps the same <Term id="kernel">kernel</Term> and engine support. Its size can still demand different parallelism
  and memory settings, so Llama 8B and Llama 70B share an architecture but not a deployment plan.
</p>

<h2>Reading an architecture name</h2>

<p>The architecture name is one of the first lines in most configuration files.</p>

<pre><code>"architectures": ["Qwen3MoeForCausalLM"]</code></pre>

<div class="ie-table-wrap" role="region" aria-label="The parts of the name Qwen3MoeForCausalLM" use:scrollable>
  <table class="ie-table">
    <caption>The parts of the name Qwen3MoeForCausalLM</caption>
    <thead>
      <tr><th scope="col">Part</th><th scope="col">Meaning</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><code>Qwen</code></th><td>The model family, or brand name</td></tr>
      <tr><th scope="row"><code>3</code></th><td>The major version of the architecture within the family</td></tr>
      <tr><th scope="row"><code>Moe</code></th><td>A <Term id="mixture-of-experts">Mixture of Experts</Term> model, covered later in this section</td></tr>
      <tr><th scope="row"><code>CausalLM</code></th><td>A causal language model</td></tr>
    </tbody>
  </table>
</div>

<p>
  A <strong>causal language model</strong> predicts the next <Term id="token">token</Term> in a sequence from the previous
  tokens. A <Term id="masked-language-model">masked language model</Term> works differently. It fills in a
  blank using the tokens on both its left and its right. As of early 2026, nearly all production LLMs are
  causal language models. Diffusion language models, which refine a whole sequence at once, remain a
  research direction.
</p>

<p>
  Beyond the name, <code>config.json</code> describes the nature and dimensions of the layers that form
  the model's neural networks. It also describes the vectors that pass through those layers during
  inference.
</p>
