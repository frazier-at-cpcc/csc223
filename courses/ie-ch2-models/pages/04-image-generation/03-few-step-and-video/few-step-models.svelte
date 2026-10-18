<script module>
  export const pageConfig = { title: 'Few-Step Image Generation Models' };
</script>

<h1>Few-Step Image Generation Models</h1>

<p>
  The 30 to 50 denoising steps are the most time-consuming part of image generation. One optimization
  makes each step faster. A different optimization reduces the number of steps.
</p>

<p>
  <strong>Few-step image generation models</strong> are trained to create high-resolution images in
  eight or fewer denoising steps. They are 80 to 90 percent faster than traditional image generation
  models without further optimization. Their output quality is noticeably lower.
</p>

<h2>Two ways to build a few-step model</h2>

<ul>
  <li><strong>Latent consistency:</strong> train a model to predict the target latent directly, then repeat the prediction two to four times to improve quality.</li>
  <li><strong>Distillation:</strong> use adversarial distillation, progressive distillation, or both to train a small student model to emulate a larger teacher model in fewer steps.</li>
</ul>

<p>
  Distillation is more common than latent consistency today. When a new image model such as FLUX or
  Qwen Image is released, the open image model community creates distillations alongside quality and
  style LoRAs.
</p>

<h2>When to choose a few-step model</h2>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Standard and few-step image models compared</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">Standard model</th><th scope="col">Few-step model</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Denoising steps</th><td>30 to 50</td><td>8 or fewer</td></tr>
      <tr><th scope="row">Speed</th><td>Baseline</td><td>80 to 90 percent faster</td></tr>
      <tr><th scope="row">Quality</th><td>Higher</td><td>Noticeably lower</td></tr>
      <tr><th scope="row">Best fit</th><td>Quality-sensitive work</td><td>Latency-sensitive work such as real-time generative filters</td></tr>
    </tbody>
  </table>
</div>
