<script module>
  export const pageConfig = { title: 'Synthesis: The Requirements Sheet' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Synthesis: The Requirements Sheet</h1>

<p>
  This chapter promised a target for every later optimization.
  A <dfn><strong>requirements sheet</strong></dfn> is that target in writing.
  It restates the five product requirements as measurable targets and then derives the workload type, the market priorities, the compliance limits, and the shared-or-dedicated decision.
  This page works one sheet in full, and the next page asks you to complete a second one.
</p>

<Signal kind="worked" title="A worked requirements sheet for a B2B support assistant">
  <p>
    A software company adds a support assistant to its accounting product.
    The assistant answers customer questions in a help widget, using retrieved help-center articles.
    Its customers are businesses in the European Union.
  </p>
  <div class="ie-table-wrap" role="region" aria-label="Requirements sheet for the B2B support assistant" use:scrollable>
    <table class="ie-table">
      <caption>Requirements sheet for the B2B support assistant</caption>
      <thead>
        <tr>
          <th scope="col">Item on the sheet</th>
          <th scope="col">Chapter idea it uses</th>
          <th scope="col">Measurable target</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Model requirements</th>
          <td>Model selection and <Term id="evals">evals</Term></td>
          <td>An open 8-billion-parameter model that scores at least 90 percent on 500 real support tickets, before and after every optimization</td>
        </tr>
        <tr>
          <th scope="row">Application interface</th>
          <td>Streaming output</td>
          <td>Text in from the widget with about 1,500 input tokens, streamed text out with about 250 output tokens</td>
        </tr>
        <tr>
          <th scope="row">Latency budget</th>
          <td><Term id="ttft">TTFT</Term>, <Term id="perceived-tps">perceived TPS</Term>, <Term id="latency-percentile">percentiles</Term></td>
          <td>P90 TTFT of 600 ms or less, measured end to end; 90 percent of streams faster than 30 tokens per second, an ITL of 33 ms or less</td>
        </tr>
        <tr>
          <th scope="row">Unit economics</th>
          <td><Term id="unit-economics">Unit economics</Term>: per-token and GPU-hour cost</td>
          <td>No more than $0.004 of inference for each reply</td>
        </tr>
        <tr>
          <th scope="row">Usage patterns</th>
          <td><Term id="total-tps">Total TPS</Term> and <Term id="concurrency">concurrency</Term></td>
          <td>3,000,000 replies a month; 80 concurrent streams at the business-hours peak, so at least 80 × 30 = 2,400 tokens per second of total TPS</td>
        </tr>
        <tr>
          <th scope="row">Workload type</th>
          <td><Term id="online-inference">Online inference</Term> versus <Term id="offline-inference">offline</Term></td>
          <td>Online, because a customer waits on every reply, so the deployment is tuned for latency</td>
        </tr>
        <tr>
          <th scope="row">Market priorities</th>
          <td>Consumer versus B2B</td>
          <td>B2B: latency and uptime lead, and cost is a secondary concern</td>
        </tr>
        <tr>
          <th scope="row">Compliance</th>
          <td><Term id="data-sovereignty">Data sovereignty</Term></td>
          <td>Inputs and outputs processed only on GPUs inside the European Union</td>
        </tr>
        <tr>
          <th scope="row">Shared or dedicated</th>
          <td><Term id="shared-inference">Shared inference</Term> or <Term id="dedicated-deployment">dedicated deployment</Term>: scale, specialization, orchestration</td>
          <td>Dedicated, in an EU region, for the specialization reason shown below</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>The last row needs numbers. The team tests both options against the sheet.</p>
  <pre class="ie-steps"><code>Shared API, EU endpoint:
  Cost per reply  = (1,500 × $0.50 + 250 × $2.00) ÷ 1,000,000 = $0.00125
  Cost per month  = 3,000,000 × $0.00125 = $3,750
  Load-test P90 TTFT = 900 ms, above the 600 ms budget, with no way to tune it

Dedicated deployment, EU region:
  2 always-on GPUs × 730 hours × $3.00 = $4,380
  Engineering and operations           = $2,000
  Cost per month                       = $6,380
  Cost per reply  = $6,380 ÷ 3,000,000 = about $0.0021
  Load-test P90 TTFT = 450 ms at the 80-stream peak</code></pre>
  <p>
    The shared API is cheaper, but it misses the latency budget, and the team cannot change it.
    The dedicated deployment meets the budget and stays within the unit economics of $0.004 per reply.
    A specific latency requirement is the specialization reason to switch, so the sheet chooses a dedicated deployment in an EU region.
    Every later chapter tunes this deployment against the same targets.
  </p>
</Signal>
