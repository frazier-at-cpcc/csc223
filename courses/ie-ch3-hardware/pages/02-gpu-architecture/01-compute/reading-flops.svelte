<script module>
  export const pageConfig = { title: 'Reading FLOPS on a Spec Sheet' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Reading FLOPS on a Spec Sheet</h1>

<p>
  <strong>FLOPS</strong> (floating-point operations per second) measures compute, typically on Tensor Cores.
  Datacenter GPUs deliver trillions or quadrillions of FLOPS, written as teraFLOPS and petaFLOPS.
</p>

<h2>Dense versus sparse FLOPS</h2>
<p>A GPU spec sheet usually lists two Tensor Core figures for each precision.</p>
<dl>
  <dt><strong>Dense</strong></dt>
  <dd>The raw floating-point operations per second when every element of the <Term id="tensor">tensor</Term> is used.</dd>
  <dt><strong>Sparse</strong></dt>
  <dd>
    The rate for tensors with <Term id="structured-sparsity">2:4 structured sparsity</Term>. In this pattern, two
    of every four values are zero, so 50 percent of the values are 0. Tensor Cores skip the multiplications by
    zero.
  </dd>
</dl>
<p>
  The sparse figure is often, but not always, double the dense figure at the same precision. Inference is
  dense by default, because model <Term id="weights">weights</Term> rarely follow the 2:4 pattern. Read the FLOPS figure without
  sparsity.
</p>

<h2>Precision changes the number</h2>
<p>
  FLOPS generally double each time <Term id="precision">precision</Term> halves. A GPU that delivers 1 petaFLOPS on 16-bit
  numbers delivers about 2 petaFLOPS on 8-bit numbers and about 4 petaFLOPS on 4-bit numbers, when its Tensor
  Cores support those formats.
</p>

<h2>The two-step normalization</h2>
<p>To compare two spec sheets, convert both figures to the same basis. Dense <Term id="fp8">FP8</Term> is a common choice.</p>
<ol class="ie-steps">
  <li>Remove sparsity: divide a sparse figure by 2.</li>
  <li>Match precision: multiply by 2 for each halving of precision, or divide by 2 for each doubling.</li>
</ol>

<Signal kind="worked" title="Normalizing two spec sheets">
  <p>Two spec sheets list the following Tensor Core figures:</p>
  <ul>
    <li>GPU X: 3,200 teraFLOPS at FP4, sparse.</li>
    <li>GPU Y: 700 teraFLOPS at FP16, dense.</li>
  </ul>
  <p>The raw numbers suggest that GPU X has more than four times the compute. Normalize both to dense FP8.</p>
  <ol class="ie-steps">
    <li>Convert GPU X in two steps. Remove sparsity: 3,200 ÷ 2 = 1,600 teraFLOPS dense FP4. Match precision: FP8 doubles the precision of FP4, which halves the rate: 1,600 ÷ 2 = 800 teraFLOPS dense FP8.</li>
    <li>Match precision for GPU Y. Its figure is already dense. FP8 is half the precision of FP16: 700 × 2 = 1,400 teraFLOPS dense FP8.</li>
    <li>Compare on the same basis: GPU Y offers 1,400 teraFLOPS and GPU X offers 800. GPU Y leads by about 1.75 times.</li>
  </ol>
  <p>The comparison reversed once both figures shared a basis.</p>
</Signal>

<Signal kind="mistake" title="Mixing bases">
  <p>
    Comparing an FP8 figure with an FP16 figure, or a sparse figure with a dense one, distorts the comparison.
    The distortion can exaggerate a gap, hide one, or reverse the winner, as the worked example shows. Normalize
    both figures before you compare them.
  </p>
</Signal>

<h2>Faded example: normalizing a second pair</h2>
<p>
  GPU P lists 2,400 teraFLOPS at FP8, sparse. GPU Q lists 500 teraFLOPS at FP16, dense. Step 1 is done: GPU P
  delivers 2,400 ÷ 2 = 1,200 teraFLOPS dense FP8.
</p>

<NumericQuestion
  id="flops_faded"
  question="Step 2: convert GPU Q to dense FP8. How many teraFLOPS of dense FP8 compute does GPU Q deliver?"
  answer={1000}
  unit="teraFLOPS"
  correctFeedback="Correct. GPU Q is already dense, and halving precision from FP16 to FP8 doubles the rate: 500 × 2 = 1,000 teraFLOPS. GPU P leads, 1,200 to 1,000."
  incorrectFeedback="GPU Q's figure is already dense, so only the precision changes. Halving precision doubles the rate: 500 × 2 = 1,000 teraFLOPS dense FP8. GPU P leads, 1,200 to 1,000."
/>

<h2>Practice: normalizing spec sheets</h2>
<p>Assume that sparsity doubles a figure and that each halving of precision doubles a figure.</p>

<p class="ie-obj">Objective 3: Calculate dense FLOPS at a common precision</p>
<NumericQuestion
  id="flops_practice_1"
  question="A spec sheet lists 1,320 teraFLOPS at FP8 with sparsity. What dense FP16 rate should you expect?"
  answer={330}
  unit="teraFLOPS"
  correctFeedback="Correct. Removing sparsity halves the figure to 660 teraFLOPS dense FP8. FP16 doubles the precision, which halves the rate again: 660 ÷ 2 = 330 teraFLOPS dense FP16."
  incorrectFeedback="Apply both steps. Remove sparsity: 1,320 ÷ 2 = 660 teraFLOPS dense FP8. Move to FP16, which doubles the precision and halves the rate: 660 ÷ 2 = 330 teraFLOPS dense FP16."
/>

<p class="ie-obj">Objective 3: Calculate dense FLOPS at a common precision</p>
<NumericQuestion
  id="flops_practice_2"
  question="A spec sheet lists 2,200 teraFLOPS at FP4, dense. What dense FP8 rate should you expect from the same GPU?"
  answer={1100}
  unit="teraFLOPS"
  correctFeedback="Correct. FP8 has twice the precision of FP4, so the rate halves: 2,200 ÷ 2 = 1,100 teraFLOPS dense FP8."
  incorrectFeedback="The figure is already dense. Moving from FP4 to FP8 doubles the precision, which halves the rate: 2,200 ÷ 2 = 1,100 teraFLOPS dense FP8."
/>
