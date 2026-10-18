<script module>
  export const pageConfig = { title: 'Model File Formats' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Model File Formats</h1>

<p>
  A trained model must be saved to disk before it can be served. Two formats
  dominate inference work, and they make opposite choices about what to store.
</p>

<h2>Safetensors: weights only</h2>

<p>
  <strong>Safetensors</strong> is the dominant format for serializing model
  <Term id="weights">weights</Term>. <Term id="hugging-face" /> created it to replace
  generic formats such as the PyTorch <code>bin</code> file, which is a Python
  pickle file. Loading a pickle file can run arbitrary Python code that the file
  carries.
</p>

<ul>
  <li>
    Safety: a safetensors file holds only tensor data and metadata, never
    executable code. Loading one cannot run code hidden in the file.
  </li>
  <li>
    Scale: large generative AI models carry hundreds of gigabytes of weights,
    split across dozens of safetensors files. Smaller models fit in one file or
    a few.
  </li>
  <li>
    Speed: the format supports memory mapping, so a file loads without
    allocating and copying its full size in memory first. Loading is faster as a
    result.
  </li>
</ul>

<Signal kind="mistake" title="Safety and speed come from different properties">
  <p>
    Memory mapping makes safetensors fast to load. It does not make the format
    safe. Safety comes from what the file leaves out: it stores data only, so
    there is no code to run.
  </p>
</Signal>

<h2>ONNX: weights plus the execution graph</h2>

<p>
  <strong>ONNX</strong> (Open Neural Network Exchange) stores the weights
  together with an execution graph for the model. Safetensors separates the
  weights from the architecture. ONNX bundles them.
</p>

<p>
  ONNX files are highly portable. PyTorch ships an ONNX exporter, and many
  runtimes on many types of hardware can execute an ONNX file. ONNX is a strong
  alternative to safetensors when a team needs to store the model graph and not
  only the weights.
</p>

<div class="table-wrap" role="region" aria-label="Safetensors and ONNX compared" use:scrollable>
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
      <td>A graph of operations for a runtime to execute, with no arbitrary code</td>
    </tr>
    <tr>
      <th scope="row">Model code needed to run it</th>
      <td>Yes, from the engine or a Python model class</td>
      <td>No, the graph describes the computation</td>
    </tr>
    <tr>
      <th scope="row">Typical use</th>
      <td>Distributing open model weights and loading them into inference engines</td>
      <td>Portable models for ONNX Runtime or TensorRT</td>
    </tr>
  </tbody>
</table>
</div>
