<script module>
  export const pageConfig = { title: 'Worked Example: Unfused Attention over a Full Prompt' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Figure from '../../../components/Figure.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Worked Example: Unfused Attention over a Full Prompt</h1>

<p>
  This example comes from the book. It calculates the arithmetic intensity of the standard attention algorithm
  over a whole 4,096-token sequence at once. All 4,096 queries are processed together, which is the shape of
  prefill. The model has a 128-dimensional attention head (d = 128), and the sequence holds 4,096 tokens
  (N = 4096). The calculation uses the standard algorithm with no <Term id="kernel">kernel</Term> optimizations.
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

<p>
  <Term id="hbm">HBM</Term> is the high-bandwidth memory that serves as the <Term id="gpu">GPU</Term>'s <Term id="vram">VRAM</Term>. Each line of the algorithm
  is a separate kernel that reads its inputs from HBM and writes its result back.
</p>

<Signal kind="worked" title="Intensity of unfused attention, N = 4,096 and d = 128">
  <h2>Step 1: Establish the matrix sizes</h2>

  <ul>
    <li>Q, K, and V are N × d, or 4,096 × 128.</li>
    <li>S and P are N × N, or 4,096 × 4,096.</li>
    <li>O is N × d, or 4,096 × 128.</li>
  </ul>

  <p>Assume FP16, where each value takes 2 bytes. One 4,096 × 4,096 matrix in FP16 takes 32 MiB.</p>

  <h2>Step 2: Count reads, compute, and writes for each line</h2>

  <Figure
    number="2.15"
    caption="Memory movement (reads and writes) and compute work for the attention implementation in Figure 2.14."
  >
    <div class="ie-table-wrap" role="region" aria-label="Bytes read, operations performed, and bytes written per algorithm line" use:scrollable>
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

  <Figure number="2.16" caption="The total memory movement is the sum of the reads and writes of each line in Figure 2.15.">
    <pre><code># Memory movement in bytes, grouped by algorithm line
line 1:  4Nd  + 2N²          (read Q and K, write S)
line 2:  2N²  + 2N²          (read S, write P)
line 3:  2N²  + 2Nd + 2Nd    (read P and V, write O)

total =  8N² + 8Nd bytes</code></pre>
  </Figure>

  <h2>Step 4: Total the compute</h2>

  <Figure number="2.17" caption="The total compute is the sum of the operations of each line in Figure 2.15.">
    <pre><code># Compute in floating-point operations
line 1:  2dN²
line 2:  3N²
line 3:  2N²d

total =  4N²d + 3N² operations</code></pre>
  </Figure>

  <h2>Step 5: Divide work by memory traffic</h2>

  <Figure number="2.18" caption="The arithmetic intensity of a kernel is the total work divided by the total memory movement.">
    <pre><code>intensity = (4N²d + 3N² operations) / (8N² + 8Nd bytes)

operations = 4 × 4,096² × 128 + 3 × 4,096² = 8,640,266,240
bytes      = 8 × 4,096²       + 8 × 4,096 × 128 =   138,412,032

intensity  ≈ 62 operations per byte</code></pre>
  </Figure>

  <h2>Step 6: Compare with the hardware and find the cause</h2>

  <p>
    The intensity of 62 is below the H100's ops:byte ratio of 295, so this unfused kernel is memory bound. The
    cause is the 8N² term. Lines 1 and 2 write the N × N matrices S and P to HBM, and lines 2 and 3 read them
    back. Those round trips dominate the traffic.
  </p>

  <p>
    <Term id="flashattention">FlashAttention</Term>, covered in the next section, keeps S and P in on-chip memory. Only Q, K, and V are read and
    only O is written, so the traffic falls to 8Nd bytes while the operations stay the same.
  </p>

  <pre><code>bytes with S and P kept on chip = 8 × 4,096 × 128 = 4,194,304
intensity = 8,640,266,240 / 4,194,304 = 2,060 operations per byte</code></pre>

  <p>
    At 2,060 operations per byte, full-prompt attention is far above the ridge point and compute bound. This is
    why prefill attention runs compute bound in practice.
  </p>
</Signal>

<Signal kind="mistake" title="Using this example to prove decode is memory bound">
  <p>
    This example processes every query of the sequence at once, so it describes prefill, not decode. Its low
    intensity comes from writing S and P to memory, a flaw of the unfused kernel that FlashAttention removes. Decode
    is memory bound for a different reason: each step reads all the weights and the whole KV cache to process a
    single token, as the previous page calculated.
  </p>
</Signal>
