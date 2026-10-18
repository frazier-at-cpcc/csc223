<script module>
  export const pageConfig = { title: 'Attention Kernels and Caching' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Attention Kernels and Caching</h1>

<h2>Kernel selection</h2>

<p>
  Attention optimization starts with kernel selection. Test <Term id="flashattention">FlashAttention</Term>,
  DeepGEMM, CuTe, and <Term id="cutlass">CUTLASS</Term> kernels, and keep the ones that perform best for
  your model.
</p>

<h2>Caching</h2>

<p>
  Language models use the <Term id="kv-cache">KV cache</Term> to avoid recomputing the keys and values of
  earlier tokens. Video generation models use different caching patterns that reuse earlier model
  outputs across denoising steps. Reusing parts of the attention computation makes video generation 30
  to 40 percent faster in practice.
</p>
<p>
  Specific methods change quickly with new research. Two fundamental approaches persist. Their names
  use <strong>timestep</strong>, the diffusion literature's name for a denoising step.
</p>

<div class="table-wrap" role="region" aria-label="Two approaches to caching in video generation" use:scrollable>
  <table>
    <caption>Two approaches to caching in video generation</caption>
    <thead>
      <tr><th scope="col">Approach</th><th scope="col">What is cached</th><th scope="col">What is skipped</th></tr>
    </thead>
    <tbody>
      <tr><td>Timestep-based caching</td><td>Outputs of certain denoising steps</td><td>Entire denoising steps</td></tr>
      <tr>
        <td>Transformer-based caching</td>
        <td><Term id="hidden-state">Hidden states</Term> inside the transformer</td>
        <td>Layers within the transformer, inside one step</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Both approaches rely on the same observation that drives guidance truncation: adjacent denoising
  steps change the latent only a little, especially late in the run. Reusing a recent result costs far
  less than recomputing attention over a long video sequence.
</p>

<Callout type="warning">
  <p>
    Caching algorithms range from negligible quality loss to unusable output. Test each strategy
    carefully on your own model and prompts before you use it in production.
  </p>
</Callout>
