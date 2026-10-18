<script module>
  export const pageConfig = { title: 'The Ops:Byte Ratio' };
</script>

<h1>The Ops:Byte Ratio</h1>

<p>
  Every GPU has a specific compute speed, measured in operations per second, and a specific memory
  bandwidth, measured in gigabytes or terabytes per second. Dividing one by the other gives the GPU's
  <strong>ops:byte ratio</strong>: the peak number of operations it can perform for each byte it moves,
  at a given precision.
</p>

<h2>Worked example: H100 in FP16</h2>

<pre><code>Dense FP16 compute:   989 teraFLOPS = 989 × 10^12 operations per second
Memory bandwidth:     3.35 TB/s     = 3.35 × 10^12 bytes per second

ops:byte = (989 × 10^12) / (3.35 × 10^12)
         ≈ 295 operations per byte</code></pre>

<p>
  The units cancel to operations per byte because both numbers use the same prefix, tera. Mixing
  prefixes, such as teraFLOPS with gigabytes per second, produces an answer that is off by a factor of
  1,000.
</p>

<h2>What the ratio means</h2>

<p>
  For FP16 inference on an H100 to be perfectly balanced, the system must perform 295 floating-point
  operations for every byte of memory it accesses. Fewer operations per byte leave compute idle. More
  operations per byte leave memory bandwidth idle.
</p>

<p>The next page shows how to measure the operations per byte that an algorithm actually performs.</p>
