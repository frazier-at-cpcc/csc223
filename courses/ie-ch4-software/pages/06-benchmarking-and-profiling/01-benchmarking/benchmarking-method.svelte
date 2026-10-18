<script module>
  export const pageConfig = { title: 'Benchmarking Method' };
</script>

<h1>Benchmarking Method</h1>

<p>
  Great benchmarks are realistic and consistent. Consistency comes from method.
</p>

<h2>Gather enough data</h2>

<p>
  Send enough traffic to get a reliable reading that outliers cannot sway. When
  results are uncertain, run the benchmark several times and average the results.
</p>

<h2>Start from a baseline</h2>

<p>
  Before any optimization work, record a solid baseline benchmark. Every later
  result is a comparison against that baseline.
</p>

<h2>Change one variable at a time</h2>

<ol>
  <li>Keep the benchmark configuration fixed while testing optimizations.</li>
  <li>Test each optimization on its own against the baseline.</li>
  <li>Test the optimizations together to see how they combine.</li>
</ol>

<p>
  Testing both ways shows what actually drives an improvement. Some optimizations
  work against each other. Speculative decoding, for example, can lose its
  benefit at large batch sizes.
</p>

<p>
  The same rule applies to the benchmark itself. Teams often need to test several
  traffic patterns or sequence shapes. Change only one of these variables per
  run, as in any controlled experiment, so the results stay clear.
</p>
