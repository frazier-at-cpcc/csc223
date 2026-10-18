<script module>
  export const pageConfig = { title: 'Desktop Inference' };
</script>

<h1>Desktop Inference</h1>

<p>
  The classic local inference machine is a workstation or gaming PC with one or two high-end consumer GPUs from
  NVIDIA or AMD. Researchers and enthusiasts use these setups, but they form a small part of the desktop inference
  market.
</p>

<h2>Apple and unified memory</h2>
<p>
  Apple increasingly leads desktop inference. Its M-series CPUs and GPUs draw from a single <strong>unified
  memory</strong> pool. Inference on the GPU therefore has access to far more memory, but that memory is slower
  than a discrete GPU's VRAM.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The tradeoff between memory capacity and speed at the high end</caption>
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
  The RTX 5090 decodes faster on models that fit in 32 GB. The M3 Ultra can load models sixteen times larger, at
  under half the bandwidth. The same tradeoff holds across midrange hardware at lower prices. Low-end computers such
  as Chromebooks cannot run meaningful local inference.
</p>

<h2>The open-source desktop ecosystem</h2>
<ul>
  <li>
    Tools such as Ollama and llama.cpp run aggressively quantized models of 100 billion parameters or more on
    high-end personal hardware.
  </li>
  <li>
    <strong>Mixture of Experts (MoE)</strong> models help desktop inference. A single request activates only a subset
    of experts, so it touches a fraction of the model's total weights.
  </li>
  <li>
    Image generation is popular on personal computers, especially through ComfyUI. ComfyUI assembles several image
    model components into one pipeline.
  </li>
  <li>
    Smaller language models and speech models run on midrange computers. Browser inference libraries such as WebLLM
    aim to bring these capabilities to mainstream users.
  </li>
</ul>
