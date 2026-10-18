<script module>
  export const pageConfig = { title: 'Image Generation Kernel Optimization' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Accordion, AccordionItem } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Image Generation Kernel Optimization</h1>

<p>
  Model cards for image generation models usually show inference with the diffusers library and very
  few optimizations. Image generation is compute bound in theory. In practice, you often must select
  memory-efficient <Term id="kernel">kernels</Term> and fuse kernels before the workload even reaches
  that compute bound.
</p>

<h2>Two paths to a fast implementation</h2>

<div class="table-wrap" role="region" aria-label="Choosing an implementation path for image model inference" use:scrollable>
  <table>
    <caption>Choosing an implementation path for image model inference</caption>
    <thead>
      <tr><th scope="col">Path</th><th scope="col">Character</th><th scope="col">Choose it when</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Prebuilt engine: SGLang Diffusion or TensorRT</td>
        <td>
          Performant implementations of popular image and video architectures. TensorRT ships black-box
          implementations with NVIDIA's in-house kernels.
        </td>
        <td>You serve a popular model and want a working, fast implementation now</td>
      </tr>
      <tr>
        <td>PyTorch with selected and fused kernels</td>
        <td>Careful kernel selection and fusion under your control</td>
        <td>You need flexibility or the highest performance through deep customization</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Kernels that matter</h2>

<ul>
  <li>
    <strong>Attention:</strong> the most essential kernel. At the book's publication in 2025, many models
    shipped with <Term id="flashattention">FlashAttention</Term> 2. FlashAttention 3 performed better on
    Hopper GPUs, and FlashAttention 4 performed better on Blackwell GPUs. Match the attention kernel to
    the GPU generation.
  </li>
  <li>
    <strong>Small kernels:</strong> <Term id="normalization-layer">normalization functions</Term> such as
    RMSNorm, which rescale each hidden state to a consistent range, are good candidates for
    <Term id="kernel-fusion">fusion</Term>. Fusion keeps their data on chip instead of writing it to
    memory between steps.
  </li>
  <li>
    <strong>Matrix multiplication:</strong> <Term id="gemm">GEMM</Term> kernels run the linear layers and
    matter for compute-bound inference. Linear layers are generally safe to quantize to 8-bit floating
    point, which doubles the available FLOPS on <Term id="tensor-core">Tensor Cores</Term>.
  </li>
</ul>

<Accordion>
  <AccordionItem title="Kernel libraries named in the book">
    <p>
      For GEMM, kernels from CuTe, CUTLASS, or DeepGEMM may be the most efficient, depending on the model.
      Test each candidate on your own model rather than assuming one library wins everywhere.
    </p>
  </AccordionItem>
</Accordion>

<h2>Torch compilation</h2>

<p>
  <Term id="torch-compile">Torch compilation</Term> fuses kernels automatically and accepts manually
  selected kernels through a plugin system. Compilation takes several minutes, so cache the compiled
  engine to shorten load time when a node starts.
</p>
<p>
  Compilation targets the exact GPU model that performs it. To run a model on a B200, compile it on a
  B200.
</p>
