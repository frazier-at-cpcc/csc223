<script module>
  export const pageConfig = { title: 'Knowledge Check: Speculation, Parallelism, and Disaggregation' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Speculation, Parallelism, and Disaggregation</h1>

<p>This check is ungraded. Each item gives feedback when you answer it.</p>

<h2>All Six Techniques</h2>
<p>Objective 5: select the model performance technique that addresses a described runtime bottleneck.</p>

<Matching
  id="kc_sp_six"
  question="Match each symptom to the technique that addresses it."
  pairs={[
    { left: 'GPU utilization stays low while total tokens per second falls short', right: 'Batching' },
    { left: 'Each agent step resends the same tool instructions', right: 'Caching' },
    { left: 'The only available GPU cannot hold the weights', right: 'Quantization' },
    { left: 'One user waits on a long stream of predictable text', right: 'Speculation' },
    { left: 'The model fits on one GPU but misses its latency target', right: 'Parallelism' },
    { left: 'Prompt-heavy and answer-heavy traffic need different hardware', right: 'Disaggregation' },
  ]}
  correctFeedback="Correct. Each technique targets a different bottleneck, so the symptom decides the technique."
  incorrectFeedback="Use the bottleneck column of the summary table. Idle capacity calls for batching, repeated prefixes for caching, memory for quantization, slow single-user decode for speculation, one GPU too slow for parallelism, and uneven phase demand for disaggregation."
/>

<h2>Analyzing a Speculation Step</h2>
<p>Objective 6: analyze a speculative decoding step to determine how many tokens it produces.</p>

<NumericQuestion
  id="kc_sp_analyze"
  question="After the text 'The meeting is', a draft model proposes four tokens: 'on', 'Monday', 'at', 'nine'. In one verification pass, the target model's own predictions at the five positions are 'on', 'Monday', 'morning', 'noon', and '.'. How many tokens does this pass add to the output?"
  answer={3}
  unit="tokens"
  correctFeedback="Correct. 'on' and 'Monday' match and are accepted. 'at' differs from 'morning', so it is rejected, 'nine' is discarded, and the target adds 'morning'."
  incorrectFeedback="Compare position by position. 'on' and 'Monday' match. At the third position the draft 'at' differs from the target's 'morning', so 'at' is rejected and 'nine' is discarded. The target adds 'morning'. The output gains 'on', 'Monday', and 'morning': 3 tokens. Predictions after the rejection do not count, because they followed a wrong token."
/>

<MultipleChoice
  id="kc_sp_first"
  question="In one speculation step with four drafts, the target model's prediction at the first position differs from the first draft. How many tokens does that forward pass add to the output?"
  options={['None', 'One', 'Four', 'Five']}
  correct={1}
  optionFeedback={[
    'Incorrect. The target model always adds its own token. Here it adds its prediction at the first position.',
    'Correct. The first draft is rejected, the other three are discarded, and the target adds its own token. The pass matches plain decode.',
    'Incorrect. Drafts after a rejection are discarded, so none of the four drafts survive.',
    'Incorrect. Five tokens require every draft to be accepted plus a bonus token. Here the first draft fails.',
  ]}
/>
