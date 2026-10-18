<script module>
  export const pageConfig = { title: 'Memory Round Trips' };
</script>

<script>
  import KernelFusionDiagram from '../../../components/KernelFusionDiagram.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Memory Round Trips</h1>

<p>
  Running two <Term id="kernel">kernels</Term> back-to-back on the same data wastes
  memory accesses. The first kernel writes its result to <Term id="vram" />, and the
  second kernel reads that same result back.
</p>

<p>
  <strong>Kernel fusion</strong> is the process of re-implementing two or more
  kernels as a single kernel that performs all of their operations. The fused
  kernel keeps intermediate results on chip and avoids the round trips through
  memory between kernels.
</p>

<h2>Counting accesses in a two-kernel chain</h2>

<p>
  Consider two kernels, <code>multiply_by_2</code> and <code>multiply_by_3</code>,
  applied to the vector <code>[1, 2, 3]</code>. The two columns below compare the
  separate kernels with a single fused kernel, <code>multiply_by_6</code>.
</p>

<div class="steps-compare">
  <section aria-labelledby="unfused-heading">
    <h3 id="unfused-heading">Two separate kernels</h3>
    <ol>
      <li><span class="mem-step">Read</span> the input vector <code>[1, 2, 3]</code> from memory.</li>
      <li>Run <code>multiply_by_2</code> on the vector.</li>
      <li><span class="mem-step">Write</span> the output vector <code>[2, 4, 6]</code> to memory.</li>
      <li><span class="mem-step">Read</span> the vector <code>[2, 4, 6]</code> from memory.</li>
      <li>Run <code>multiply_by_3</code> on the vector.</li>
      <li><span class="mem-step">Write</span> the final vector <code>[6, 12, 18]</code> to memory.</li>
    </ol>
    <p>Memory accesses: two reads and two writes.</p>
  </section>
  <section aria-labelledby="fused-heading">
    <h3 id="fused-heading">One fused kernel</h3>
    <ol>
      <li><span class="mem-step">Read</span> the input vector <code>[1, 2, 3]</code> from memory.</li>
      <li>Run <code>multiply_by_6</code> on the vector.</li>
      <li><span class="mem-step">Write</span> the final vector <code>[6, 12, 18]</code> to memory.</li>
    </ol>
    <p>Memory accesses: one read and one write.</p>
  </section>
</div>

<KernelFusionDiagram />

<p>
  Steps 3 and 4 of the unfused sequence form an unnecessary round trip to
  memory. An elementwise kernel performs about one arithmetic operation per value
  but moves at least two bytes per value, so it is
  <Term id="memory-bound">memory-bound</Term> on every modern GPU. Its runtime tracks the bytes it moves,
  and every avoidable read or write directly costs time.
</p>
