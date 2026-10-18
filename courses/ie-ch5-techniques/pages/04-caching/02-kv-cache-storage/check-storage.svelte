<script module>
  export const pageConfig = { title: 'Knowledge Check: KV Cache Storage' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: KV Cache Storage</h1>
<p>These questions are ungraded. All three practice objective 6: choosing a KV cache technique for a caching problem.</p>

<NumericQuestion
  id="kc_storage_1"
  question="An H200 has 141 GB of VRAM. After the model loads, weights and buffers use 95 GB. The engine setting free_gpu_memory_fraction is 0.85. How much memory, in GB, does the engine give the KV cache? Round to one decimal place."
  answer={39.1}
  tolerance={0.1}
  unit="GB"
  correctFeedback="Correct. 141 − 95 = 46 GB is free, and 0.85 × 46 GB = 39.1 GB goes to the KV cache."
  incorrectFeedback="The fraction applies to free memory, not total VRAM. Free memory is 141 − 95 = 46 GB, and 0.85 × 46 = 39.1 GB."
/>

<Matching
  id="kc_storage_2"
  question="Match each KV cache storage level to its memory type."
  pairs={[
    { left: 'G1', right: 'GPU VRAM, at terabytes per second' },
    { left: 'G2', right: 'CPU host memory, at tens to hundreds of GB per second' },
    { left: 'G3', right: 'Local SSD, at 5 to 10 GB per second' },
    { left: 'G4', right: 'Networked SSD, with the most capacity' },
  ]}
  correctFeedback="Correct. Each level down trades bandwidth for capacity."
  incorrectFeedback="The levels run from fastest and smallest to slowest and largest: VRAM, host memory, local SSD, then networked SSD."
/>

<MultipleChoice
  id="kc_storage_3"
  question="During peak hours, a replica evicts cached prefixes within minutes, and returning users miss the cache. The servers have terabytes of unused CPU RAM. Which change keeps more prefixes reusable at the lowest added latency?"
  options={[
    'Lower free_gpu_memory_fraction so prefill has more room',
    'Offload KV cache blocks to G2 host memory',
    'Offload KV cache blocks to G4 networked SSD',
    'Shorten the system prompt so each prefix is smaller',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A lower fraction gives the KV cache less memory, so prefixes would be evicted even sooner.',
    'Correct. Host memory is the fastest tier after VRAM and has spare capacity here, so evicted blocks can be read back quickly instead of recomputed.',
    'Incorrect. G4 adds capacity, but it is the slowest tier. Unused host memory offers more bandwidth.',
    'Incorrect. A shorter prompt changes the product and saves little. The problem is cache capacity, not prompt length.',
  ]}
/>
