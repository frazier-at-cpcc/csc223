<script module>
  export const pageConfig = { title: 'Guidance and Inference Arguments' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Guidance and Inference Arguments</h1>

<h2>Two forward passes per step</h2>

<p>
  Within each denoising step, the model runs two forward passes. One pass is conditioned on the text
  prompt. The other pass runs without conditioning. The model then combines the two results according to
  a guidance scale. This technique is called <strong>classifier-free guidance</strong>.
</p>

<p>Because each step has two parts, the number of forward passes is twice the number of steps.</p>

<pre><code>forward passes = 2 × denoising steps

50 steps × 2 = 100 forward passes</code></pre>

<Callout type="info">
  <p>
    A 50-step image therefore costs 100 forward passes through the denoising model. An inference engineer
    who counts only steps underestimates the work by half.
  </p>
</Callout>

<h2>Request arguments</h2>

<p>Inference arguments control image generation on a request-by-request basis. The most important are:</p>

<ul>
  <li><strong>Prompt:</strong> describes what the image should look like.</li>
  <li><strong>Negative prompt:</strong> separately describes styles or objects that should not appear in the image.</li>
  <li><strong>Number of steps:</strong> trades speed against quality. Most models use 30 to 50 denoising steps.</li>
  <li><strong>Guidance scale:</strong> balances creativity against prompt adherence. Lower guidance favors creativity, and higher guidance enforces the prompt. The value is generally an integer around 4.</li>
  <li><strong>Image size:</strong> selects from a fixed menu of resolutions and aspect ratios.</li>
</ul>

<p>
  These core mechanisms are common across image generation models. The architecture of the models
  themselves has evolved considerably in the past few years, which the next lesson covers.
</p>
