<script module>
  export const pageConfig = { title: 'Anatomy of a Number Format' };
</script>

<script>
  import NumberFormatBits from '../../../components/NumberFormatBits.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Anatomy of a Number Format</h1>

<h2>Three attributes</h2>
<p>Every number format has three attributes.</p>
<ul>
  <li><strong>Precision</strong> is the number of bits that express one value. FP16 uses 16 bits.</li>
  <li><strong>Type</strong> states whether those bits represent an integer or a floating-point number.</li>
  <li>
    A <strong>scale factor</strong> is a multiplier stored with quantized values that maps them back to their
    original range.
  </li>
</ul>
<p>Together, these attributes determine two qualities of a format.</p>
<ul>
  <li><strong>Dynamic range</strong> is the span between the smallest and largest absolute values the format can represent.</li>
  <li><strong>Granularity</strong> is the number of values that share a single scale factor.</li>
</ul>

<h2>Dynamic range and the floating-point layout</h2>
<p>
  Sixteen bits can represent 65,536 distinct values. Eight bits can represent only 256. Dynamic range describes how
  far apart the smallest and largest of those few values sit.
</p>
<p>A <Term id="floating-point-format">floating-point format</Term> divides its bits into three parts.</p>
<ul>
  <li>The <strong>sign</strong> bit records whether the number is positive or negative.</li>
  <li>The <strong>exponent</strong> bits together encode a power of two.</li>
  <li>The <strong>mantissa</strong> bits together encode the base value that the power of two multiplies.</li>
</ul>
<p>
  An FP8 number in the E4M3 layout has a 4-bit exponent, a 3-bit mantissa, and 1 sign bit. An integer format has
  only a sign bit and value bits.
</p>

<NumberFormatBits />

<h2>Value spacing and outliers</h2>
<p>
  An integer format spaces its values evenly. INT8 represents the whole numbers from −128 to 127, one step apart. A
  floating-point format spaces its values closely near zero and widely at large magnitudes, because each exponent
  step doubles the value. That spacing gives floating-point formats a higher dynamic range than integer formats with
  the same number of bits.
</p>
<p>
  The range matters because of <Term id="outlier">outliers</Term>: values much larger in magnitude than their
  neighbors. Outliers carry significant information during inference. A floating-point format can represent an
  outlier and the small values around it at the same time, so it preserves outliers better after quantization.
</p>
