<script module>
  export const pageConfig = { title: 'Knowledge Check: Mixture of Experts' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Mixture of Experts</h1>

<p>
  These questions are ungraded and practice objective 5, comparing dense and Mixture of Experts models under
  batched serving. Retry them as often as you like.
</p>

<NumericQuestion
  id="kc_moe_1"
  question="An MoE model has 106 billion total parameters and 12 billion active parameters. Its weights are stored in FP8, at 1 byte per parameter. How many gigabytes of GPU memory do the weights alone need?"
  answer={106}
  unit="GB"
  correctFeedback="Every expert must be resident, so memory follows the total count: 106 × 10^9 × 1 byte = 106 GB. The 12 billion active parameters set the compute per token, not the memory."
  incorrectFeedback="Memory follows the total parameter count, because the router can pick any expert for the next token. 106 × 10^9 parameters × 1 byte = 106 GB. Using the 12 billion active parameters gives 12 GB, which leaves most experts with nowhere to live."
/>

<Sorting
  id="kc_moe_2"
  question="For an MoE model, sort each quantity by the parameter count it follows most closely."
  items={[
    'GPU memory needed to hold the weights',
    'Arithmetic per generated token',
    'Weight bytes read per decode step with a batch of 64 requests',
    'Weight bytes read per decode step for one request',
    'Size of the checkpoint download',
  ]}
  targets={['Total parameters', 'Active parameters']}
  correct={[0, 1, 0, 1, 0]}
  correctFeedback="Storage and large-batch memory traffic follow the total count. Arithmetic per token, and the weights one lone request touches, follow the active count."
  incorrectFeedback="Every expert must be stored, so memory and download size follow the total count. A batch of 64 tokens touches nearly every expert, so its weight reads approach the total. One request reads only its active experts, and each token's arithmetic always follows the active count."
/>

<MultipleChoice
  id="kc_moe_3"
  question="A team needs a 7-billion-parameter model for code tab completion and serves it on one GPU. Which architecture fits this case?"
  options={[
    'A dense model',
    'An MoE model with 128 experts and 8 active per token',
    'An MoE model with 8 experts and 2 active per token',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Models under 8 billion parameters run efficiently as dense models, and a domain-specific model is effectively one expert, so routing adds cost without benefit.',
    'Incorrect. MoE pays off mainly for models above 100 billion parameters. Splitting a 7-billion-parameter model into 128 experts adds routing work for little saving.',
    'Incorrect. Even a small MoE adds a router and spreads a narrow task across experts that it does not need. A dense model of the same size is simpler and as fast.',
  ]}
/>
