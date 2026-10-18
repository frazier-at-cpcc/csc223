<script module>
  export const pageConfig = { title: 'Profiling Tools' };
</script>

<h1>Profiling Tools</h1>

<p>
  Profilers report compute and memory use at a fine grain. That detail directs
  optimization work toward the most expensive steps in the inference pipeline.
</p>

<h2>The main profilers for inference</h2>

<table class="data">
  <caption>Profiling tools and their scope</caption>
  <thead>
    <tr>
      <th scope="col">Tool</th>
      <th scope="col">Scope</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">PyTorch Profiler</th>
      <td>Each operation in a PyTorch program</td>
      <td>An easy-to-use library that captures step-by-step CPU time, GPU time, and memory use during inference.</td>
    </tr>
    <tr>
      <th scope="row">NVIDIA Nsight Systems (NSys)</th>
      <td>The whole system</td>
      <td>A full-featured but complex tool for GPU and CPU sampling and tracing. It analyzes behavior across multiple GPUs and their interconnects.</td>
    </tr>
    <tr>
      <th scope="row">NVIDIA Nsight Compute (NCU)</th>
      <td>A single CUDA kernel</td>
      <td>A profiling utility and command-line tool for in-depth analysis of the compute and memory use of individual kernels.</td>
    </tr>
  </tbody>
</table>

<p>
  Frameworks such as TensorFlow and TensorRT also ship with built-in profilers.
</p>

<h2>A profiling workflow</h2>

<ol>
  <li>Run PyTorch Profiler and find that activation functions take an unusually long time because of excess memory reads.</li>
  <li>Write a fused kernel that runs the activations alongside attention, which removes the extra reads.</li>
  <li>Insert the new kernel into the PyTorch code.</li>
  <li>Re-run the system-level benchmarks to confirm the service now meets its latency targets.</li>
</ol>

<p>
  The workflow connects this lesson to the rest of the chapter. Profiling finds
  the cause, kernel fusion fixes it, and benchmarking confirms the fix. Together,
  profiling and benchmarking give engineers the evidence they need to deploy an
  optimization to production with confidence.
</p>
