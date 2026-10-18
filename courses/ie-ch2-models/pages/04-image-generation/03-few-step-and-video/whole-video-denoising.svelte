<script module>
  export const pageConfig = { title: 'Whole-Video Denoising' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Whole-Video Denoising</h1>

<p>
  Video generation models are architecturally similar to image generation models, only bigger. They have three
  to five times more <Term id="parameter">parameters</Term>, and they encode ten to one hundred times more information in <Term id="latent-space">latent space</Term>.
</p>

<h2>Framewise generation and error accumulation</h2>

<p>
  The naive approach generates a video frame by frame. Early video models generated a starting frame, used it to
  generate the next frame, and continued in sequence. This framewise approach suffers from
  <strong>error accumulation</strong>. Small issues in early frames compound in every later frame, and the video
  quickly goes off the rails.
</p>

<h2>Denoising the whole video at once</h2>

<p>
  Modern video models hold the entire video in latent space and modify all of it on each denoising step. Every
  frame <Term id="attention">attends</Term> to every other frame and is updated on every <Term id="forward-pass">forward pass</Term>. An image
  latent has two physical dimensions, X and Y. A video latent has three: X, Y, and T for time.
</p>

<p>
  Because every frame sees every other frame on every step, an error in one frame is corrected by its neighbors
  instead of being copied forward. The cost of that global view is attention over a far larger latent, which the
  next page quantifies.
</p>
