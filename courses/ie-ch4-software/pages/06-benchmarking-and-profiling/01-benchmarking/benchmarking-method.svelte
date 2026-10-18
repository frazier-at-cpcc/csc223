<script module>
  export const pageConfig = { title: 'Benchmarking Method' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
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
  Before any optimization work, record a solid <Term id="baseline">baseline</Term> benchmark.
  Every later result is a comparison against that baseline.
</p>

<h2>Change one variable at a time</h2>

<ol>
  <li>Keep the benchmark configuration fixed while testing optimizations.</li>
  <li>Test each optimization on its own against the baseline.</li>
  <li>Test the optimizations together to see how they combine.</li>
</ol>

<p>
  Testing both ways shows what actually drives an improvement. Some optimizations
  work against each other. <Term id="speculative-decoding">Speculative decoding</Term>, for example, can lose
  its benefit at a large <Term id="batch-size">batch size</Term>, because a busy GPU has little idle
  compute left to verify draft tokens. Chapter 5 explains the interaction.
</p>

<p>
  The same rule applies to the benchmark itself. Teams often need to test several
  traffic patterns or sequence shapes. Change only one of these variables per
  run, as in any controlled experiment, so the results stay clear.
</p>

<Signal kind="worked" title="Correcting a benchmark plan">
  <p>
    A team runs a document question-answering service. Production prompts hold
    3,000 to 5,000 tokens because they include retrieved documents, answers run
    150 to 300 tokens, traffic peaks at 120 concurrent requests in bursts, and
    temperature is 0.3. An engineer drafts this plan: 200-token prompts from a
    general chat dataset, a steady 120 requests at all times, temperature 1.0, and
    a first run that enables FP8 quantization and prefix caching together.
  </p>
  <ol>
    <li>Sequence lengths do not match. Replace the 200-token prompts with prompts of 3,000 to 5,000 tokens and set output lengths of 150 to 300 tokens.</li>
    <li>Request contents do not match. Build prompts from real retrieved documents so that shared prefixes and cache behavior resemble production.</li>
    <li>The traffic pattern does not match. Keep the peak of 120 concurrent requests, and add jitter so that requests arrive in bursts.</li>
    <li>Input parameters do not match. Set temperature to 0.3.</li>
    <li>The run order breaks the one-variable rule. Record a baseline with neither optimization, then test FP8 alone, prefix caching alone, and finally both together.</li>
  </ol>
  <p>
    Each correction names the workload dimension or method rule it restores. The
    corrected plan predicts production, and its results show which optimization
    caused each change.
  </p>
</Signal>
