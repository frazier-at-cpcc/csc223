<script module>
  export const pageConfig = { title: 'Knowledge Check: Concurrency and Batch Sizing' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Concurrency and Batch Sizing</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_cb_1"
  question="A server waits for a full batch of eight requests or for 100 milliseconds to pass, whichever happens first, and then starts inference. Which batching approach is this?"
  options={['Continuous batching', 'Dynamic batching', 'Static batching']}
  correct={1}
  optionFeedback={[
    'Incorrect. Continuous batching never waits for a batch. It swaps requests in at the token level as slots open.',
    'Correct. Dynamic batching starts a batch when it is full or when a configured time has passed.',
    'Incorrect. Static batching always waits for a full batch and has no time cutoff.',
  ]}
/>

<MultipleChoice
  id="kc_cb_2"
  question="An engineer doubles the replica batch size from 8 to 16 and leaves the hardware unchanged. Which outcome should the engineer expect?"
  options={[
    'Higher total throughput and higher latency for each user',
    'Higher total throughput and lower latency for each user',
    'Lower total throughput and lower latency for each user',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Larger batches raise throughput overall, but each user waits longer.',
    'Incorrect. Batch size trades latency for throughput. A larger batch does not improve both.',
    'Incorrect. A larger batch increases total throughput rather than reducing it.',
  ]}
/>
