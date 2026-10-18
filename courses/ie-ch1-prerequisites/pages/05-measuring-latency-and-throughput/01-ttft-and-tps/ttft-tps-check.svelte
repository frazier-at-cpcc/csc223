<script module>
  export const pageConfig = { title: 'Knowledge Check: TTFT and TPS' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: TTFT and TPS</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 8: Calculate streaming metrics for a streamed response.</p>

<Matching
  id="kc_ttft_1"
  question="Match each metric to what it measures."
  pairs={[
    { left: 'TTFT', right: 'The wait before the first output token appears' },
    { left: 'Perceived TPS', right: 'Tokens per second that one user receives' },
    { left: 'Total TPS', right: 'Tokens per second across every user of the service' },
    { left: 'ITL', right: 'Milliseconds between two tokens in one stream' },
    { left: 'Total response time', right: 'The time from request to the last output token' },
  ]}
  correctFeedback="Correct. TTFT, perceived TPS, ITL, and total response time describe one request. Total TPS describes the whole service."
  incorrectFeedback="Not yet. Separate the per-request latency metrics from the one throughput metric, total TPS, which counts tokens across every user."
/>

<p class="ie-obj">Objective 8: Calculate streaming metrics for a streamed response.</p>

<MultipleChoice
  id="kc_ttft_2"
  question="An agent makes a tool call and cannot act until the complete JSON output arrives. Which metric best describes the latency of this call?"
  options={['Perceived TPS', 'Time to first token', 'Total response time']}
  correct={2}
  optionFeedback={[
    'Not quite. Perceived TPS describes a streamed experience. Individual tokens of a tool call are not useful on their own.',
    'Not quite. The first token of a tool call is not usable, so its arrival time does not reflect the wait.',
    'Correct. When output is useful only once complete, measure the total time from request to full response.',
  ]}
/>

<p class="ie-obj">Objective 8: Calculate streaming metrics for a streamed response.</p>

<MultipleChoice
  id="kc_ttft_3"
  question="A team doubles the length of its prompts from 2,000 to 4,000 tokens and changes nothing else. Which metric rises the most?"
  options={['Inter-token latency', 'Time to first token', 'Total TPS']}
  correct={1}
  optionFeedback={[
    'Not quite. ITL comes from decode, which reads the weights once for each new token. A longer prompt changes it far less than it changes prefill.',
    'Correct. Prefill must process every prompt token before the first output token appears, so a longer prompt raises TTFT.',
    'Not quite. Total TPS counts output tokens across all users. A longer prompt does not raise it, and the extra prefill work can lower it.',
  ]}
/>
