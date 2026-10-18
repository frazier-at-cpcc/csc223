<script module>
  export const pageConfig = { title: 'Guidance Truncation' };
</script>

<script>
  import DenoisingSteps from '../../../components/DenoisingSteps.svelte';
</script>

<h1>Guidance Truncation</h1>

<p>
  Kernel selection and compilation are standard optimizations. Image generation also allows a practical
  trick that saves work without reducing the number of steps.
</p>

<h2>Step count drives latency</h2>

<p>
  Image generation time grows linearly with the number of denoising steps. Few-step models and latent
  consistency models are much faster than full 50-step models for this reason. Cutting steps can drop
  quality below an acceptable level, though.
</p>

<h2>Guidance doubles each step</h2>

<p>
  <strong>Classifier-free guidance</strong> balances an unconditional denoising pass against a
  prompt-conditioned pass on each step. Each step therefore runs the denoiser at a batch size of two:
  one pass with the prompt and one without. The guidance parameter sets how heavily the prompt-guided
  result is weighted when the two are combined. When guidance is zero, the prompt-guided pass is
  unnecessary.
</p>

<h2>Turn guidance off for late steps</h2>

<DenoisingSteps />

<p>
  The basic outline of the image is in place after the first few steps. Later steps fill in detail.
  Prompt adherence matters most in the early steps, because the model does not change its mind late in
  the run. A model that is halfway through drawing a cat does not switch to drawing a dog.
</p>

<p>
  Turning guidance off partway through therefore saves denoiser passes without cutting steps, and
  quality generally remains high.
</p>

<div class="worked">
  <p><strong>Worked example.</strong> A 50-step run skips guidance for the last 20 steps.</p>
  <ul>
    <li>Without the trick: 50 steps × 2 passes = 100 passes</li>
    <li>With the trick: (30 × 2) + (20 × 1) = 80 passes</li>
    <li>Savings: 20 passes, or 20 percent of the denoiser work</li>
  </ul>
</div>
