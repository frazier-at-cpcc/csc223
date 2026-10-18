<script module>
  export const pageConfig = { title: 'Knowledge Check: Forward Passes, Prefill, and Decode' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Forward Passes, Prefill, and Decode</h1>

<p>This check is ungraded. Each item gives feedback when you answer it. All three items practice Objective 1: trace an LLM request through its prefill and decode forward passes.</p>

<h2>Prefill or Decode</h2>

<Sorting
  id="kc_cc_phase"
  question="Sort each statement into the phase of an LLM request that it describes."
  items={[
    'Processes every prompt token in one forward pass',
    'Produces the first output token',
    'Writes keys and values for the whole prompt',
    'Processes only the newest token in each pass',
    'Appends one entry to the KV cache per pass',
    'Runs once for every output token after the first',
  ]}
  targets={['Prefill', 'Decode']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="Correct. Prefill handles the whole prompt in one pass and produces the first token. Decode handles one new token per pass."
  incorrectFeedback="Prefill is a single pass over the whole prompt, and it produces output token 1. Every later output token comes from its own decode pass, which processes one token and adds one cache entry."
/>

<h2>Counting KV Cache Entries</h2>

<NumericQuestion
  id="kc_cc_kv"
  question="A request has a 40-token prompt and produces a 10-token response. How many entries does the KV cache hold at the moment the tenth output token is produced?"
  answer={49}
  unit="entries"
  correctFeedback="Correct. Prefill writes 40 entries. Decode passes 2 through 10 each append one entry for the token they process, which adds 9."
  incorrectFeedback="Prefill writes 40 prompt entries and produces token 1. Nine decode passes produce tokens 2 to 10, and each appends the entry of the token it processed. The cache holds 40 + 10 − 1 = 49 entries. Token 10 is never processed, so its entry is never written."
/>

<h2>What the KV Cache Saves</h2>

<MultipleChoice
  id="kc_cc_kvstore"
  question="An engineer claims that the KV cache stores the finished attention output for every token, so decode passes skip attention entirely. What work does the KV cache actually let a decode pass skip?"
  options={[
    'Computing attention for the newest token',
    'Producing the first output token',
    'Reading the weights from GPU memory',
    'Recomputing keys and values for earlier tokens',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Every decode pass still computes attention for the newest token. It reads cached keys and values to do it.',
    'Incorrect. The prefill pass produces the first output token. The cache serves the decode passes that follow.',
    'Incorrect. Each forward pass still reads the weights. The cache stores per-token keys and values, not weights.',
    'Correct. The cache stores the key and value tensors of earlier tokens, so each decode pass computes them only for the newest token.',
  ]}
/>
