<script module>
  export const pageConfig = { title: 'Kernel Libraries' };
</script>

<h1>Kernel Libraries</h1>

<p>
  Writing CUDA kernels does not mean starting from nothing. Kernel engineers
  build on libraries and specifications, some of which predate CUDA by decades.
</p>

<h2>BLAS and cuBLAS</h2>

<p>
  <strong>BLAS</strong> (Basic Linear Algebra Subprograms) is a specification
  for common linear algebra operations, from dot products to matrix
  multiplication. Its first implementation was written for Fortran in the 1970s.
</p>

<p>
  <strong>cuBLAS</strong> is the CUDA implementation of BLAS. It provides
  pre-built kernels for essential linear algebra operations. Its companion,
  <strong>cuDNN</strong> (CUDA Deep Neural Network), provides primitives for
  building neural networks.
</p>

<h2>GEMM: the operation that dominates inference</h2>

<p>
  <strong>GEMM</strong> (General Matrix-Matrix Multiplication) is the BLAS
  operation that inference uses most. Every linear layer in a model performs a
  matrix multiplication. cuBLAS provides a strong GEMM implementation as a
  starting point.
</p>

<p>
  Some workloads need finer control than cuBLAS offers. An engineer might write
  separate GEMM kernels for matrices of different shapes, or tune a kernel for a
  specific GPU architecture.
</p>

<h2>Template libraries for custom kernels</h2>

<table class="data">
  <caption>Libraries for writing and sourcing high-performance kernels</caption>
  <thead>
    <tr>
      <th scope="col">Library</th>
      <th scope="col">What it provides</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">CUTLASS</th>
      <td>A CUDA C++ template library of building blocks for high-performance, architecture-tuned GEMM and related kernels. FlashAttention 3 uses CUTLASS.</td>
    </tr>
    <tr>
      <th scope="row">CuTe</th>
      <td>A C++ template library that abstracts tiled tensor operations for recent GPU architectures.</td>
    </tr>
    <tr>
      <th scope="row">FlashInfer</th>
      <td>A library of ready-made kernels for LLM inference, including optimized attention kernels and fused sampling functions.</td>
    </tr>
  </tbody>
</table>

<p>
  CUTLASS and CuTe let engineers write kernels at a higher level of abstraction
  while keeping strong performance. FlashInfer supplies finished kernels that an
  engine can use directly.
</p>
