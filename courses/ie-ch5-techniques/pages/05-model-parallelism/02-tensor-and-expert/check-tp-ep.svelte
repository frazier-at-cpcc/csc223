<script module>
  export const pageConfig = { title: 'Knowledge Check: Tensor and Expert Parallelism' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Tensor and Expert Parallelism</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_tpep_1"
  question="An MoE model with 256 experts runs in EP32. How many complete experts does each GPU host?"
  options={['4', '8', '16', '32']}
  correct={1}
  optionFeedback={[
    'Incorrect. Four experts per GPU would require EP64.',
    'Correct. 256 experts divided across 32 GPUs places 8 whole experts on each GPU.',
    'Incorrect. Sixteen experts per GPU would require EP16.',
    'Incorrect. The EP degree counts GPUs, not experts per GPU.',
  ]}
/>

<MultipleChoice
  id="kc_tpep_2"
  question="Why does Expert Parallelism need less inter-GPU communication than Tensor Parallelism?"
  options={[
    'EP does not combine every layer result across GPUs',
    'EP sends no tokens between GPUs',
    'EP stores the full model on every GPU',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. TP requires an all-reduce after each layer. EP passes tokens between experts but skips that per-layer collection, and it replicates the small router.',
    'Incorrect. EP still passes tokens between GPUs to reach the experts they activate.',
    'Incorrect. Only the small router is replicated. Each expert lives on one GPU.',
  ]}
/>
