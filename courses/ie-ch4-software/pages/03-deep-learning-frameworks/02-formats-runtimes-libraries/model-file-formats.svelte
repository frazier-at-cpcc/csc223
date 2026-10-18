<script module>
  export const pageConfig = { title: 'Model File Formats' };
</script>

<h1>Model File Formats</h1>

<p>
  A trained model must be saved to disk before it can be served. Two formats
  dominate inference work, and they make opposite choices about what to store.
</p>

<h2>Safetensors: weights only</h2>

<p>
  <strong>Safetensors</strong> is the dominant format for serializing model
  weights. Hugging Face created it to replace generic formats such as
  <code>bin</code>.
</p>

<ul>
  <li>
    Safety: a generic format can execute arbitrary Python code while it is
    loaded. A safetensors file holds only tensor data, never executable code.
  </li>
  <li>
    Scale: a generative AI model has hundreds of gigabytes of weights, split
    across dozens of safetensors files.
  </li>
  <li>
    Speed: the format uses memory mapping, so a file loads without allocating
    its full size in memory first. Loading is faster and safer as a result.
  </li>
</ul>

<h2>ONNX: weights plus the execution graph</h2>

<p>
  <strong>ONNX</strong> (Open Neural Network Exchange) stores the weights
  together with an execution graph for the model. Safetensors separates the
  weights from the architecture. ONNX bundles them.
</p>

<p>
  ONNX files are highly portable. ONNX integrates deeply with PyTorch and
  supports many hardware options. It is a strong alternative to safetensors when
  a team needs to store the model graph and not only the weights.
</p>

<table class="data">
  <caption>Safetensors and ONNX compared</caption>
  <thead>
    <tr>
      <th scope="col">Property</th>
      <th scope="col">Safetensors</th>
      <th scope="col">ONNX</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Contents</th>
      <td>Weights only</td>
      <td>Weights and execution graph</td>
    </tr>
    <tr>
      <th scope="row">Executable code</th>
      <td>None</td>
      <td>Graph of operations for a runtime to execute</td>
    </tr>
    <tr>
      <th scope="row">Typical use</th>
      <td>Distributing open model weights; loading into inference engines</td>
      <td>Portable models for ONNX Runtime or TensorRT</td>
    </tr>
  </tbody>
</table>
