<script module>
  export const pageConfig = { title: 'Cascading Pipelines and Speech-to-Speech Models' };
</script>

<script>
  import CascadingVoice from '../../../components/CascadingVoice.svelte';
</script>

<h1>Cascading Pipelines and Speech-to-Speech Models</h1>

<p>
  A <strong>speech-to-speech model</strong> takes audio as input and generates audio as output. It is an
  active research area.
</p>

<h2>The cascading approach</h2>

<p>
  At the book's publication in 2025, most voice systems used a <strong>cascading</strong> approach. An ASR model, an LLM, and a TTS
  model work as a pipeline to listen, think, and respond. Auxiliary components, such as VAD and
  embedding models, support natural turn-taking and add context.
</p>

<CascadingVoice />

<h2>Unified speech-to-speech models</h2>

<p>
  Speech-to-speech models such as OpenAI's gpt-realtime add audio input and audio output to a core LLM.
  They unify the cascade in one model. Unification is possible because ASR, LLM, and TTS models share
  similar architectures, especially in the decoder.
</p>

<p>The book's comparison of the two approaches favored cascades:</p>

<ul>
  <li>No open speech-to-speech model was commercially viable.</li>
  <li>Closed options such as gpt-realtime were significantly less capable and more expensive than cascading multi-model setups.</li>
</ul>

<p>
  Research in this space is active. Speech-to-speech is likely to need its own form of inference
  engineering as it matures.
</p>
