<script module>
  export const pageConfig = { title: 'Knowledge Check: Sizing and Strategy' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Sizing and Strategy</h1>
<p>These questions are ungraded. The first practices objective 7, estimating GPU count. The other two practice objective 8, choosing a parallelism strategy.</p>

<NumericQuestion
  id="kc_sizing_1"
  question="A 32-billion-parameter model is served in FP16 on L40S GPUs at a planning factor of 1.8. Instances offer 48, 96, 192, or 384 GB with 1, 2, 4, or 8 GPUs. What is the minimum number of GPUs?"
  answer={4}
  unit="GPUs"
  correctFeedback="Correct. 2 × 32 × 1.8 = 115.2 GB, which exceeds 96 GB, so the deployment needs the 192 GB instance with four GPUs."
  incorrectFeedback="FP16 uses 2 bytes per parameter, so required VRAM is 2 × 32 × 1.8 = 115.2 GB. Two L40S GPUs give only 96 GB, so round up to 192 GB, which is four GPUs."
/>

<Matching
  id="kc_sizing_2"
  question="Match each form of model parallelism to what it splits across GPUs."
  pairs={[
    { left: 'Pipeline Parallelism', right: 'Groups of whole layers, run as sequential stages' },
    { left: 'Tensor Parallelism', right: 'The weight matrices inside every layer' },
    { left: 'Expert Parallelism', right: 'Whole experts of a Mixture of Experts layer' },
  ]}
  correctFeedback="Correct. What each form splits decides how much it must communicate."
  incorrectFeedback="Pipeline Parallelism keeps layers whole and assigns them to stages. Tensor Parallelism slices every layer. Expert Parallelism keeps each expert whole on one GPU."
/>

<MultipleChoice
  id="kc_sizing_3"
  question="A team splits a dense model across eight GPUs in one node with Tensor Parallelism. Profiling shows that the GPUs spend a large share of each decode step waiting on communication. Which explanation fits?"
  options={[
    'Decode is compute bound, so the GPUs finish their math too quickly',
    'The all-reduce after every layer moves data over links slower than VRAM',
    'Tensor Parallelism copies the full model to every GPU',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Decode is memory bound at typical batch sizes, not compute bound.',
    'Correct. Every split layer ends in an all-reduce, and even NVLink runs at a fraction of VRAM speed, so communication can dominate a short decode step.',
    'Incorrect. Tensor Parallelism gives each GPU a slice of each layer, not a full copy.',
  ]}
/>
