<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import { Matching, MultipleChoice, Sorting } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<Signal kind="recall" chapter={2} title="Concepts this chapter builds on">
  <p>
    Every hardware decision in this chapter rests on four ideas from Chapters 0 and 2. Answer these items from
    memory before you look anything up. Retrieving an idea strengthens it more than rereading it does.
  </p>
  <ul>
    <li>A model's <Term id="weights">weights</Term> occupy memory in proportion to its parameter count and its <Term id="precision">precision</Term>.</li>
    <li>LLM inference runs in two phases, <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term>, and the <Term id="kv-cache">KV cache</Term> links them.</li>
    <li>A workload is <Term id="compute-bound">compute-bound</Term> or <Term id="memory-bound">memory-bound</Term> depending on how much work it does per byte it moves.</li>
    <li>A GPU's <Term id="ops-byte-ratio">ops:byte ratio</Term> marks the boundary between those two cases.</li>
  </ul>
</Signal>

<p>These four items are ungraded. Each one gives feedback when you answer.</p>

<Matching
  id="recall_terms"
  question="Match each Chapter 2 term to its definition."
  pairs={[
    { left: 'Prefill', right: 'Processes every input token in one parallel pass and produces the first output token' },
    { left: 'Decode', right: 'Generates each later output token with one forward pass per token' },
    { left: 'KV cache', right: 'Stores the key and value tensors of every token already processed' },
    { left: 'Weights', right: 'The learned numbers that every forward pass reads from memory' },
  ]}
  correctFeedback="Correct. Prefill and decode are the two phases of LLM inference, the KV cache carries keys and values from one step to the next, and the weights are read on every pass."
  incorrectFeedback="Review the pairs. Prefill handles the whole prompt at once, decode adds one token per pass, the KV cache stores keys and values rather than finished attention results, and the weights are the model's learned numbers."
/>

<NumericQuestion
  id="recall_weight_gb"
  question="A model has 7 billion parameters stored in FP16, which uses 2 bytes per parameter. How many gigabytes of memory do its weights occupy?"
  answer={14}
  unit="GB"
  correctFeedback="Correct. Weight memory equals parameters times bytes per parameter: 7 billion × 2 bytes = 14 billion bytes, or 14 GB."
  incorrectFeedback="Weight memory equals parameters times bytes per parameter. 7 billion × 2 bytes = 14 billion bytes, which is 14 GB when 1 GB is 10^9 bytes."
/>

<Sorting
  id="recall_bound"
  question="Sort each workload by the resource that usually limits it."
  items={[
    'Prefill of a 4,000-token prompt',
    'Decode for a single user',
    'One denoising step of an image model',
    'Decode attention over a long context',
  ]}
  targets={['Compute-bound', 'Memory-bound']}
  correct={[0, 1, 0, 1]}
  correctFeedback="Correct. Prefill and image denoising perform many operations per byte, so arithmetic speed limits them. Single-user decode and decode attention read many bytes for little arithmetic, so memory bandwidth limits them."
  incorrectFeedback="Ask how much arithmetic each workload performs for each byte it reads. Prefill and image denoising reuse each weight across many tokens or pixels, so they are compute-bound. Decode reads all the weights to produce one token per sequence, and decode attention reads each sequence's own KV cache, so both are memory-bound."
/>

<MultipleChoice
  id="recall_ridge"
  question="A GPU has an ops:byte ratio of 300. A kernel on that GPU has an arithmetic intensity of 40 operations per byte. Which ceiling limits the kernel?"
  options={[
    'The compute ceiling, because the kernel performs more than one operation per byte',
    'The memory-bandwidth ceiling, because the kernel performs fewer operations per byte than the GPU can',
    'Neither ceiling, because the kernel sits exactly at the ridge point',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Any positive intensity performs some operations per byte. The comparison that matters is with the ops:byte ratio of 300.',
    'Correct. An intensity of 40 sits below the ratio of 300, so the kernel waits on memory before the compute units run out of work.',
    'Incorrect. The ridge point sits at an intensity equal to the ops:byte ratio, 300. An intensity of 40 sits well to the left of it.',
  ]}
/>
