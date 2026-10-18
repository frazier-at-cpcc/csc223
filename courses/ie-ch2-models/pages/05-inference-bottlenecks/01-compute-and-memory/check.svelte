<script module>
  export const pageConfig = { title: 'Knowledge Check: Compute and Memory' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Compute and Memory</h1>

<p>
  These questions are ungraded and practice objective 8, classifying an operation as compute bound or memory
  bound. Retry them as often as you like.
</p>

<NumericQuestion
  id="kc_ops_1"
  question="A GPU delivers 400 teraFLOPS of dense FP16 compute and 2 TB/s of memory bandwidth. What is its FP16 ops:byte ratio?"
  answer={200}
  unit="operations per byte"
  correctFeedback="(400 × 10^12) / (2 × 10^12) = 200 operations per byte."
  incorrectFeedback="Divide operations per second by bytes per second. Both use the tera prefix, so the prefixes cancel: 400 / 2 = 200 operations per byte."
/>

<NumericQuestion
  id="kc_ops_2"
  question="In FP8, the H100 SXM delivers 1,979 teraFLOPS of dense compute. Its memory bandwidth is 3,350 GB/s. What is its FP8 ops:byte ratio, to the nearest whole number?"
  answer={591}
  tolerance={1}
  unit="operations per byte"
  correctFeedback="3,350 GB/s is 3.35 × 10^12 bytes per second, so (1,979 × 10^12) / (3.35 × 10^12) ≈ 591. FP8 doubles the compute while the bandwidth stays the same, so the ratio doubles."
  incorrectFeedback="Convert 3,350 GB/s to 3.35 TB/s before dividing: 1,979 / 3.35 ≈ 591 operations per byte. Dividing 1,979 by 3,350 without converting gives 0.59, which is off by a factor of 1,000."
/>

<MultipleChoice
  id="kc_ops_3"
  question="A kernel is memory bound on a GPU. The team rewrites the kernel to perform its arithmetic faster without changing its memory traffic. What is the expected effect on the kernel's runtime?"
  options={['Little or no improvement', 'A large improvement', 'A switch to being compute bound']}
  correct={0}
  optionFeedback={[
    'Correct. A memory-bound kernel waits on memory bandwidth, so faster arithmetic leaves the limit unchanged.',
    'Incorrect. Compute is not the limiting resource for a memory-bound kernel, so faster compute does not shorten the wait on memory.',
    'Incorrect. The classification depends on operations per byte moved. The rewrite changes neither, so the kernel stays memory bound.',
  ]}
/>
