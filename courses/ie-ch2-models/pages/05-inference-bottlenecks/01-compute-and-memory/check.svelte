<script module>
  export const pageConfig = { title: 'Knowledge Check: Compute and Memory' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Compute and Memory</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_ops_1"
  question="A GPU delivers 400 teraFLOPS of dense FP16 compute and 2 TB/s of memory bandwidth. What is its FP16 ops:byte ratio?"
  options={['0.005', '200', '800']}
  correct={1}
  optionFeedback={[
    'Incorrect. This divides bandwidth by compute. The ops:byte ratio divides operations per second by bytes per second.',
    'Correct. (400 × 10^12) / (2 × 10^12) = 200 operations per byte.',
    'Incorrect. This multiplies the two values. The ratio divides compute by bandwidth.',
  ]}
/>

<MultipleChoice
  id="kc_ops_2"
  question="A kernel is memory bound on a GPU. The team rewrites the kernel to perform its arithmetic faster without changing its memory traffic. What is the expected effect on the kernel's runtime?"
  options={['Little or no improvement', 'A large improvement', 'A switch to being compute bound']}
  correct={0}
  optionFeedback={[
    'Correct. A memory-bound kernel waits on memory bandwidth, so faster arithmetic leaves the limit unchanged.',
    'Incorrect. Compute is not the limiting resource for a memory-bound kernel, so faster compute does not shorten the wait on memory.',
    'Incorrect. The classification depends on operations per byte moved. The rewrite changes neither, so the kernel stays memory bound.',
  ]}
/>
