<script module>
  export const pageConfig = { title: 'Video Generation Costs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Accordion, AccordionItem } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Video Generation Costs</h1>

<p>Whole-video denoising sets four operating constraints:</p>

<ul>
  <li>Videos have a fixed number of frames, in the same way that image models have fixed aspect ratios. As of late 2025, modern models create clips of a few seconds.</li>
  <li>Compute limits video length. Attention over a massive latent is extremely expensive and takes several seconds of inference per second of video.</li>
  <li>Video models typically run with a <Term id="batch-size">batch size</Term> of one. A full node of eight <Term id="gpu">GPUs</Term> works on a single request.</li>
  <li>The number of steps matches image models, generally around 50. Each step is far more expensive.</li>
</ul>

<h2>Video models compared with early LLMs</h2>

<p>Video generation is a recent modality. Its limitations in late 2025 resembled the limitations of <Term id="llm">LLMs</Term> two years earlier.</p>

<div class="ie-table-wrap" role="region" aria-label="Limitations of LLMs in late 2023 and of video generation models in late 2025" use:scrollable>
  <table class="ie-table">
    <caption>Limitations of LLMs in late 2023 and of video generation models in late 2025</caption>
    <thead>
      <tr><th scope="col">LLMs (late 2023)</th><th scope="col">Video generation models (late 2025)</th></tr>
    </thead>
    <tbody>
      <tr><td>High <Term id="time-to-first-token">time to first token</Term>, low <Term id="token">tokens</Term> per second</td><td>Slow generation times</td></tr>
      <tr><td>Frequent hallucinations</td><td>Unrealistic physics</td></tr>
      <tr><td>Maxed out Ampere GPUs, the A100 generation</td><td>Max out <Term id="blackwell">Blackwell</Term> GPUs</td></tr>
      <tr><td>Limited <Term id="context-window">context windows</Term></td><td>Short video outputs</td></tr>
    </tbody>
  </table>
</div>

<p>
  As of early 2026, LLMs have largely moved past these limitations. Removing them from video generation is a
  highly active research area. The research directions below are context beyond this chapter's objectives.
</p>

<Accordion>
  <AccordionItem title="Research direction: world models and 3D generation">
    <p>
      World models, 3D object generation, and other generative rendering models face the same attention cost.
      3D generation works across X, Y, and Z rather than X, Y, and T.
    </p>
  </AccordionItem>
  <AccordionItem title="Research direction: autoregressive video">
    <p>
      One research direction returns to autoregressive generation. Techniques such as Self Forcing combine a
      global view of quality with an iterative approach to generation, which avoids the error accumulation of
      pure framewise generation. Autoregressive components partially relieve the attention bottleneck, but
      attention remains the most important and expensive part of video inference.
    </p>
  </AccordionItem>
</Accordion>
