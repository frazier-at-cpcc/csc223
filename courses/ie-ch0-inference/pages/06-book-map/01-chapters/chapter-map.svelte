<script module>
  export const pageConfig = { title: 'The Chapters Ahead' };
</script>

<h1>The Chapters Ahead</h1>

<p>
  <cite>Inference Engineering</cite> presents a map of the technologies and techniques that power inference across all
  three layers: runtime, infrastructure, and tooling.
</p>

<h2>Chapter guide</h2>

<table>
  <caption>Chapters and appendices of Inference Engineering</caption>
  <thead>
    <tr>
      <th scope="col">Part</th>
      <th scope="col">Topics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chapter 1, Prerequisites</th>
      <td>Product thinking and AI engineering before inference work begins: use case definition, latency and cost budgets, and selecting and evaluating models.</td>
    </tr>
    <tr>
      <th scope="row">Chapter 2, Models</th>
      <td>The architecture of AI models from LLMs to image and video generation, where inference bottlenecks exist, and optimizing attention.</td>
    </tr>
    <tr>
      <th scope="row">Chapter 3, Hardware</th>
      <td>GPU spec sheets, compute and memory, NVIDIA datacenter architectures and SKUs, and other accelerators.</td>
    </tr>
    <tr>
      <th scope="row">Chapter 4, Software</th>
      <td>The stack from CUDA to PyTorch, Transformers, and Diffusers, the inference engines vLLM, SGLang, and TensorRT-LLM, and NVIDIA Dynamo for distributed serving.</td>
    </tr>
    <tr>
      <th scope="row">Chapter 5, Techniques</th>
      <td>Quantization, speculative decoding, KV cache reuse, model parallelism, and disaggregation in production.</td>
    </tr>
    <tr>
      <th scope="row">Chapter 6, Modalities</th>
      <td>Vision language, embedding, ASR, and speech synthesis models that adapt LLM architectures, plus image and video generation.</td>
    </tr>
    <tr>
      <th scope="row">Chapter 7, Production</th>
      <td>Operating infrastructure for optimized inference services and building performant applications on them.</td>
    </tr>
    <tr>
      <th scope="row">Appendix A</th>
      <td>A glossary of inference engineering terms.</td>
    </tr>
    <tr>
      <th scope="row">Appendix B</th>
      <td>Recommended resources for further reading.</td>
    </tr>
  </tbody>
</table>

<h2>A shared toolset for many modalities</h2>

<p>
  The Chapter 6 summary makes a point that applies across the book. Many model types adapt LLM architectures, so inference
  engineers run them with the same tools and techniques used for LLMs. Image and video generation models are the
  exception. They have their own architectures and optimizations.
</p>
