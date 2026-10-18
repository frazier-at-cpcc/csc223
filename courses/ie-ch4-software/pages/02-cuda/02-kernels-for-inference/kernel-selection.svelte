<script module>
  export const pageConfig = { title: 'Kernel Selection' };
</script>

<script>
  import { Callout } from 'tessera-learn';
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
  on memory bandwidth or on the number and layout of Tensor Cores.
</p>

<p>
  That specialization cuts both ways:
</p>

<ul>
  <li>A kernel written for an H100 will likely fail to use the architecture and extra memory of a B200.</li>
  <li>A kernel written for a B200 may not run at all on the previous-generation Hopper architecture.</li>
</ul>

<p>
  Porting handwritten kernels to each new GPU generation takes substantial
  engineering work.
</p>

<h2>Automatic selection</h2>

<p>
  Most kernel selection happens automatically. Deep learning frameworks and
  inference engines ship with pre-configured kernels for common architectures.
  PyTorch and TensorRT-LLM also select kernels automatically during their
  compilation steps.
</p>

<h2>Manual selection: the DeepGEMM example</h2>

<p>
  Engineers sometimes choose kernels by hand for a few essential operations.
  Most production GEMM kernels come from cuBLAS. When the DeepSeek lab released
  an updated DeepSeek-V3, it also released <strong>DeepGEMM</strong>, a library
  of GEMM kernels with strong FP8 performance on the Hopper architecture.
</p>

<p>
  Manual selection lets an engineer insert a DeepGEMM kernel as a plugin. The
  plugin speeds up one specific step, such as multiplying two matrices of
  precise dimensions.
</p>

<Callout type="warning">
  <p>
    A manually selected kernel creates a compatibility obligation. Suppose a team
    moves from Hopper GPUs to a B200. The team must either swap back to a
    general kernel, wait for the library to add Blackwell support, or port the
    kernel itself. DeepGEMM added Blackwell support by the time of the book's
    publication, but the obligation applies to every hand-picked kernel.
  </p>
</Callout>
