<script module>
  export const pageConfig = { title: 'Attention Kernels and Caching' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Attention Kernels and Caching</h1>

<h2>Kernel selection</h2>

<p>
  Attention optimization starts with kernel selection. Test FlashAttention, DeepGEMM, CuTe, and
  CUTLASS kernels, and keep the ones that perform best for your model.
</p>

<h2>Caching</h2>

<p>
  Language models use the KV cache to accelerate attention. Video generation models use different
  caching patterns that reuse earlier model outputs. Reusing parts of the attention computation makes
  video generation 30 to 40 percent faster in practice.
</p>

<p>
  Specific methods change quickly with new research. Two fundamental approaches persist.
</p>

<div class="table-wrap">
  <table>
    <caption>Two approaches to caching in video generation</caption>
    <thead>
      <tr><th scope="col">Approach</th><th scope="col">What is cached</th><th scope="col">What is skipped</th></tr>
    </thead>
    <tbody>
      <tr><td>Timestep-based caching</td><td>Outputs of certain timesteps</td><td>Entire denoising steps</td></tr>
      <tr><td>Transformer-based caching</td><td>Hidden states inside the transformer</td><td>Layers within the transformer</td></tr>
    </tbody>
  </table>
</div>

<Callout type="warning">
  <p>
    Caching algorithms range from negligible quality loss to unusable output. Test each strategy
    carefully on your own model before you use it in production.
  </p>
</Callout>
