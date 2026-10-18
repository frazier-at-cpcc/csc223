<script module>
  export const pageConfig = { title: 'A First CUDA Kernel' };
</script>

<script>
  import CodeFigure from '../../../components/CodeFigure.svelte';

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

<ul>
  <li>The <code>__global__</code> qualifier marks the function as a kernel that runs on the GPU.</li>
  <li>Each GPU thread computes its own index, <code>i</code>, from its block and thread position.</li>
  <li>The <code>if (i &lt; n)</code> check stops threads whose index falls past the end of the array.</li>
  <li>Each remaining thread doubles exactly one element.</li>
</ul>

<h2>Why the GPU version is faster</h2>

<p>
  On a CPU, the same function runs in linear time. The CPU doubles each element
  in sequence. On a GPU, thousands of threads double thousands of elements at
  the same time.
</p>

<h2>From algorithms to implementations</h2>

<p>
  Writing CUDA kernels shifts the engineer's attention from the algorithm to its
  implementation. The standard attention algorithm fits in a few dozen lines of
  code. FlashAttention computes the same mathematical operation, but its
  implementation takes tens of thousands of lines. The extra code makes the
  algorithm more memory-efficient on a specific GPU.
</p>
