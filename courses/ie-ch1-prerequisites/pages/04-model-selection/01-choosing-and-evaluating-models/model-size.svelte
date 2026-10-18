<script module>
  export const pageConfig = { title: 'Model Size Drives Performance' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Model Size Drives Performance</h1>

<p>
  Hold everything else equal: the hardware, the runtime, the optimizations, and the architecture.
  Under those conditions, inference on a smaller model with fewer parameters is faster and cheaper than inference on a larger model.
</p>
<p>
  For this reason, the most important decision in model performance optimization is not the inference engine or the speculation algorithm.
  The most important decision is which model to run in the first place.
</p>

<h2>Advice that flips with the product stage</h2>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Model selection advice by product stage</caption>
    <thead>
      <tr>
        <th scope="col">Stage</th>
        <th scope="col">Recommended approach</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Before product-market fit</th>
        <td>Use prebuilt pay-per-token APIs for powerful frontier models, such as Kimi and DeepSeek, or closed models, such as GPT and Gemini. Running your own inference is not worth the time or money yet.</td>
      </tr>
      <tr>
        <th scope="row">Scaling</th>
        <td>Find or create the smallest, easiest-to-run model that is smart enough for the task. Many tasks still need a trillion-parameter frontier model, but a smaller, cheaper, faster model is always worth testing.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Architecture affects available optimizations</h2>

<p>
  The chosen model also determines which inference optimizations are available.
  Inference engines differ in how deeply they support each model architecture.
</p>

<Callout type="tip">
  <p>Prefer popular model architectures. Popular architectures receive robust support across the performance tooling landscape.</p>
</Callout>
