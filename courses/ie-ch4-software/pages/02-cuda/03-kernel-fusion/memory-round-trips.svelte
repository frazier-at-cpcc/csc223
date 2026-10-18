<script module>
  export const pageConfig = { title: 'Memory Round Trips' };
</script>

<h1>Memory Round Trips</h1>

<p>
  Running two kernels back-to-back on the same data wastes memory accesses. The
  first kernel writes its result to memory, and the second kernel reads that same
  result back.
</p>

<p>
  <strong>Kernel fusion</strong> is the process of re-implementing two or more
  kernels as a single kernel that performs all of their operations. The fused
  kernel avoids the round trips through memory between them.
</p>

<h2>A worked example</h2>

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

<h2>Why the saved round trip matters</h2>

<p>
  Steps 3 and 4 of the unfused sequence form an unnecessary round trip to
  memory. Decode is the memory-bandwidth-bound phase of LLM inference. During
  decode, every avoidable read or write directly costs time, so an inference
  engine cannot afford wasted memory traffic.
</p>

<p>
  The general rule follows from the example. A chain of <em>k</em> separate
  elementwise kernels performs <em>k</em> reads and <em>k</em> writes. Fusing the
  chain into one kernel reduces that to one read and one write.
</p>
