<script module>
  export const pageConfig = { title: 'Memory Round Trips' };
</script>

<script>
  import KernelFusionDiagram from '../../../components/KernelFusionDiagram.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
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

<h2>The general rule in bytes</h2>

<p>
  Let <em>S</em> be the size of the tensor in bytes, the number of values times
  the bytes per value. A chain of <em>k</em> elementwise kernels reads and writes
  the tensor once per kernel. Fusion keeps only the first read and the last write.
</p>

<ul>
  <li>Unfused traffic: 2 × <em>k</em> × <em>S</em> bytes.</li>
  <li>Fused traffic: 2 × <em>S</em> bytes.</li>
  <li>Traffic removed: 2 × (<em>k</em> − 1) × <em>S</em> bytes.</li>
</ul>

<Signal kind="worked" title="Bytes removed by fusing three kernels">
  <p>
    An activation tensor holds 8,000,000 FP16 values. Three elementwise kernels
    run on it in sequence: add a bias, apply an activation function, and scale the
    result. Use 1 MB = 10<sup>6</sup> bytes.
  </p>
  <ol>
    <li>Size the tensor. FP16 uses 2 bytes per value, so <em>S</em> = 8,000,000 × 2 = 16,000,000 bytes, or 16 MB.</li>
    <li>Count the unfused traffic. Each of the 3 kernels reads and writes the tensor once: 2 × 3 × 16 MB = 96 MB.</li>
    <li>Count the fused traffic. One read of the input and one write of the result: 2 × 16 MB = 32 MB.</li>
    <li>Subtract. Fusion removes 96 MB − 32 MB = 64 MB. The shortcut 2 × (3 − 1) × 16 MB gives the same 64 MB.</li>
    <li>Convert to time. At the H100 bandwidth of 3.35 TB/s, 64 × 10<sup>6</sup> bytes ÷ 3.35 × 10<sup>12</sup> bytes per second is about 19 microseconds saved every time the chain runs. A model runs such a chain in every layer of every forward pass, so the savings add up.</li>
  </ol>
</Signal>

<Signal kind="mistake" title="Fusion keeps the first read and the last write">
  <p>
    Fusion cannot remove every memory access. The fused kernel still has to read
    its input from memory and write its final result back. Only the intermediate
    writes and reads between kernels disappear, which is why the count is
    <em>k</em> − 1 round trips and not <em>k</em>.
  </p>
</Signal>

<h2>Finish the calculation</h2>

<p>
  A tensor holds 5,000,000 FP16 values, and a chain of 4 elementwise kernels runs
  on it. The first three steps are done for you.
</p>

<ol>
  <li><em>S</em> = 5,000,000 × 2 bytes = 10 MB.</li>
  <li>Unfused traffic = 2 × 4 × 10 MB = 80 MB.</li>
  <li>Fused traffic = 2 × 10 MB = 20 MB.</li>
</ol>

<NumericQuestion
  id="fade_fusion"
  question="Complete step 4. How many megabytes of memory traffic does fusing the 4 kernels remove?"
  answer={60}
  tolerance={0.5}
  unit="MB"
  correctFeedback="80 MB − 20 MB = 60 MB, which matches 2 × (4 − 1) × 10 MB."
  incorrectFeedback="Subtract the fused traffic from the unfused traffic: 80 MB − 20 MB = 60 MB. The shortcut 2 × (k − 1) × S gives 2 × 3 × 10 MB = 60 MB."
/>
