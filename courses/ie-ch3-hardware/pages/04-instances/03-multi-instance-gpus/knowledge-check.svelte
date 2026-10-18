<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Instance GPUs' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Instance GPUs</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="Which workload is the best candidate for a multi-instance GPU partition of an H100?"
  options={[
    'A 1-billion-parameter embedding model with modest traffic',
    'A 400-billion-parameter language model that exceeds one GPU',
    'A video generation model that needs a full node of FLOPS',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Models with a couple of billion parameters or fewer cannot use a full H100 effectively, so a MIG slice avoids wasting resources.',
    'Incorrect. A model too large for one GPU needs multiple GPUs connected by NVLink, which is the opposite of partitioning.',
    'Incorrect. Video generation is compute-bound and demanding. It needs more GPU, not a fraction of one.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="An SXM H100 has 132 Streaming Multiprocessors, and MIG divides them into seven evenly sized compute slices. What happens to the leftover SMs that remain after MIG forms those slices?"
  options={[
    'They are added to the slice with the most memory',
    'They form a smaller eighth compute slice',
    'They stay idle',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. MIG keeps every compute slice the same size. It does not give extra SMs to any one slice.',
    'Incorrect. The H100 offers exactly seven compute slices. The eighth position in the slice layout is unused.',
    'Correct. MIG creates seven evenly sized compute slices and leaves the leftover SMs idle.',
  ]}
/>
