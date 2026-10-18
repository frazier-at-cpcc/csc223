<script module>
  export const pageConfig = { title: 'A First CUDA Kernel' };
</script>

<script>
  import CodeFigure from '../../../components/CodeFigure.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';

  const kernel = `__global__ void doubleArray(float *arr, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        arr[i] *= 2.0f;
    }
}`;
</script>

<h1>A First CUDA Kernel</h1>

<p>
  The "Hello, World!" of CUDA is a kernel that doubles every element of an
  array. The kernel below takes an array of length <code>n</code> and multiplies
  each element by two.
</p>

<CodeFigure
  code={kernel}
  language="cpp"
  caption="Figure 4.1. An example CUDA kernel doubles each value in an array."
/>

<h2>Reading the kernel</h2>

<p>
  A kernel launch starts a grid of <Term id="thread-block">thread blocks</Term>. Each
  block is a group of GPU <Term id="thread">threads</Term> that run on the same
  Streaming Multiprocessor. CUDA gives every thread three built-in values for
  finding its place in that grid:
</p>

<ul>
  <li><code>blockIdx.x</code> is the number of the thread's block within the grid.</li>
  <li><code>blockDim.x</code> is the number of threads in each block.</li>
  <li><code>threadIdx.x</code> is the thread's position within its own block.</li>
</ul>

<p>
  The kernel combines them into one global index. With blocks of 256 threads,
  thread 10 of block 3 computes <code>i = 3 × 256 + 10 = 778</code>, so it handles
  element 778 of the array.
</p>

<ul>
  <li>The <code>__global__</code> qualifier marks the function as a kernel that runs on the GPU.</li>
  <li>The <code>if (i &lt; n)</code> check stops threads whose index falls past the end of the array.</li>
  <li>Each remaining thread doubles exactly one element.</li>
</ul>

<h2>Why the GPU version is faster</h2>

<p>
  A CPU core doubles the elements one after another. A GPU assigns one element
  to each of thousands of threads, so the same total work finishes far sooner.
</p>

<Signal kind="mistake" title="Parallelism does not reduce the work">
  <p>
    The GPU still performs one multiplication per element, so the total work
    grows in proportion to <code>n</code> on both processors. Parallelism shortens
    the wall-clock time by spreading that work across threads. It does not change
    how much work there is.
  </p>
</Signal>

<h2>From algorithms to implementations</h2>

<p>
  Writing CUDA kernels shifts the engineer's attention from the algorithm to its
  implementation. The standard <Term id="attention">attention</Term> algorithm fits in a few dozen
  lines of code. <Term id="flashattention" /> computes the same mathematical
  operation, but its implementation takes tens of thousands of lines. The extra
  code makes the algorithm more memory-efficient on a specific GPU.
</p>
