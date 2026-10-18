<script module>
  export const pageConfig = { title: 'Knowledge Check: KV Cache Storage' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: KV Cache Storage</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_storage_1"
  question="A B200 has 180 GB of VRAM. Weights and buffers use 120 GB, and free_gpu_memory_fraction is set to 0.5. How much memory does TensorRT-LLM allocate to the KV cache?"
  options={['30 GB', '60 GB', '90 GB', '150 GB']}
  correct={0}
  optionFeedback={[
    'Correct. 180 GB minus 120 GB leaves 60 GB free, and half of 60 GB is 30 GB.',
    'Incorrect. 60 GB is the free memory. The fraction allocates only half of it.',
    'Incorrect. The fraction applies to free memory, not to the 180 GB total.',
    'Incorrect. The allocation cannot exceed the 60 GB that remains after the weights load.',
  ]}
/>

<MultipleChoice
  id="kc_storage_2"
  question="An engine must offload KV cache blocks out of VRAM. Which storage level offers the highest bandwidth for those blocks?"
  options={['G2 host memory', 'G3 local SSD', 'G4 networked SSD']}
  correct={0}
  optionFeedback={[
    'Correct. CPU RAM delivers tens to hundreds of GB per second, the fastest level after VRAM.',
    'Incorrect. A local SSD delivers 5 to 10 GB per second, slower than host memory.',
    'Incorrect. Networked SSD is the slowest level, although it offers the most capacity.',
  ]}
/>
