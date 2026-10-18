<script module>
  export const pageConfig = { title: 'Model Architectures and config.json' };
</script>

<h1>Model Architectures and config.json</h1>

<p>
  Every LLM on Hugging Face, the largest repository of open models, includes a
  <code>config.json</code> file. This file runs a few dozen lines and details the model's architecture.
</p>

<h2>What an architecture is</h2>

<p>
  A model's <strong>architecture</strong> is the set of decisions made during training about the nature
  and shape of each component of the model. One architecture can cover many models:
</p>

<ul>
  <li><strong>Multiple sizes:</strong> models at different parameter counts, such as Llama 8B and Llama 70B.</li>
  <li><strong>Multiple variants:</strong> the base and instruct variants of a model share one architecture.</li>
  <li><strong>Unlimited fine-tunes:</strong> methods such as LoRA (Low-Rank Adaptation) change a model's behavior, not its architecture.</li>
</ul>

<p>
  Architecture determines runtime and inference engine support. A team with a highly optimized
  deployment of one architecture can deploy another model of the same architecture and keep the same
  performance improvements.
</p>

<h2>Reading an architecture name</h2>

<p>The architecture name is one of the first lines in most configuration files.</p>

<pre><code>"architectures": ["Qwen3MoeForCausalLM"]</code></pre>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The parts of the name Qwen3MoeForCausalLM</caption>
    <thead>
      <tr><th scope="col">Part</th><th scope="col">Meaning</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><code>Qwen</code></th><td>The model family, or brand name</td></tr>
      <tr><th scope="row"><code>3</code></th><td>The major version of the architecture within the family</td></tr>
      <tr><th scope="row"><code>Moe</code></th><td>A Mixture of Experts model, covered later in this section</td></tr>
      <tr><th scope="row"><code>CausalLM</code></th><td>A causal language model</td></tr>
    </tbody>
  </table>
</div>

<p>
  A <strong>causal language model</strong> predicts the next token in a sequence from the previous
  tokens. A masked language model works differently. It fills in a blank using the tokens on both its
  left and its right. All generative LLMs today are causal language models.
</p>

<p>
  Beyond the name, <code>config.json</code> describes the nature and dimensions of the layers that form
  the model's neural networks. It also describes the vectors that pass through those layers during
  inference.
</p>
