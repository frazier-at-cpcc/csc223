<script module>
  export const pageConfig = { title: 'Few-Step Image Generation Models' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Few-Step Image Generation Models</h1>

<p>
  The 30 to 50 denoising steps are the most time-consuming part of image generation. One optimization makes each
  step faster. A different optimization reduces the number of steps.
</p>

<p>
  <strong>Few-step image generation models</strong> are trained to create high-resolution images in eight or
  fewer denoising steps. They are 80 to 90 percent faster than standard image generation models without further
  optimization. Their output quality is noticeably lower.
</p>

<h2>Two ways to build a few-step model</h2>

<ul>
  <li><strong>Latent consistency:</strong> train a model to predict the target latent directly, then repeat the prediction two to four times to improve quality.</li>
  <li><strong>Step distillation:</strong> use adversarial distillation, progressive distillation, or both to train a student model that matches a many-step teacher in far fewer steps.</li>
</ul>

<Signal kind="recall" chapter={1} title="Two senses of distillation">
  <p>
    Chapter 1 defined <Term id="knowledge-distillation">knowledge distillation</Term>: a smaller student learns
    the output probability distributions of a larger teacher. <Term id="step-distillation">Step
    distillation</Term> keeps the teacher-and-student idea but changes the goal. The student is usually the same
    size as the teacher and learns to reach the teacher's image in fewer denoising steps. Both senses transfer
    behavior from a teacher, and the word distillation alone does not say which one is meant.
  </p>
</Signal>

<p>
  Step distillation is more common than latent consistency today. When a new image model such as FLUX or Qwen
  Image is released, the open image model community creates step-distilled versions alongside quality and style
  <Term id="lora">LoRAs</Term>.
</p>

<h2>When to choose a few-step model</h2>

<div class="ie-table-wrap" role="region" aria-label="Standard and few-step image models compared" use:scrollable>
  <table class="ie-table">
    <caption>Standard and few-step image models compared</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">Standard model</th><th scope="col">Few-step model</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Denoising steps</th><td>30 to 50</td><td>8 or fewer</td></tr>
      <tr><th scope="row">Speed</th><td>Baseline</td><td>80 to 90 percent faster</td></tr>
      <tr><th scope="row">Quality</th><td>Higher</td><td>Noticeably lower</td></tr>
      <tr><th scope="row">Best fit</th><td>Quality-sensitive work</td><td>Latency-sensitive work, such as interactive previews</td></tr>
    </tbody>
  </table>
</div>

<Signal kind="worked" title="Selecting a model against a latency budget">
  <p>
    A design tool must show a preview within 1.5 seconds. On the target <Term id="gpu">GPU</Term>, the standard model takes 3.0 seconds
    at 40 steps. Its step-distilled version runs 8 steps. Both models run with guidance enabled, so time scales with the step count.
  </p>
  <ol>
    <li>Scale the time by the step count: 3.0 seconds × 8 / 40 = 0.6 seconds. The few-step model fits the budget.</li>
    <li>Check whether fewer steps on the standard model would also fit. It would need 3.0 × steps / 40 ≤ 1.5, so 20 steps or fewer. A standard model trained for 30 to 50 steps loses far more quality at 20 steps than a model distilled for 8.</li>
    <li>Check the quality requirement. A preview tolerates lower quality, so the few-step model is the right choice. The final export can still use the standard model at 40 steps.</li>
  </ol>
</Signal>
