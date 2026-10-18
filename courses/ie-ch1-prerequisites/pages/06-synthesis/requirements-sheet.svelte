<script module>
  export const pageConfig = { title: 'Synthesis: The Requirements Sheet' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import { Matching, MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Synthesis: The Requirements Sheet</h1>

<p>
  This chapter promised a target for every later optimization.
  A <dfn><strong>requirements sheet</strong></dfn> is that target in writing.
  It restates the five product requirements as measurable targets and then derives the workload type, the market priorities, the compliance limits, and the shared-or-dedicated decision.
  This page works one sheet in full and then asks you to complete a second one.
</p>

<Signal kind="summary" title="A worked requirements sheet for a B2B support assistant">
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
          <td>3,000,000 replies a month; 400 concurrent streams at the business-hours peak, so at least 400 × 30 = 12,000 tokens per second of total TPS</td>
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
  Load-test P90 TTFT = 450 ms at the 400-stream peak</code></pre>
  <p>
    The shared API is cheaper, but it misses the latency budget, and the team cannot change it.
    The dedicated deployment meets the budget and stays within the unit economics of $0.004 per reply.
    A specific latency requirement is the specialization reason to switch, so the sheet chooses a dedicated deployment in an EU region.
    Every later chapter tunes this deployment against the same targets.
  </p>
</Signal>

<h2>Complete a second sheet</h2>

<p>
  A consumer app lets people record voice memos during the day.
  Overnight, the app transcribes each memo, summarizes it, and emails the summary.
  The facts below come from the product team.
</p>

<ul>
  <li>The summary model must produce an acceptable summary for at least 95 percent of 300 test memos.</li>
  <li>The phone app uploads audio files, and each summary goes out as an email of about 400 output tokens.</li>
  <li>Every summary must be finished by 7 a.m., and processing starts at 11 p.m.</li>
  <li>The app is free, so inference may cost no more than $0.001 for each memo.</li>
  <li>Users record about 600,000 memos each day, and a viral post once doubled that number overnight.</li>
</ul>

<p class="ie-obj">Objective 1: Identify the five product requirements.</p>

<Matching
  id="syn_requirements"
  question="Match each requirement to the voice-memo app's measurable target."
  pairs={[
    { left: 'Model requirements', right: 'Acceptable summaries for at least 95 percent of 300 test memos' },
    { left: 'Application interface', right: 'Audio file in, summary email of about 400 tokens out' },
    { left: 'Latency budget', right: 'Every summary finished by 7 a.m.' },
    { left: 'Unit economics', right: 'No more than $0.001 of inference for each memo' },
    { left: 'Usage patterns', right: 'About 600,000 memos a day, with viral spikes' },
  ]}
  correctFeedback="Correct. Each fact from the product team becomes one measurable line on the sheet."
  incorrectFeedback="Not yet. Ask which of the five questions each target answers: which model, what format, how fast, how much it may cost, or how much traffic and when."
/>

<p class="ie-obj">Objectives 3 and 4: Classify the workload, and differentiate the market priorities.</p>

<MultipleChoice
  id="syn_profile"
  question="Which deployment profile belongs on the voice-memo app's sheet?"
  options={[
    'Offline and throughput-first, with marginal cost and flexibility leading',
    'Offline and throughput-first, with latency and uptime leading',
    'Online and latency-first, with marginal cost and flexibility leading',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. No user waits on any single summary, so the work is offline. A free consumer app with viral spikes puts marginal cost and flexibility first.',
    'Not quite. The work is offline, but latency and uptime lead for B2B products. This free consumer app leads with cost and flexibility.',
    'Not quite. The market priorities fit, but no user waits on each summary. A deadline of 7 a.m. is a throughput target, not a latency target.',
  ]}
/>

<p class="ie-obj">Objective 8: Calculate streaming metrics.</p>

<NumericQuestion
  id="syn_total_tps"
  question="The summaries must be written between 11 p.m. and 7 a.m. What total TPS must the summary model sustain to write 600,000 summaries of 400 tokens in that window?"
  answer={8333}
  tolerancePct={1}
  unit="tokens per second"
  correctFeedback="Correct. 240,000,000 tokens over 28,800 seconds is about 8,333 tokens per second."
  incorrectFeedback="Output tokens = 600,000 × 400 = 240,000,000. The window is 8 hours × 3,600 = 28,800 seconds. Total TPS = 240,000,000 ÷ 28,800 ≈ 8,333 tokens per second. A viral night doubles this to about 16,700."
/>

<p class="ie-obj">Objective 2: Evaluate whether a product should move to a dedicated deployment.</p>

<MultipleChoice
  id="syn_decision"
  question="A per-token batch API would cost $6,480 a month for the summaries, or $0.00036 per memo, and it absorbs viral spikes with no monthly floor. A dedicated deployment would cost about $5,900 a month including engineering, and it needs capacity planned ahead of each spike. What should the sheet choose?"
  options={[
    'Dedicated, because the shared API costs more each month',
    'Dedicated, because offline workloads always run on dedicated GPUs',
    'Shared, because the saving is small and flexibility leads for this app',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. The saving is about $580 a month, under 10 percent, and both options already meet the $0.001 target per memo. That saving does not pay for losing the ability to absorb viral spikes.',
    'Not quite. Offline work runs well on shared batch APIs. The workload type sets the optimization target, not the hosting choice.',
    'Correct. Both options meet the unit economics. Flexibility leads for a viral consumer app, and the small saving is not a clear and immediate business need.',
  ]}
/>

<details class="ie-answer">
  <summary>Model answer: the completed voice-memo sheet</summary>
  <div class="ie-table-wrap" role="region" aria-label="Requirements sheet for the voice-memo app" use:scrollable>
    <table class="ie-table">
      <caption>Requirements sheet for the voice-memo app</caption>
      <thead>
        <tr>
          <th scope="col">Item on the sheet</th>
          <th scope="col">Measurable target</th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row">Model requirements</th><td>Acceptable summaries for at least 95 percent of 300 test memos, before and after every optimization</td></tr>
        <tr><th scope="row">Application interface</th><td>Audio file in, summary email of about 400 output tokens</td></tr>
        <tr><th scope="row">Latency budget</th><td>Every summary finished within the 8-hour window that ends at 7 a.m.</td></tr>
        <tr><th scope="row">Unit economics</th><td>No more than $0.001 of inference for each memo</td></tr>
        <tr><th scope="row">Usage patterns</th><td>About 600,000 memos a night, so at least 8,333 tokens per second of total TPS, and twice that on a viral night</td></tr>
        <tr><th scope="row">Workload type</th><td>Offline, so the deployment is tuned for throughput and cost</td></tr>
        <tr><th scope="row">Market priorities</th><td>Consumer: marginal cost and flexibility lead</td></tr>
        <tr><th scope="row">Compliance</th><td>No location rule was given. The privacy question remains: confirm that memos and summaries stay private and are deleted on schedule</td></tr>
        <tr><th scope="row">Shared or dedicated</th><td>Shared batch API for now. Revisit when volume grows enough that the saving becomes large</td></tr>
      </tbody>
    </table>
  </div>
</details>

<h2>What comes next</h2>

<p>
  Chapter 2 opens the model itself, showing how <Term id="token">tokens</Term> flow through a <Term id="transformer">transformer</Term> and why <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term> set the TTFT and TPS on a requirements sheet.
  With these targets in hand, every model-level choice in Chapter 2 can be judged by how it moves latency, throughput, and quality.
</p>
