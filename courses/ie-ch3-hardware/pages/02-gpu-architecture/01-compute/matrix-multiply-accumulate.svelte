<script module>
  export const pageConfig = { title: 'Matrix Multiply and Accumulate' };
</script>

<script>
  import MmaDiagram from '../../../components/MmaDiagram.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Matrix Multiply and Accumulate</h1>

<p>
  <strong>Matrix Multiply and Accumulate (MMA)</strong> is the instruction that Tensor Cores execute. It
  combines two steps in one operation:
</p>
<ol>
  <li>Multiply matrix A by matrix B.</li>
  <li>Add the product to a base matrix C. This addition is the accumulate step.</li>
</ol>
<p>The result is stored as matrix D. Written as an equation, the operation is <code>D = (A × B) + C</code>.</p>

<MmaDiagram />

<h2>Why the accumulate step matters</h2>
<p>
  Large matrix multiplications are computed in tiles. Each tile's partial product adds onto the running total
  from earlier tiles. The accumulate step performs that addition inside the same instruction, so the hardware
  never stores and reloads the intermediate product.
</p>
<p>
  Most of the work in every <Term id="transformer">transformer</Term> layer reduces to MMA operations of this form. The
  normalization, softmax, and activation functions between them are not MMA work, but they
  account for a small share of the operations. MMA throughput therefore defines inference compute.
</p>
