<script module>
  export const pageConfig = { title: 'What CUDA Is' };
</script>

<h1>What CUDA Is</h1>

<p>
  <strong>CUDA</strong> is NVIDIA's proprietary platform and programming model
  for running parallel tasks on GPUs. In practical terms, CUDA is how engineers
  write code that runs on NVIDIA GPUs. The name stands for Compute Unified Device
  Architecture, although the expansion is rarely used today.
</p>

<p>
  CUDA is the foundation of the entire generative AI ecosystem on NVIDIA
  hardware. Every framework and engine later in this course ultimately runs
  CUDA code.
</p>

<h2>CUDA is not a language</h2>

<p>
  Developers write CUDA programs in an existing programming language, most often
  C++. A compiler such as <code>nvcc</code> then splits the program into separate
  CPU code and GPU code.
</p>

<h2>The four components of CUDA</h2>

<p>
  "Platform" and "programming model" are broad terms. CUDA is easier to
  understand through its four main components.
</p>

<table class="data">
  <caption>CUDA components and their roles</caption>
  <thead>
    <tr>
      <th scope="col">Component</th>
      <th scope="col">Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">CUDA kernel</th>
      <td>A user-defined function that executes parallelized code on the GPU.</td>
    </tr>
    <tr>
      <th scope="row">CUDA graph</th>
      <td>A directed acyclic graph (DAG) of kernels and other GPU operations for optimizing repeated workflows.</td>
    </tr>
    <tr>
      <th scope="row">CUDA driver</th>
      <td>A low-level interface between the application and the GPU hardware that manages memory and execution.</td>
    </tr>
    <tr>
      <th scope="row">CUDA runtime</th>
      <td>A developer-facing API for launching kernels and managing memory.</td>
    </tr>
  </tbody>
</table>

<p>
  The kernel is the component that inference engineers discuss most. Whenever
  the phrase "CUDA kernel" appears, read it as "a piece of code written for
  NVIDIA GPUs."
</p>
