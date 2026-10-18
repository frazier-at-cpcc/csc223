<script module>
  export const pageConfig = { title: 'The Chapters Ahead' };
</script>

<script>
  import ScrollTable from '../../../components/ScrollTable.svelte';
  import StackMap from '$shared/StackMap.svelte';
</script>

<h1>The Chapters Ahead</h1>

<p>
  <cite>Inference Engineering</cite> presents a map of the technologies and techniques that power inference across all
  three layers: runtime, infrastructure, and tooling. Each later chapter covers one part of the stack.
</p>

<h2>The Series Map</h2>

<StackMap />

<h2>Chapters and Their Layers</h2>

<ScrollTable label="Chapters and appendices of Inference Engineering, with the layer each one serves">
<table>
  <caption>Chapters and appendices of Inference Engineering, with the layer each one serves</caption>
  <thead>
    <tr>
      <th scope="col">Part</th>
      <th scope="col">Topics</th>
      <th scope="col">Layer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chapter 1, Prerequisites</th>
      <td>Use case definition, latency and cost budgets, and selecting and evaluating models before inference work begins.</td>
      <td>Requirements that every layer must meet</td>
    </tr>
    <tr>
      <th scope="row">Chapter 2, Models</th>
      <td>The architecture of models from LLMs to image and video generation, where inference bottlenecks exist, and optimizing attention.</td>
      <td>Runtime</td>
    </tr>
    <tr>
      <th scope="row">Chapter 3, Hardware</th>
      <td>GPU spec sheets, compute and memory, NVIDIA datacenter architectures and product models, and other accelerators.</td>
      <td>Runtime, and the hardware base of the infrastructure layer</td>
    </tr>
    <tr>
      <th scope="row">Chapter 4, Software</th>
      <td>The stack from CUDA to PyTorch and other frameworks, the inference engines vLLM, SGLang, and TensorRT-LLM, and NVIDIA Dynamo for distributed serving.</td>
      <td>Runtime</td>
    </tr>
    <tr>
      <th scope="row">Chapter 5, Techniques</th>
      <td>Quantization, speculative decoding, KV cache reuse, model parallelism, and disaggregation in production.</td>
      <td>Runtime</td>
    </tr>
    <tr>
      <th scope="row">Chapter 6, Modalities</th>
      <td>Vision language, embedding, ASR, and speech synthesis models that adapt LLM architectures, plus image and video generation.</td>
      <td>All three layers, for each modality</td>
    </tr>
    <tr>
      <th scope="row">Chapter 7, Production</th>
      <td>Containers, autoscaling, multi-cloud capacity, deployment, and the client code that calls an inference service.</td>
      <td>Infrastructure and tooling</td>
    </tr>
    <tr>
      <th scope="row">Appendix A</th>
      <td>A glossary of inference engineering terms.</td>
      <td>Reference</td>
    </tr>
    <tr>
      <th scope="row">Appendix B</th>
      <td>Recommended resources for further reading.</td>
      <td>Reference</td>
    </tr>
  </tbody>
</table>
</ScrollTable>

<h2>A Shared Toolset for Many Modalities</h2>

<p>
  Many model types adapt LLM architectures, so inference engineers run them with the same tools and techniques used for
  LLMs. Vision language, embedding, speech recognition, and speech synthesis models follow this pattern. Image and video
  generation models are the exception. They have their own architectures and optimizations.
</p>
