<script module>
  export const pageConfig = { title: 'Synthesis: Completing a Requirements Sheet' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Synthesis: Completing a Requirements Sheet</h1>

<p>
  The previous page worked a requirements sheet for a support assistant.
  This page applies the same steps to a second product, and a model answer follows the items.
</p>

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
  <li>The app is free, so summarization may cost no more than $0.001 for each memo.</li>
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
    { left: 'Unit economics', right: 'No more than $0.001 of summarization for each memo' },
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
    'Not quite. The market priorities fit, but no user waits on any single summary. The 7 a.m. deadline is a latency budget for the whole batch, and a throughput-first deployment meets it.',
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
        <tr><th scope="row">Unit economics</th><td>No more than $0.001 of summarization for each memo</td></tr>
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
