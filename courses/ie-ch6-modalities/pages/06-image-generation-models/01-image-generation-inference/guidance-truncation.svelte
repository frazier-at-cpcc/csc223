<script module>
  export const pageConfig = { title: 'Guidance Truncation' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import DenoisingSteps from '../../../components/DenoisingSteps.svelte';
</script>

<h1>Guidance Truncation</h1>

<p>
  Kernel selection and compilation are standard optimizations. Image generation also allows a practical
  technique, guidance truncation, that saves work without reducing the number of steps.
</p>

<h2>Step count drives latency</h2>

<p>
  Image generation time grows linearly with the number of denoising steps. Few-step models and latent
  consistency models are much faster than full 50-step models for this reason. Cutting steps can drop
  quality below an acceptable level.
</p>

<Signal kind="recall" chapter={2} title="Classifier-free guidance">
  <p>
    Chapter 2 introduced <Term id="classifier-free-guidance">classifier-free guidance</Term>, which runs
    two forward passes per denoising step: one conditioned on the prompt and one unconditioned. The
    guidance scale sets how heavily the prompt-conditioned result counts when the two are combined. A
    50-step run with guidance on every step therefore makes 100 forward passes.
  </p>
</Signal>

<h2>Turning guidance off for late steps</h2>

<p>
  Guidance truncation extends that idea. Turning guidance off for a step means running one forward pass
  instead of two. Common implementations keep the prompt-conditioned pass and drop the unconditional
  pass, so the late steps still follow the prompt. They lose only the extra push toward it that guidance
  adds.
</p>

<DenoisingSteps />

<p>
  The basic outline of the image is in place after the first few steps. Later steps fill in detail.
  Prompt adherence matters most in the early steps, because the model does not change its mind late in
  the run. A model that is halfway through drawing a cat does not switch to drawing a dog.
</p>
<p>
  Turning guidance off partway through therefore saves forward passes without cutting steps, and
  quality generally remains high.
</p>

<Signal kind="worked" title="A 50-step run with guidance truncation">
  <p>A 50-step run skips guidance for the last 20 steps.</p>
  <ol>
    <li>Guided steps: 50 − 20 = 30 steps, at 2 forward passes each, give 60 passes.</li>
    <li>Unguided steps: 20 steps, at 1 forward pass each, give 20 passes.</li>
    <li>Total: 60 + 20 = 80 forward passes.</li>
    <li>Savings: 100 − 80 = 20 passes, or 20 percent of the denoising work.</li>
  </ol>
</Signal>

<p>Finish the next example. The first steps are done for you.</p>

<NumericQuestion
  id="faded_guidance"
  question="A 28-step run turns guidance off for the last 8 steps. Guided steps: 20 × 2 = 40 forward passes. Unguided steps: 8 × 1 = 8 forward passes. Complete the final step: how many forward passes does the run make in total?"
  answer={48}
  unit="forward passes"
  correctFeedback="40 + 8 = 48 forward passes, compared with 56 if guidance stayed on for all 28 steps."
  incorrectFeedback="Add the guided and unguided passes: 40 + 8 = 48 forward passes."
/>

<Signal kind="mistake" title="Reading guidance off as prompt off">
  <p>
    Guidance truncation does not make the late steps ignore the prompt. It removes the unconditional
    comparison pass. The remaining pass is still conditioned on the prompt, so the image keeps following
    it while the details fill in.
  </p>
</Signal>
