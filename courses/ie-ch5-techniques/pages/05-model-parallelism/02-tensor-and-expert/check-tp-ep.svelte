<script module>
  export const pageConfig = { title: 'Knowledge Check: Tensor and Expert Parallelism' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Tensor and Expert Parallelism</h1>
<p>These questions are ungraded. All three practice objective 8: choosing a parallelism strategy.</p>

<NumericQuestion
  id="kc_tpep_1"
  question="An MoE model with 256 experts runs in EP32. How many complete experts does each GPU host?"
  answer={8}
  unit="experts"
  correctFeedback="Correct. 256 experts divided across 32 GPUs places 8 whole experts on each GPU."
  incorrectFeedback="The EP degree counts GPUs. Divide the experts by the GPUs: 256 ÷ 32 = 8 whole experts per GPU."
/>

<MultipleChoice
  id="kc_tpep_2"
  question="Why does Expert Parallelism need less inter-GPU communication than Tensor Parallelism?"
  options={[
    'It sends no tokens at all between the GPUs',
    'It skips the all-reduce after every layer',
    'It stores a full model copy on every GPU',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. EP still passes tokens between GPUs to reach the experts they activate.',
    'Correct. TP requires an all-reduce after each split layer. EP passes tokens to their experts but skips that per-layer collection, and it replicates only the small router.',
    'Incorrect. Only the small router is replicated. Each expert lives on one GPU.',
  ]}
/>

<MultipleChoice
  id="kc_tpep_3"
  question="A dense 120-billion-parameter model serves a latency-sensitive coding assistant on one node of eight GPUs. Which strategy gives the lowest per-user latency?"
  options={['Expert Parallelism across eight GPUs', 'Pipeline Parallelism in eight stages', 'Tensor Parallelism across eight GPUs']}
  correct={2}
  optionFeedback={[
    'Incorrect. A dense model has no experts, so Expert Parallelism does not apply.',
    'Incorrect. Eight pipeline stages run one after another for each token, which raises per-request latency.',
    'Correct. Every GPU reads one eighth of each layer in parallel, and NVLink keeps the per-layer all-reduce fast inside the node.',
  ]}
/>
