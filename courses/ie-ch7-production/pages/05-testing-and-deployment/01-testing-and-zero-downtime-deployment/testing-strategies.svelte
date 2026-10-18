<script module>
  export const pageConfig = { title: 'Testing Strategies' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Testing Strategies</h1>

<p>
  Chapter 4 covered replica-level benchmarks, which engineers run while configuring the <Term id="inference-engine">inference engine</Term>. Those
  benchmarks are not enough. The full system, including autoscaling, routing, and queueing, needs end-to-end testing
  before deployment.
</p>
<div class="ie-table-wrap" role="region" aria-label="Testing Strategies table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Strategy</th><th scope="col">What it does</th></tr>
  </thead>
  <tbody>
    <tr><td>Manual testing</td><td>Sends synthetic traffic to an inference service through scripts or button clicks.</td></tr>
    <tr><td><Term id="load-testing">Load testing</Term></td><td>Sends a large, sustained volume of traffic to test whether the system scales and maintains performance.</td></tr>
    <tr><td><Term id="shadow-traffic">Shadow traffic</Term></td><td>Copies live production requests to a test deployment and discards its responses, which measures performance under real-world conditions without affecting users.</td></tr>
  </tbody>
</table>
</div>

<h2>The Cost of Testing</h2>
<p>
  Testing inference is expensive. Engineers spend time configuring tests and measuring results, and GPUs run inference
  on all of the test traffic. Some of that cost is unavoidable, but a careful plan keeps it down.
</p>
<Signal kind="worked" title="A cheaper shadow test">
  <p>
    A team plans to mirror all production traffic to a candidate deployment for three days. Instead, it copies a random
    10 percent sample of production requests for the same three days, which needs about a tenth of the GPU time. It
    follows the shadow test with a shorter load test that pushes the candidate to its scaling limits.
  </p>
</Signal>
<p>
  Usage of AI products generally rises and falls on daily and weekly cycles. Plan test timing and duration so that the
  test covers a peak. Once the updated system shows reliable performance and stability, it is ready for production.
</p>
