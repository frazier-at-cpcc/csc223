<script module>
  export const pageConfig = { title: 'Image Generation Kernel Optimization' };
</script>

<h1>Image Generation Kernel Optimization</h1>

<p>
  Model cards for image generation models usually show inference with the diffusers library and very
  few optimizations. Image generation is compute bound in theory. In practice, you often must select
  memory-efficient kernels and fuse kernels before the workload even reaches that compute bound.
</p>

<h2>Three libraries</h2>

<div class="table-wrap">
  <table>
    <caption>Libraries for high-performance image model inference</caption>
    <thead>
      <tr><th scope="col">Library</th><th scope="col">Character</th><th scope="col">Choose it when</th></tr>
    </thead>
    <tbody>
      <tr><td>SGLang Diffusion</td><td>Performant engines built for popular image and video architectures</td><td>You want a working, fast implementation now</td></tr>
      <tr><td>TensorRT</td><td>High-quality black-box implementations of popular models with NVIDIA's in-house kernels</td><td>You want a working, fast implementation now</td></tr>
      <tr><td>PyTorch</td><td>Careful kernel selection and fusion</td><td>You need control, flexibility, and the highest performance through deep customization</td></tr>
    </tbody>
  </table>
</div>

<h2>Kernels that matter</h2>

<ul>
  <li>
    <strong>Attention:</strong> the most essential kernel. Many models ship with FlashAttention 2.
    FlashAttention 3 performs better on Hopper GPUs, and FlashAttention 4 performs better on Blackwell
    GPUs.
  </li>
  <li>
    <strong>Small kernels:</strong> normalization functions such as RMSNorm are good candidates for
    fusion, which keeps memory use efficient.
  </li>
  <li>
    <strong>GEMM:</strong> general matrix multiplication kernels run the linear layers and matter for
    compute-bound inference. Linear layers are generally safe to quantize to 8-bit floating point, which
    doubles the available FLOPS on Tensor Cores. Kernels from CuTe, CUTLASS, or DeepGEMM may be the most
    efficient, depending on the model.
  </li>
</ul>

<h2>Torch compilation</h2>

<p>
  Torch compilation fuses kernels automatically and accepts manually selected kernels through a plugin
  system. Compilation takes several minutes, so cache the compiled engine to shorten load time when a
  node starts.
</p>

<p>
  Compilation targets the exact GPU model that performs it. To run a model on a B200, compile it on a
  B200.
</p>
