<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import { Matching, Sorting, MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<p>
  This chapter measures every product requirement in the vocabulary that Chapter 0 introduced.
  Retrieve those ideas now, before the chapter builds on them.
  These four items are ungraded.
</p>

<Signal kind="recall" chapter={0} title="Core concepts this chapter depends on">
  <p>
    Answer the four items from memory before you look anything up.
    They retrieve five Chapter 0 ideas: the <Term id="token">token</Term>, the <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term> phases,
    <Term id="latency">latency</Term> and <Term id="throughput">throughput</Term>, <Term id="batching">batching</Term>, and the memory that a model's <Term id="weights">weights</Term> occupy.
  </p>
</Signal>

<Matching
  id="recall_terms"
  question="Match each Chapter 0 term to its description."
  pairs={[
    { left: 'Token', right: 'The unit of text that a language model reads and writes' },
    { left: 'Prefill', right: 'The phase that processes every prompt token in one pass' },
    { left: 'Decode', right: 'The phase that generates output one forward pass at a time' },
    { left: 'KV cache', right: 'Stored key and value tensors for tokens already processed' },
  ]}
  correctFeedback="Correct. Chapter 1 uses all four terms when it defines TTFT and TPS."
  incorrectFeedback="Not yet. Prefill handles the prompt and decode generates the output. The KV cache stores keys and values so decode does not recompute earlier tokens."
/>

<Sorting
  id="recall_lat_thru"
  question="Sort each measurement into the property it describes."
  items={[
    'Seconds a user waits before the first word appears',
    'Tokens generated per second across all users of a service',
    'Milliseconds between two streamed tokens in one reply',
    'Requests that one GPU completes per hour',
  ]}
  targets={['Latency', 'Throughput']}
  correct={[0, 1, 0, 1]}
  correctFeedback="Correct. Latency describes one user's wait. Throughput describes the work of the whole system."
  incorrectFeedback="Not yet. Ask whether the measurement describes one user's experience, which is latency, or the total work of the system, which is throughput."
/>

<MultipleChoice
  id="recall_batching"
  question="A runtime raises the number of requests it batches together on each GPU. What happens to the total tokens per second that the GPU produces?"
  options={[
    'It falls, because each request now waits for the others',
    'It rises, because one pass over the weights serves more requests',
    'It stays the same, because batching changes only latency',
  ]}
  correct={1}
  optionFeedback={[
    'Not quite. Each request may slow down a little, but the GPU completes more total work.',
    'Correct. Batching shares the cost of reading the weights across many requests, so throughput rises.',
    'Not quite. Batching is a throughput technique. It raises total output, often at some cost to each request.',
  ]}
/>

<NumericQuestion
  id="recall_weight_gb"
  question="A model has 8 billion parameters stored at 2 bytes each. How many gigabytes do its weights occupy? Use 1 GB = 1 billion bytes."
  answer={16}
  tolerance={0.1}
  unit="GB"
  correctFeedback="Correct. Weight memory equals parameters times bytes per parameter."
  incorrectFeedback="Weight memory = 8 billion parameters × 2 bytes = 16 billion bytes = 16 GB. A smaller model needs less memory and less data movement, which is why model size drives speed and cost."
/>

<details class="ie-answer">
  <summary>Summary of the Chapter 0 ideas</summary>
  <ul>
    <li>A token is the unit of text that a language model reads and writes.</li>
    <li>Prefill processes the whole prompt, and decode then generates the output one token per <Term id="forward-pass">forward pass</Term>.</li>
    <li>Latency is how long one user waits, and throughput is the total work the system completes per unit of time.</li>
    <li>Batching runs many requests through the model together, which raises throughput.</li>
    <li>Weight memory equals the <Term id="parameter">parameter</Term> count times the bytes stored for each parameter.</li>
  </ul>
</details>
