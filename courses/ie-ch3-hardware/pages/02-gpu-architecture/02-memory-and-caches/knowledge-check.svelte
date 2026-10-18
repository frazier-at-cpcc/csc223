<script module>
  export const pageConfig = { title: 'Knowledge Check: Memory and Caches' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Memory and Caches</h1>
<p>
  These practice items are ungraded. Each one gives feedback that explains the answer. The VRAM and ops:byte
  calculations are on the Sizing VRAM for a Model and Memory Bottlenecks on a Spec Sheet pages.
</p>

<p class="ie-obj">Objective 2: Describe how memory feeds the Tensor Cores</p>
<Sorting
  id="kc_memory_levels"
  question="Sort each item by where it lives on an H100 during inference."
  items={['The model weights', 'The KV cache', 'L0 instruction cache', 'L1 shared memory', 'L2 cache']}
  targets={['VRAM, off-chip DRAM', 'On-chip SRAM']}
  correct={[0, 0, 1, 1, 1]}
  correctFeedback="Correct. Weights and the KV cache occupy gigabytes, so they live in VRAM. The L0, L1, and L2 caches are small, fast SRAM on the chip."
  incorrectFeedback="Compare sizes. Weights and the KV cache need gigabytes, which only VRAM provides. The three cache levels hold kilobytes to tens of megabytes of SRAM on the chip itself."
/>

<p class="ie-obj">Objective 2: Describe how memory feeds the Tensor Cores</p>
<MultipleChoice
  id="kc_shared_level"
  question="A kernel needs threads running on different Streaming Multiprocessors to reuse the same tile of data without reading it from VRAM again. Which memory level can serve that tile to all of them?"
  options={['L0 instruction cache', 'L1 shared memory', 'L2 cache']}
  correct={2}
  optionFeedback={[
    'Incorrect. L0 caches instructions for one processing block inside one SM. It does not hold data tiles.',
    'Incorrect. Each SM has its own L1. Threads on a different SM cannot read it.',
    'Correct. L2 is the global cache shared across every Streaming Multiprocessor on the GPU.',
  ]}
/>

<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<MultipleChoice
  id="kc_decode_spec"
  question="A chat service runs LLM decode at a batch size of four and needs more tokens per second. Which specification should guide the GPU choice?"
  options={['L2 cache size', 'Memory bandwidth', 'Sparse FLOPS']}
  correct={1}
  optionFeedback={[
    'Incorrect. The L2 cache holds tens of megabytes. Decode still streams most weights from VRAM, so the VRAM transfer rate sets the pace.',
    'Correct. A batch of four gives an arithmetic intensity far below any datacenter GPU ridge point, so higher memory bandwidth produces more tokens per second.',
    'Incorrect. Inference is dense by default, and decode at this batch size is limited by memory bandwidth rather than compute.',
  ]}
/>
