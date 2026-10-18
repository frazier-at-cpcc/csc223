<script module>
  export const pageConfig = { title: 'Knowledge Check: Kernel Fusion' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Kernel Fusion</h1>

<p>
  These questions are ungraded. The two numeric items practice objective 4:
  calculate the bytes of memory traffic that kernel fusion removes from a chain of
  elementwise kernels. The third checks which accesses fusion removes. Use 1 MB = 10<sup>6</sup> bytes, 2 bytes per FP16 value, and 1 byte
  per FP8 value.
</p>

<NumericQuestion
  id="kc_fusion_p1"
  question="Two elementwise kernels run in sequence on a tensor of 3,000,000 FP16 values. How many megabytes of memory traffic does fusing them remove?"
  answer={12}
  tolerance={0.1}
  unit="MB"
  correctFeedback="S = 3,000,000 × 2 bytes = 6 MB. Unfused traffic is 2 × 2 × 6 = 24 MB, fused traffic is 2 × 6 = 12 MB, and fusion removes 12 MB."
  incorrectFeedback="Size the tensor first: S = 3,000,000 × 2 bytes = 6 MB. Unfused traffic is 2 × k × S = 24 MB. Fused traffic is 2 × S = 12 MB. The difference, 2 × (k − 1) × S, is 12 MB."
/>

<NumericQuestion
  id="kc_fusion_p2"
  question="Five elementwise kernels run in sequence on a tensor of 12,000,000 FP8 values. How many megabytes of memory traffic does fusing them remove?"
  answer={96}
  tolerance={0.5}
  unit="MB"
  correctFeedback="S = 12,000,000 × 1 byte = 12 MB. Unfused traffic is 2 × 5 × 12 = 120 MB, fused traffic is 24 MB, and fusion removes 96 MB."
  incorrectFeedback="FP8 uses 1 byte per value, so S = 12 MB. Unfused traffic is 2 × 5 × 12 MB = 120 MB. Fused traffic is 2 × 12 MB = 24 MB. Fusion removes 2 × (5 − 1) × 12 MB = 96 MB."
/>

<MultipleChoice
  id="kc_fusion_which"
  question="Two elementwise kernels run back-to-back on one vector. Each kernel reads its input from memory and writes its output to memory. Which memory accesses does fusing them into one kernel remove?"
  options={[
    'The final write and the intermediate read',
    'The input read and the final write',
    'The input read and the intermediate write',
    'The intermediate write and the next read',
  ]}
  correct={3}
  optionFeedback={[
    'The final result still has to be written to memory. Only the intermediate write and read disappear.',
    'The fused kernel still reads the original input and writes the final result.',
    'The fused kernel still reads the original input. Only the intermediate write and read disappear.',
    'Correct. Fusion removes the round trip in the middle: the first kernel no longer writes an intermediate result that the second kernel reads back.',
  ]}
/>
