<script module>
  export const pageConfig = { title: 'Knowledge Check: Kernel Fusion' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Kernel Fusion</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_fusion_1"
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

<MultipleChoice
  id="kc_fusion_2"
  question="Why does kernel fusion matter most during the decode phase of LLM inference?"
  options={[
    'Decode is bound by memory bandwidth.',
    'Decode is bound by compute throughput.',
    'Decode runs entirely on the CPU.',
    'Decode stores no data in memory.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Decode is memory-bound, so every unnecessary read or write slows token generation.',
    'Prefill is the compute-bound phase. Decode is limited by memory bandwidth.',
    'Decode runs on the GPU. The CPU is not the bottleneck being addressed.',
    'Decode reads model weights and the KV cache from memory on every step.',
  ]}
/>
