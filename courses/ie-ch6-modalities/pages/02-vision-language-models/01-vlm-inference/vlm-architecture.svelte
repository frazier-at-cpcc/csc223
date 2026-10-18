<script module>
  export const pageConfig = { title: 'VLM Architecture' };
</script>

<script>
  import ModalityFlow from '../../../components/ModalityFlow.svelte';
</script>

<h1>VLM Architecture</h1>

<p>
  A <strong>vision language model (VLM)</strong> accepts one or more images or videos together with a
  text prompt and generates a text response. A VLM adds image and video understanding to an LLM.
</p>

<ModalityFlow
  number="6.1"
  caption="VLMs add image and video understanding to LLMs."
  alt="Text prompt and image inputs flow into a vision language model, which outputs text"
  description="Two inputs, a text prompt and an image or video, flow into a box labeled vision language model. One arrow leaves the model and points to a text response."
  inputs={['Text prompt', 'Image or video']}
  model="Vision|language model"
  output="Text response"
/>

<h2>Two modules</h2>

<ul>
  <li><strong>LLM:</strong> a standard large language model that generates the text response.</li>
  <li>
    <strong>Vision encoder:</strong> a small model that takes raw images and videos and converts them
    into image tokens the LLM can read.
  </li>
</ul>

<p>
  The LLM is far larger than the vision encoder. In Mistral Large 3, for example, the vision encoder
  has about 2 billion parameters, while the LLM has 673 billion.
</p>

<h2>Why the small encoder still matters</h2>

<p>
  The vision encoder is small by parameter count, but every image passes through it, so it is
  critical for inference. VLMs use varied encoder architectures and implementations. Runtime support
  for VLMs is therefore more fragmented than for text-only LLMs. That fragmentation makes broad-support
  engines such as vLLM and SGLang especially important for serving VLMs.
</p>
