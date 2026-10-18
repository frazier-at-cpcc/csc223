<script module>
  export const pageConfig = { title: 'Knowledge Check: Benchmarking' };
</script>

<script>
  import { Matching, RevealModal, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Benchmarking</h1>

<p>
  These activities are ungraded. Both practice objective 8: apply the four
  workload dimensions and the one-variable rule to correct a benchmark plan.
</p>

<h2>Review a benchmark plan</h2>

<p>
  A team runs a code completion service. In production, prompts hold 1,500 to
  3,000 tokens of surrounding code and completions run 20 to 80 tokens.
  Temperature is 0.2. Traffic peaks at 200 concurrent requests and arrives in
  bursts as developers type. A draft benchmark plan contains the eight lines
  below. Decide which lines to keep and which to fix before the first run.
</p>

<Sorting
  id="kc_bench_plan"
  question="Sort each line of the draft benchmark plan."
  items={[
    'Prompt lengths of 1,500 to 3,000 tokens and output lengths of 20 to 80 tokens',
    'Prompts built from HumanEval problems and anonymized files from the company code base',
    'A peak of 200 concurrent requests with jitter between arrivals',
    'A baseline run before any optimization is enabled',
    'Temperature 1.0 to stress the sampler',
    'Prompts drawn from MMLU general knowledge questions',
    'Speculative decoding and a larger batch size enabled together in the first optimization run',
    'A steady 200 requests at every moment, with no variation in timing',
  ]}
  targets={['Keep as written', 'Fix before running']}
  correct={[0, 0, 0, 0, 1, 1, 1, 1]}
  correctFeedback="The kept lines match production on sequence lengths, request contents, and traffic pattern, and they start from a baseline. The fixed lines break input parameters, request contents, the one-variable rule, and the traffic pattern."
  incorrectFeedback="Check each line against one workload dimension or method rule. Temperature must match production. Prompts must resemble code, not general knowledge. Optimizations run one at a time first. Real traffic arrives in bursts."
/>

<RevealModal title="An expert benchmark plan for the code completion service">
  {#snippet trigger()}<button type="button" class="tessera-btn-primary">Compare your thinking with an expert plan</button>{/snippet}
  {#snippet content()}
    <h3>Expert benchmark plan</h3>
    <ul>
      <li>Sequence lengths: sample input lengths of 1,500 to 3,000 tokens and output lengths of 20 to 80 tokens from the production distribution.</li>
      <li>Request contents: HumanEval problems plus anonymized files from the company code base.</li>
      <li>Traffic: ramp to a peak of 200 concurrent requests, with jitter so that arrivals come in bursts.</li>
      <li>Input parameters: temperature 0.2 and the production maximum output length.</li>
      <li>Run order: a baseline, then speculative decoding alone, then the larger batch size alone, then both together. Repeat each run and average the results.</li>
    </ul>
    <p>Press Escape or select outside this window to close it.</p>
  {/snippet}
</RevealModal>

<h2>Name the mismatch</h2>

<Matching
  id="kc_bench_match"
  question="Match each benchmark mismatch to the workload dimension it violates."
  pairs={[
    { left: 'Benchmark prompts hold 100 tokens, while production prompts hold 8,000', right: 'Sequence lengths' },
    { left: 'The benchmark sends one request at a time, while production peaks at 300 concurrent requests', right: 'Volume and pattern of traffic' },
    { left: 'Benchmark prompts are synthetic random words, while production prompts are real customer emails', right: 'Request contents' },
    { left: 'The benchmark uses low reasoning effort, while production uses high reasoning effort', right: 'Input parameters' },
  ]}
  correctFeedback="Length, arrival pattern, what the prompts say, and request settings are four separate dimensions. A benchmark must match all four."
  incorrectFeedback="Ask what differs. Token counts are sequence lengths. Concurrency and timing are traffic. The text itself is request contents. Settings such as temperature and reasoning effort are input parameters."
/>
