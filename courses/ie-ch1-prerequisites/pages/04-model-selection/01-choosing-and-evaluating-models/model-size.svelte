<script module>
  export const pageConfig = { title: 'Model Size Drives Performance' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Model Size Drives Performance</h1>

<p>
  A model's size is its count of <Term id="parameter">parameters</Term>, the learned numbers stored in its <Term id="weights">weights</Term>.
  Hold everything else equal: the hardware, the runtime, the optimizations, and the architecture.
  Under those conditions, inference on a smaller model with fewer parameters is faster and cheaper than inference on a larger model.
</p>

<p>
  A smaller model has fewer weights to store and fewer weights to read on every <Term id="forward-pass">forward pass</Term>.
  For this reason, the most important decision in model performance optimization is not the <Term id="inference-engine">inference engine</Term> or the <Term id="speculative-decoding">speculative decoding</Term> method.
  The most important decision is which model to run in the first place.
</p>

<h2>Advice that flips with the product stage</h2>

<div class="ie-table-wrap" role="region" aria-label="Model selection advice by product stage" use:scrollable>
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
        <td>Use prebuilt pay-per-token APIs for powerful frontier models. In 2025, the book named open-weight frontier models such as Kimi and DeepSeek and <Term id="closed-model">closed models</Term> such as GPT and Gemini. Running your own inference is not worth the time or money yet.</td>
      </tr>
      <tr>
        <th scope="row">Scaling</th>
        <td>Find or create the smallest, easiest-to-run model that is smart enough for the task. Many tasks still need a frontier model with around a trillion parameters, but a smaller, cheaper, faster model is always worth testing.</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  A <dfn><strong>frontier model</strong></dfn> is one of the most capable models available at a given time.
  The list of frontier models changes every few months, so the names in the table are examples from the book's publication, not a current ranking.
</p>

<h2>Architecture affects available optimizations</h2>

<p>
  The chosen model also determines which inference optimizations are available.
  A model's architecture is the arrangement of its layers and operations, which Chapter 2 describes.
  Inference engines differ in how deeply they support each model architecture.
</p>

<Callout type="tip">
  <p>Prefer popular model architectures. Popular architectures receive robust support across the performance tooling landscape.</p>
</Callout>
