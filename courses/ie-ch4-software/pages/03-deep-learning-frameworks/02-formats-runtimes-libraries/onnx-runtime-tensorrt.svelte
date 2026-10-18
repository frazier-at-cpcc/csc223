<script module>
  export const pageConfig = { title: 'ONNX Runtime and TensorRT' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import ExportPaths from '../../../components/ExportPaths.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>ONNX Runtime and TensorRT</h1>

<p>
  ONNX Runtime and <Term id="tensorrt" /> are high-performance inference runtimes. A
  team exports a PyTorch model to the <Term id="onnx">ONNX</Term> format. ONNX Runtime can then
  execute the ONNX file directly, or TensorRT can compile it into a highly
  optimized <strong>TensorRT engine file</strong>: a compiled artifact built for
  one specific NVIDIA GPU.
</p>

<div class="table-wrap" role="region" aria-label="ONNX Runtime and TensorRT compared" use:scrollable>
<table class="data">
  <caption>ONNX Runtime and TensorRT compared</caption>
  <thead>
    <tr>
      <th scope="col">Property</th>
      <th scope="col">ONNX Runtime</th>
      <th scope="col">TensorRT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Governance</th>
      <td>Open-source runtime maintained by Microsoft. It executes the ONNX format, an open standard hosted by the LF AI and Data Foundation of the Linux Foundation.</td>
      <td>Mix of proprietary and open components, built by NVIDIA</td>
    </tr>
    <tr>
      <th scope="row">PyTorch integration</th>
      <td>Runs files from the PyTorch ONNX exporter</td>
      <td>Integrated through Torch-TensorRT, or through an ONNX file</td>
    </tr>
    <tr>
      <th scope="row">Hardware</th>
      <td>Many types of GPUs, plus CPUs</td>
      <td>NVIDIA GPUs only</td>
    </tr>
    <tr>
      <th scope="row">Output</th>
      <td>Runs the ONNX graph as it is</td>
      <td>A TensorRT engine file compiled for one GPU</td>
    </tr>
  </tbody>
</table>
</div>

<Signal kind="mistake" title="The format is not the runtime">
  <p>
    ONNX names two different things. The ONNX format is an open community
    standard for storing a model. ONNX Runtime is one program that executes
    files in that format. A team can store a model as ONNX and run it with
    ONNX Runtime, TensorRT, or another runtime.
  </p>
</Signal>

<h2>Export has limits</h2>

<p>
  Export converts PyTorch code into an <strong>intermediate representation</strong>,
  a description of the computation that is independent of Python, such as an ONNX
  graph. Exporting resembles PyTorch compilation. Neither ONNX nor TensorRT supports
  every data structure, type, and operation in PyTorch. The exporter flags
  unsupported code, but complex models make the process difficult.
</p>

<p>
  DeepSeek-V3 illustrates the problem. Its
  <Term id="multi-latent-attention" />, as
  implemented in PyTorch, is hard to export. The rest of the architecture is
  simple enough that engineers can fuse its kernels by hand instead.
</p>

<h2>The industry is splitting into two paths</h2>

<ExportPaths />

<p>
  Many teams now skip the intermediate representation. For models that an
  <Term id="inference-engine">inference engine</Term> supports, they go straight from PyTorch to vLLM or
  TensorRT-LLM and export the weights only as safetensors.
</p>

<p>
  ONNX Runtime and TensorRT remain in wide use. TensorRT is especially valued for
  its strong out-of-the-box runtime for image and video models. Overall, the
  industry is dividing between the control of handwritten PyTorch code and the
  convenience of prebuilt inference engines.
</p>
