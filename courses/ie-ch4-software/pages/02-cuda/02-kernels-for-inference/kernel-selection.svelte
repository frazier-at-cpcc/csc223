<script module>
  export const pageConfig = { title: 'Kernel Selection' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Kernel Selection</h1>

<p>
  Most inference engineers never write their own kernels. They do choose among
  existing kernels. <strong>Kernel selection</strong> is the practice of picking
  the best kernel for an operation from the available implementations. It is an
  important part of inference optimization.
</p>

<h2>Kernels are tied to hardware</h2>

<p>
  CUDA exposes low-level APIs for memory management and parallel computation.
  Kernel engineers make implementation decisions based on the exact
  specifications of the target GPU. Kernels often contain hard-coded values based
  on <Term id="memory-bandwidth">memory bandwidth</Term>, on-chip memory size, or the number and layout of
  <Term id="tensor-core">Tensor Cores</Term>.
</p>

<p>That specialization cuts both ways:</p>

<ul>
  <li>Moving to a newer generation: a kernel written in portable CUDA for an <Term id="h100" /> usually runs on a <Term id="b200" /> but fails to use its architecture and extra memory. A kernel built on Hopper-only instructions, as FlashAttention 3 is, does not run on Blackwell at all.</li>
  <li>Moving to an older generation: a kernel written for a B200 may not run at all on the previous-generation <Term id="hopper" /> architecture, because it relies on features that only <Term id="blackwell" /> has.</li>
</ul>

<p>
  Porting handwritten kernels to each new GPU generation takes substantial
  engineering work.
</p>

<Signal kind="mistake" title="Same language, different hardware">
  <p>
    Every NVIDIA GPU runs code written in CUDA C++, so it is tempting to assume
    that any CUDA kernel runs well on any NVIDIA GPU. The source language is the
    same on every GPU. The problem is the hardware assumptions coded into the
    kernel and the architecture it was compiled to target.
  </p>
</Signal>

<h2>Automatic selection</h2>

<p>
  Most kernel selection happens automatically. Deep learning frameworks and
  inference engines ship with pre-configured kernels for common architectures.
  PyTorch and TensorRT-LLM also select kernels automatically during their
  compilation steps. Automatic selection follows the hardware: when the GPU
  changes, the framework or engine picks kernels for the new architecture.
</p>

<h2>Manual selection: the DeepGEMM example</h2>

<p>
  Engineers sometimes choose kernels by hand for a few essential operations.
  Most production GEMM kernels come from cuBLAS. When the DeepSeek lab released
  an updated DeepSeek-V3, it also released <strong>DeepGEMM</strong>, a library
  of GEMM kernels with strong <Term id="fp8" /> performance on the Hopper architecture.
</p>

<p>
  Manual selection lets an engineer insert a DeepGEMM kernel as a
  <strong>plugin kernel</strong>: a hand-picked kernel that replaces the default
  one for a specific step, such as multiplying two matrices of precise
  dimensions.
</p>

<h2>What a hardware change requires</h2>

<p>
  A manually selected kernel creates a compatibility obligation, because nothing
  selects a replacement automatically. When a team changes GPU architecture, it
  works through each plugin kernel in order:
</p>

<ol>
  <li>Confirm whether the kernel's library supports the new architecture. If it does, update to that version and benchmark again.</li>
  <li>If it does not, fall back to a general kernel, such as the cuBLAS GEMM, or to the engine's automatic selection for that operation.</li>
  <li>If the plugin's speedup is essential and no supported version exists, wait for the library to add support or port the kernel to the new architecture.</li>
</ol>

<Callout type="info">
  <p>
    DeepGEMM added Blackwell support by the time of the book's publication in
    2025. The obligation still applies to every hand-picked kernel, because each
    library adds support for a new architecture on its own schedule.
  </p>
</Callout>
