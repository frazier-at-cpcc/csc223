<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Instance GPUs' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Instance GPUs</h1>
<p>
  These practice items are ungraded. Each one gives feedback that explains the answer. The MIG calculations are
  on the MIG Profiles and Slices page.
</p>

<p class="ie-obj">Objective 8: Calculate the resources of a MIG profile</p>
<Matching
  id="kc_profiles"
  question="Match each H100 MIG profile to the resources it pairs."
  pairs={[
    { left: '1g.20gb', right: 'One compute slice with two memory slices' },
    { left: '2g.20gb', right: 'Two compute slices with two memory slices' },
    { left: '4g.40gb', right: 'Four compute slices with half of the VRAM' },
    { left: '7g.80gb', right: 'All seven compute slices with all of the VRAM' },
  ]}
  correctFeedback="Correct. The number before g counts compute slices, and the number before gb gives the memory, at 10 GB per memory slice."
  incorrectFeedback="Read each name in two parts. The digit before g is the compute slice count. The number before gb is the memory in gigabytes, and each memory slice holds 10 GB."
/>

<p class="ie-obj">Objective 8: Calculate the resources of a MIG profile</p>
<MultipleChoice
  id="kc_leftover"
  question="An SXM H100 has 132 Streaming Multiprocessors, and MIG divides them into seven evenly sized compute slices. What happens to the SMs left over after MIG forms those slices?"
  options={[
    'They join the slice that has the most memory',
    'They form a smaller eighth compute slice',
    'They stay idle',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. MIG keeps every compute slice the same size. It does not give extra SMs to any one slice.',
    'Incorrect. The H100 offers exactly seven compute slices. The leftover SMs do not form a usable slice.',
    'Correct. MIG creates seven evenly sized compute slices and leaves the leftover SMs idle.',
  ]}
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_mig_fit"
  question="Which workload is the best candidate for a Multi-Instance GPU slice of an H100?"
  options={[
    'A 1-billion-parameter embedding model with modest traffic',
    'A 400-billion-parameter language model that exceeds one GPU',
    'A video generation model that needs a full node of FLOPS',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A model this small cannot use a full H100 effectively at modest traffic, so a MIG slice avoids paying for idle compute and memory.',
    'Incorrect. A model too large for one GPU needs several GPUs connected by NVLink, which is the opposite of partitioning.',
    'Incorrect. Video generation is compute-bound and demanding. It needs more GPU, not a fraction of one.',
  ]}
/>
