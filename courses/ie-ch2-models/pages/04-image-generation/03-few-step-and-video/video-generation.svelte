<script module>
  export const pageConfig = { title: 'Video Generation' };
</script>

<h1>Video Generation</h1>

<p>
  Video generation models are architecturally similar to image generation models, only bigger. They have
  three to five times more parameters, and they encode ten to one hundred times more information in
  latent space.
</p>

<h2>Framewise generation and error accumulation</h2>

<p>
  The naive approach generates a video frame by frame. Early video models generated a starting frame,
  used it to generate the next frame, and continued in sequence. This framewise approach suffers from
  <strong>error accumulation</strong>. Small issues in early frames compound in every later frame, and
  the video quickly goes off the rails.
</p>

<h2>Whole-video denoising</h2>

<p>
  Modern video models hold the entire video in latent space and modify all of it on each denoising step.
  Every frame attends to every other frame and is updated on every forward pass. An image latent has two
  physical dimensions, X and Y. A video latent has three: X, Y, and T for time.
</p>

<ul>
  <li>Videos have a fixed number of frames, in the same way that image models have fixed aspect ratios. Modern models create clips of a few seconds.</li>
  <li>Compute limits video length. Attention over a massive latent is extremely expensive and takes several seconds of inference per second of video.</li>
  <li>Video models typically run with a batch size of one. A full node of eight GPUs works on a single request.</li>
  <li>The number of steps matches image models, generally around 50. Each step is far more expensive.</li>
</ul>

<h2>Video models compared with early LLMs</h2>

<p>Video generation is a recent modality. Its current limitations resemble the limitations of LLMs two years earlier.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Limitations of LLMs in late 2023 and of video generation models in late 2025</caption>
    <thead>
      <tr><th scope="col">LLMs (late 2023)</th><th scope="col">Video generation models (late 2025)</th></tr>
    </thead>
    <tbody>
      <tr><td>High time to first token, low tokens per second</td><td>Slow generation times</td></tr>
      <tr><td>Frequent hallucinations</td><td>Unrealistic physics</td></tr>
      <tr><td>Maxed out Ampere GPUs</td><td>Max out Blackwell GPUs</td></tr>
      <tr><td>Limited context windows</td><td>Short video outputs</td></tr>
    </tbody>
  </table>
</div>

<p>
  These limitations are mostly gone from LLMs today. Removing them from video generation, world models,
  3D object generation, and other generative rendering models is a highly active research area. 3D
  generation works across X, Y, and Z rather than X, Y, and T.
</p>

<p>
  One research direction returns to autoregressive generation. Techniques such as Self Forcing combine a
  global view of quality with an iterative approach to generation, which avoids the unusable error
  accumulation of pure framewise generation. Autoregressive components partially relieve the attention
  bottleneck, but attention remains the most important and expensive part of video inference.
</p>
