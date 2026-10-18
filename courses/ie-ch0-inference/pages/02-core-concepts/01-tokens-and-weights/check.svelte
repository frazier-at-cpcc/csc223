<script module>
  export const pageConfig = { title: 'Knowledge Check: Tokens and Weights' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Tokens and Weights</h1>

<p>This check is ungraded. Each item gives feedback when you answer it.</p>

<h2>Bytes per Parameter</h2>
<p>Objective 2: calculate the weight memory of a model.</p>

<Matching
  id="kc_cc_precision"
  question="Match each number format to the bytes it uses for one parameter."
  pairs={[
    { left: 'FP32', right: '4 bytes' },
    { left: 'BF16', right: '2 bytes' },
    { left: 'FP8', right: '1 byte' },
    { left: 'FP4', right: 'Half a byte' },
  ]}
  correctFeedback="Correct. Bytes per parameter equal the bits in the format divided by 8."
  incorrectFeedback="Divide the bits in each format by 8. FP32 uses 4 bytes, BF16 uses 2, FP8 uses 1, and FP4 uses half a byte."
/>

<h2>Estimating Tokens</h2>
<p>Supports Objective 1: tracing a request starts from the number of prompt tokens.</p>

<NumericQuestion
  id="kc_cc_tokens"
  question="A user pastes a 1,500-word English report into a prompt. Using the rule of about four tokens for every three words, about how many input tokens does the report add?"
  answer={2000}
  tolerancePct={5}
  unit="tokens"
  correctFeedback="Correct. 1,500 words × 4 / 3 = 2,000 tokens."
  incorrectFeedback="Multiply the word count by 4 and divide by 3: 1,500 × 4 = 6,000, and 6,000 / 3 = 2,000 tokens."
/>

<h2>Comparing Precisions</h2>
<p>Objective 2: calculate the weight memory of a model.</p>

<MultipleChoice
  id="kc_cc_weights"
  question="Two teams serve the same 14-billion-parameter model. Team A stores the weights in BF16, and Team B stores them in FP8. How does the weight memory of the two deployments compare?"
  options={[
    'Both need 14 GB, because the parameter count is the same',
    'Team A needs 28 GB, twice the 14 GB that Team B needs',
    'Team B needs 28 GB, twice the 14 GB that Team A needs',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Weight memory depends on the bytes per parameter as well as the count. BF16 uses 2 bytes and FP8 uses 1.',
    'Correct. 14 billion × 2 bytes = 28 GB in BF16, and 14 billion × 1 byte = 14 GB in FP8.',
    'Incorrect. FP8 uses fewer bytes per parameter than BF16, so Team B needs less memory, not more.',
  ]}
/>
