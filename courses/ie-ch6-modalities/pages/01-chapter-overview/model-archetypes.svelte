<script module>
  export const pageConfig = { title: 'Two Model Archetypes' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Two Model Archetypes</h1>

<Signal kind="recall" chapter={2} title="Autoregressive generation and iterative denoising">
  <p>
    Chapter 2 showed that nearly every generative model follows one of two archetypes. Before you read
    on, name the two archetypes and the kind of model Chapter 2 used to illustrate each one.
  </p>
  <ul>
    <li>
      <Term id="autoregressive-generation">Autoregressive token generation</Term> starts from a tokenized
      sequence and predicts the next token, one token at a time. LLMs are the Chapter 2 example.
    </li>
    <li>
      Iterative denoising starts from random noise and refines it, step by step, toward the output. The
      <Term id="diffusion">diffusion</Term> image models in Chapter 2 are the example.
    </li>
  </ul>
</Signal>

<p>
  This chapter extends that split from two example models to the full catalog. The archetype of a new
  model predicts which runtimes support it and which Chapter 5 techniques are likely to help.
</p>

<h2>Transformer models beyond text</h2>
<p>
  LLMs are the best-known autoregressive <Term id="transformer">transformer</Term> models, but many
  other modalities use similar architectures. Vision language models, text and multimedia embedding
  models, <Term id="asr">automatic speech recognition (ASR)</Term> models, and
  <Term id="tts">text-to-speech (TTS)</Term> models all build on transformer designs close to an LLM.
  As a result, many LLM inference engines and techniques apply to them with modest changes.
</p>
<p>
  Embedding models are the one exception in this group. They share the transformer architecture, but
  they read the whole input in one pass and output a single vector. They never generate tokens one at a
  time.
</p>

<h2>Denoising models</h2>
<p>
  Image and video generation models rely on iterative denoising. Hybrid
  <Term id="diffusion-transformer">diffusion transformer</Term> models increasingly set the frontier in
  quality. The general philosophy of optimization still applies, from kernel selection to parameter
  tuning, but the specific techniques differ from LLM serving.
</p>

<Callout type="tip">
  <p>
    When you meet a new model, identify its archetype first. Then check whether it generates output one
    token at a time, refines a whole output over many steps, or returns a single vector in one pass.
  </p>
</Callout>
