<script module>
  export const pageConfig = { title: 'Desktop Inference' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Desktop Inference</h1>

<p>
  The classic <Term id="local-inference">local inference</Term> machine is a workstation or gaming PC with one or
  two high-end consumer <Term id="gpu">GPUs</Term> from NVIDIA or AMD. Researchers and enthusiasts use these setups, but they form a
  small part of the desktop inference market.
</p>

<h2>Apple and unified memory</h2>
<p>
  Apple increasingly leads desktop inference. Its M-series <Term id="cpu">CPUs</Term> and GPUs draw from a single <strong>unified
  memory</strong> pool. Inference on the GPU therefore has access to far more memory, but that memory is slower
  than a discrete GPU's <Term id="vram">VRAM</Term>.
</p>

<div class="ie-table-wrap" role="region" aria-label="The tradeoff between memory capacity and speed at the high end, 2025 models with approximate prices" use:scrollable>
  <table class="ie-table">
    <caption>The tradeoff between memory capacity and speed at the high end, 2025 models with approximate prices</caption>
    <thead>
      <tr><th scope="col">Hardware</th><th scope="col">Memory</th><th scope="col">Bandwidth</th><th scope="col">Cost (full computer)</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">NVIDIA RTX 5090</th><td>32 GB</td><td>1,792 GB/s</td><td>$5,000</td></tr>
      <tr><th scope="row">Apple M3 Ultra</th><td>512 GB</td><td>819 GB/s</td><td>$10,000</td></tr>
    </tbody>
  </table>
</div>
<p>
  The RTX 5090 decodes faster on models that fit in 32 GB, because <Term id="decode">decode</Term> speed follows <Term id="memory-bandwidth">memory bandwidth</Term>. The M3
  Ultra can load models sixteen times larger, at under half the bandwidth. Newer models on both sides follow the
  same tradeoff, and so does midrange hardware at lower prices. Low-end computers with integrated graphics and
  little memory cannot run meaningful local inference.
</p>

<h2>The open-source desktop ecosystem</h2>
<ul>
  <li>
    Open-source tools such as Ollama and llama.cpp run models on personal hardware. They run aggressively
    <Term id="quantization">quantized</Term> models of 100 billion <Term id="parameter">parameters</Term> or more on high-end machines.
  </li>
  <li>
    <Term id="mixture-of-experts">Mixture of Experts</Term> models, which Chapter 2 introduced, help desktop
    inference. A single token activates only a subset of experts, so each decode step reads a fraction of the
    model's total <Term id="weights">weights</Term>.
  </li>
  <li>
    Image generation is popular on personal computers, especially through ComfyUI, an open-source tool that
    assembles several image model components into one pipeline.
  </li>
  <li>
    Smaller language models and speech models run on midrange computers. Browser inference libraries such as WebLLM
    aim to bring these capabilities to mainstream users.
  </li>
</ul>
