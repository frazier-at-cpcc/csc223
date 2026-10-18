<script module>
  export const pageConfig = { title: 'Matrix Multiply and Accumulate' };
</script>

<script>
  import MmaDiagram from '../../../components/MmaDiagram.svelte';
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
  never stores and reloads the intermediate product. Every layer of a transformer reduces to many MMA
  operations of this form, which is why MMA throughput defines inference compute.
</p>
