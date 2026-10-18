<script module>
  export const pageConfig = { title: 'Worked Example: Arithmetic Intensity of Attention' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Figure from '../../../components/Figure.svelte';
</script>

<h1>Worked Example: Arithmetic Intensity of Attention</h1>

<p>
  This example calculates the arithmetic intensity of one decode step. The model has a 128-dimensional
  attention head (d = 128). The sequence holds 4,096 tokens (N = 4096). The calculation uses the
  standard attention algorithm with no optimizations.
</p>

<Figure
  number="2.14"
  caption="Standard attention implementation, adapted from 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness' (Dao et al., 2022)."
>
  <pre><code>Algorithm 0: Standard Attention Implementation
Require: Matrices Q, K, V of size N × d in HBM.
1. Load Q, K by blocks from HBM, compute S = QKᵀ, write S to HBM.
2. Read S from HBM, compute P = softmax(S), write P to HBM.
3. Load P and V by blocks from HBM, compute O = PV, write O to HBM.
4. Return O.</code></pre>
</Figure>

<p>HBM is the GPU's high-bandwidth main memory.</p>

<h2>Step 1: Establish the matrix sizes</h2>

<ul>
  <li>N, the sequence length, is 4096.</li>
  <li>d, the dimension of the attention head, is 128.</li>
  <li>Q, K, and V are N × d, or 4096 × 128.</li>
  <li>S and P are N × N, or 4096 × 4096.</li>
  <li>O is N × d, or 4096 × 128.</li>
</ul>

<p>
  Assume FP16 inference, where each value takes two bytes. A 4096 × 4096 matrix in FP16 is about 32 MiB,
  roughly the size of a high-resolution RAW photo from a DSLR camera.
</p>

<h2>Step 2: Count reads, compute, and writes for each line</h2>

<p>Each line of the algorithm loads data from memory, performs a calculation, and stores the result in memory.</p>

<Figure
  number="2.15"
  caption="Memory movement (reads and writes) and compute work for the attention implementation in Figure 2.14."
>
  <div class="ie-table-wrap">
    <table class="ie-table">
      <caption>Bytes read, operations performed, and bytes written per algorithm line</caption>
      <thead>
        <tr><th scope="col">Line</th><th scope="col">Read (bytes)</th><th scope="col">Compute (operations)</th><th scope="col">Write (bytes)</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">1. S = QKᵀ</th><td>Q = 2·N·d<br />K = 2·N·d</td><td>S = (2·d)·(N·N)</td><td>S = 2·N·N</td></tr>
        <tr><th scope="row">2. P = softmax(S)</th><td>S = 2·N·N</td><td>P = 3·(N·N)</td><td>P = 2·N·N</td></tr>
        <tr><th scope="row">3. O = PV</th><td>P = 2·N·N<br />V = 2·N·d</td><td>O = (2·N)·(N·d)</td><td>O = 2·N·d</td></tr>
      </tbody>
    </table>
  </div>
</Figure>

<h2>Step 3: Total the memory movement</h2>

<p>Sum the read and write columns, which track traffic to and from GPU memory.</p>

<Figure number="2.16" caption="The total memory movement for a kernel is the sum of all reads and writes across the three steps.">
  <pre><code># Total memory movement in bytes
= (2*2*(N*d))+(2*(N*N))         +
  (2*((N*N)+(N*d)))+(2*(N*N))   +
  (2*(N*N))+(2*(N*d))

= 8N² + 8Nd bytes</code></pre>
</Figure>

<h2>Step 4: Total the compute</h2>

<p>Sum the compute column.</p>

<Figure number="2.17" caption="The total compute for the kernel is the sum of operations across the three steps.">
  <pre><code># Total compute in floating point operations
= ((2*d)*(N*N)) +
  (3*(N*N))     +
  ((2*N)*(N*d))

= 4(N²)d + 3N² ops</code></pre>
</Figure>

<h2>Step 5: Divide work by memory traffic</h2>

<Figure number="2.18" caption="The arithmetic intensity of a kernel is the total work, the number of compute operations, divided by the memory movement.">
  <pre><code># Arithmetic intensity
= (4(N²)d + 3N² ops) / (8N² + 8Nd bytes)

= 62 ops:byte</code></pre>
</Figure>

<p>Substituting N = 4096 and d = 128 confirms the result:</p>

<pre><code>ops   = 4 × 4096² × 128 + 3 × 4096²  = 8,640,266,240
bytes = 8 × 4096² + 8 × 4096 × 128   =   138,412,032

intensity = 8,640,266,240 / 138,412,032 ≈ 62 operations per byte</code></pre>

<h2>Step 6: Compare with the hardware</h2>

<p>
  The arithmetic intensity of 62 is far below the H100's ops:byte ratio of 295. The kernel sits on the
  diagonal bandwidth ceiling of the roofline, so it is memory bound. The exact numbers vary by model,
  sequence length, and hardware. The general principle holds: decode is memory bound.
</p>

<Callout type="info">
  <p>
    Inference engineers do not calculate arithmetic intensity by hand as a routine task. Working through
    the calculation once builds intuition for why each phase has the bottleneck it has.
  </p>
</Callout>
