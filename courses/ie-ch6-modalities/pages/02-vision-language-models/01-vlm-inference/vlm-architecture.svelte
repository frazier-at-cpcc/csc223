<script module>
  export const pageConfig = { title: 'VLM Architecture' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import VlmPipeline from '../../../components/VlmPipeline.svelte';
</script>

<h1>VLM Architecture</h1>

<p>
  A <strong>vision language model (VLM)</strong> accepts one or more images or videos together with a
  text prompt and generates a text response. A VLM adds image and video understanding to an
  <Term id="llm">LLM</Term>.
</p>

<h2>Two modules</h2>

<ul>
  <li><strong>LLM:</strong> a standard large language model that generates the text response.</li>
  <li>
    <strong>Vision encoder:</strong> a small model that takes raw images and videos and converts them
    into visual tokens the LLM can read.
  </li>
</ul>

<VlmPipeline />

<p>
  The LLM is far larger than the vision encoder. In Mistral Large 3, for example, the vision encoder
  has about 2 billion <Term id="parameter">parameters</Term>, while the LLM has 673 billion. Figure 6.1
  shows the consequence that matters for serving: the visual tokens, not the text, make up most of the
  sequence the LLM reads.
</p>

<h2>Why the small encoder still matters</h2>

<p>
  The vision encoder is small by parameter count, but every image passes through it, so it is
  critical for inference. VLMs use varied encoder architectures and implementations. Runtime support
  for VLMs is therefore more fragmented than for text-only LLMs. That fragmentation makes broad-support
  engines such as <Term id="vllm">vLLM</Term> and <Term id="sglang">SGLang</Term> especially important
  for serving VLMs.
</p>
