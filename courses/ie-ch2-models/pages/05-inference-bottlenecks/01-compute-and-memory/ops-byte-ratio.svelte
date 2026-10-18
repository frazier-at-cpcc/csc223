<script module>
  export const pageConfig = { title: 'The Ops:Byte Ratio' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>The Ops:Byte Ratio</h1>

<p>
  Every GPU has a specific compute speed, measured in operations per second, and a specific memory bandwidth,
  measured in gigabytes or terabytes per second. Dividing one by the other gives the GPU's
  <strong>ops:byte ratio</strong>: the peak number of operations it can perform for each byte it moves, at a given
  <Term id="precision">precision</Term>.
</p>

<p>
  Two conventions apply to every calculation in this section. A multiply followed by an add counts as two
  floating-point operations. Specification sheets quote dense compute, which excludes the doubled figures that
  <Term id="structured-sparsity">structured sparsity</Term> allows, and inference usually runs dense.
</p>

<Signal kind="worked" title="H100 in FP16">
  <p>
    FP16 is a 16-bit floating-point format that stores each value in 2 bytes. The
    <Term id="h100">H100</Term> SXM lists these dense FP16 figures:
  </p>
  <pre><code>Dense FP16 compute:   989 teraFLOPS = 989 × 10^12 operations per second
Memory bandwidth:     3.35 TB/s     = 3.35 × 10^12 bytes per second

ops:byte = (989 × 10^12) / (3.35 × 10^12)
         ≈ 295 operations per byte</code></pre>
  <p>
    For FP16 inference on an H100 to be perfectly balanced, the system must perform about 295 floating-point
    operations for every byte it reads from memory. Fewer operations per byte leave compute idle. More operations
    per byte leave memory bandwidth idle.
  </p>
</Signal>

<Signal kind="mistake" title="Mixing unit prefixes">
  <p>
    The units cancel to operations per byte only when both numbers use the same prefix. Dividing teraFLOPS by
    gigabytes per second without converting gives an answer that is off by a factor of 1,000. Convert both
    values to plain operations and bytes first.
  </p>
</Signal>

<NumericQuestion
  id="ob_faded"
  question="Complete the last step. An A100 delivers 312 teraFLOPS of dense FP16 compute, which is 312 × 10^12 operations per second. Its memory bandwidth is 2,039 GB/s, which is 2.039 × 10^12 bytes per second. What is its FP16 ops:byte ratio, to the nearest whole number?"
  answer={153}
  tolerance={1}
  unit="operations per byte"
  correctFeedback="(312 × 10^12) / (2.039 × 10^12) ≈ 153 operations per byte. The A100 reaches its compute ceiling at about half the intensity an H100 needs."
  incorrectFeedback="Divide operations per second by bytes per second after both use the same power of ten: 312 / 2.039 ≈ 153 operations per byte."
/>

<p>The next page shows how to measure the operations per byte that an algorithm actually performs.</p>
