<script module>
  export const pageConfig = { title: 'Guidance and Inference Arguments' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Guidance and Inference Arguments</h1>

<h2>Two forward passes per guided step</h2>

<p>
  Most image models apply <strong>classifier-free guidance</strong> at every denoising step. The step runs the
  denoising model twice. One <Term id="forward-pass">forward pass</Term> is conditioned on the text prompt, and
  the other runs without conditioning. The model then combines the two results according to a guidance scale.
  Engines often run the two passes together as one <Term id="batching">batch</Term> of two, but the work is still two passes.
</p>

<p>The number of denoiser forward passes depends on whether guidance is on:</p>

<pre><code>Guidance enabled:   forward passes = 2 × denoising steps
Guidance disabled:  forward passes = 1 × denoising steps</code></pre>

<p>
  Guidance is disabled when a request sets the guidance scale to 1, and in guidance-distilled models that were
  trained to follow the prompt without the unconditioned pass. Many few-step models are guidance-distilled.
</p>

<Signal kind="worked" title="Counting denoiser forward passes">
  <pre><code>Request A: 50 steps, guidance enabled
           50 × 2 = 100 forward passes

Request B: 28 steps on a guidance-distilled model
           28 × 1 =  28 forward passes</code></pre>
  <p>
    For a pipeline with two denoisers, such as a base model followed by a refiner, count each stage separately
    and add the results.
  </p>
</Signal>

<Signal kind="mistake" title="Counting steps instead of passes">
  <p>
    An inference engineer who counts only steps underestimates a guided request by half. A 50-step guided image
    costs 100 forward passes through the denoising model.
  </p>
</Signal>

<NumericQuestion
  id="ia_faded"
  question="Complete the last step. A request runs 30 denoising steps with guidance enabled, so each step runs 2 forward passes. How many denoiser forward passes does the request require?"
  answer={60}
  unit="passes"
  correctFeedback="30 steps × 2 passes per step = 60 forward passes."
  incorrectFeedback="With guidance enabled, each step runs one conditioned and one unconditioned pass: 30 × 2 = 60 forward passes."
/>

<h2>Request arguments</h2>

<p>Inference arguments control image generation on a request-by-request basis. The most important are:</p>

<ul>
  <li><strong>Prompt:</strong> describes what the image should look like.</li>
  <li><strong>Negative prompt:</strong> separately describes styles or objects that should not appear in the image. It replaces the empty prompt in the unconditioned pass.</li>
  <li><strong>Number of steps:</strong> trades speed against quality. Most standard models use 30 to 50 denoising steps.</li>
  <li><strong>Guidance scale:</strong> balances creativity against prompt adherence. Lower guidance favors creativity, and higher guidance enforces the prompt. Values around 4 are common.</li>
  <li><strong>Image size:</strong> selects from a fixed menu of resolutions and aspect ratios.</li>
</ul>

<p>
  These core mechanisms are common across image generation models. The architecture of the models themselves
  has changed considerably in the past few years, which the next lesson covers.
</p>
