<script module>
  export const pageConfig = { title: 'Kernel Fusion in Practice' };
</script>

<script>
  import KernelFusionDiagram from '../../../components/KernelFusionDiagram.svelte';
</script>

<h1>Kernel Fusion in Practice</h1>

<p>
  Real kernel fusion is far more complicated than the multiplication example.
  Real functions are more complex, and their data does not overlap as cleanly.
  The goal stays the same: move data between memory and compute as few times as
  possible.
</p>

<KernelFusionDiagram />

<h2>Common fusion patterns</h2>

<p>
  Inference workloads repeat a few fusion patterns. One common pattern combines
  a matrix multiplication, the bias addition that follows it, and the activation
  function after that into a single kernel.
</p>

<h2>Automatic and manual fusion</h2>

<ul>
  <li>
    Automatic fusion: compilers identify straightforward fusion opportunities
    and generate fused kernels without engineer involvement.
  </li>
  <li>
    Manual fusion: sophisticated algorithms such as FlashAttention require
    handwritten fused kernels. Engines load these kernels as plugins during
    inference.
  </li>
</ul>
