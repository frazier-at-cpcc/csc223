<script module>
  export const pageConfig = { title: 'ONNX Runtime and TensorRT' };
</script>

<h1>ONNX Runtime and TensorRT</h1>

<p>
  ONNX Runtime and TensorRT are high-performance inference runtimes. A team
  exports a PyTorch model to the ONNX format. ONNX Runtime can then execute the
  ONNX file directly, or TensorRT can compile it into a highly optimized engine.
</p>

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
      <td>Open source, associated with the Linux Foundation</td>
      <td>Mix of proprietary and open components, built by NVIDIA</td>
    </tr>
    <tr>
      <th scope="row">PyTorch integration</th>
      <td>First-class exporter in the PyTorch ecosystem</td>
      <td>Integrated through Torch-TensorRT</td>
    </tr>
    <tr>
      <th scope="row">Hardware</th>
      <td>Many types of GPUs</td>
      <td>NVIDIA GPUs only</td>
    </tr>
  </tbody>
</table>

<h2>Export has limits</h2>

<p>
  Exporting resembles PyTorch compilation. Neither ONNX nor TensorRT supports
  every data structure, type, and operation in PyTorch. The exporter flags
  unsupported code, but complex models make the process difficult.
</p>

<p>
  DeepSeek V3 illustrates the problem. Its Multi-Latent Attention (MLA), as
  implemented in PyTorch, is hard to export. The rest of the architecture is
  simple enough that engineers can fuse its kernels by hand instead.
</p>

<h2>The industry is splitting into two paths</h2>

<p>
  Many teams now skip the intermediate representation. For models that an
  inference engine supports, they go straight from PyTorch to vLLM or
  TensorRT-LLM and export the weights only as safetensors.
</p>

<p>
  ONNX Runtime and TensorRT remain in wide use. TensorRT is especially valued for
  its strong out-of-the-box runtime for image and video models. Overall, the
  industry is dividing between the control of handwritten PyTorch code and the
  convenience of prebuilt inference engines.
</p>
