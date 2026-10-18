<script module>
  export const pageConfig = { title: 'What CUDA Is' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>What CUDA Is</h1>

<p>
  Chapter 0 defined <Term id="cuda" /> as NVIDIA's platform and programming model for
  code that runs on GPUs. The name stands for Compute Unified Device Architecture,
  although the expansion is rarely used today. This page extends that definition
  to the parts of CUDA that inference engineers meet in practice.
</p>

<p>
  CUDA is the foundation of the entire generative AI ecosystem on NVIDIA
  hardware. Every framework and engine later in this course ultimately runs
  CUDA code.
</p>

<h2>CUDA is a platform, not a language</h2>

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

<div class="table-wrap" role="region" aria-label="CUDA components and their roles" use:scrollable>
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
      <td>A directed acyclic graph (DAG) of kernels and other GPU operations that the GPU can replay with one launch, which speeds up repeated workflows.</td>
    </tr>
    <tr>
      <th scope="row">CUDA driver</th>
      <td>A low-level interface between the application and the GPU hardware that manages memory and execution. It is installed on the host machine.</td>
    </tr>
    <tr>
      <th scope="row">CUDA runtime</th>
      <td>A developer-facing API for launching kernels and managing memory.</td>
    </tr>
  </tbody>
</table>
</div>

<p>
  The <Term id="kernel">kernel</Term> is the component that inference engineers discuss most.
  Whenever the phrase "CUDA kernel" appears, read it as "a piece of code written
  for NVIDIA GPUs." A <Term id="cuda-graph" /> matters most during decode, where the
  same sequence of kernels repeats for every output token.
</p>
