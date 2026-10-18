<script module>
  export const pageConfig = { title: 'Two Model Archetypes' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Two Model Archetypes</h1>

<p>
  The modality list is long, but Chapter 2 showed that nearly every generative model follows one of
  two archetypes.
</p>

<ul>
  <li>
    <strong>Autoregressive token generation</strong> starts from a tokenized sequence and predicts the
    most likely next token, one token at a time.
  </li>
  <li>
    <strong>Iterative denoising</strong> starts from random noise and refines it, step by step,
    toward the most likely output.
  </li>
</ul>

<h2>Autoregressive models beyond text</h2>

<p>
  LLMs are the best-known autoregressive transformer models, but many other modalities use similar
  architectures. Vision language models, text and multimedia embedding models, automatic speech
  recognition (ASR) models, and text-to-speech (TTS) models all build on transformer designs close to
  an LLM. As a result, many LLM inference engines and techniques apply to them with modest changes.
</p>

<h2>Denoising models</h2>

<p>
  Image and video generation models rely on iterative denoising. Hybrid diffusion transformer models
  increasingly set the frontier in quality. The general philosophy of optimization still applies,
  from kernel selection to parameter tuning, but the specific techniques differ from LLM serving.
</p>

<Callout type="tip">
  <p>
    When you meet a new model, identify its archetype first. The archetype predicts which runtimes
    support it and which Chapter 5 techniques are likely to help.
  </p>
</Callout>
