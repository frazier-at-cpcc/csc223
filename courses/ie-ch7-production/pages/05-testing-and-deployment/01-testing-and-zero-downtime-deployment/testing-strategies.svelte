<script module>
  export const pageConfig = { title: 'Testing Strategies' };
</script>

<h1>Testing Strategies</h1>

<p>
  Replica-level benchmarks run while configuring the inference engine. Those benchmarks are not enough. The full
  system needs end-to-end testing before deployment.
</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Strategy</th><th scope="col">What it does</th></tr>
  </thead>
  <tbody>
    <tr><td>Manual testing</td><td>Sends synthetic traffic to an inference service through scripts or button clicks.</td></tr>
    <tr><td>Load testing</td><td>Sends a large, sustained volume of traffic to test whether the system scales and maintains performance.</td></tr>
    <tr><td>Shadow traffic</td><td>Copies live production requests to a test deployment to measure performance under real-world conditions.</td></tr>
  </tbody>
</table>

<h2>Control the cost of testing</h2>

<p>
  Testing inference is expensive. Engineers spend time configuring tests and measuring results, and GPUs run inference
  on all of the test traffic. Some of that cost is unavoidable, but a careful plan keeps it down.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>
    Instead of mirroring all production traffic for days, a team copies a random sample of production requests to the
    test deployment. It follows the shadow test with a shorter load test.
  </p>
</div>

<p>
  Usage of AI products generally rises and falls on daily and weekly cycles. Plan test timing and duration with those
  cycles in mind. Once the updated system shows reliable performance and stability, it is ready for production.
</p>
