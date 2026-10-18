<script module>
  export const pageConfig = { title: 'Knowledge Check: Memory and Caches' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Memory and Caches</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="Which level of the GPU cache hierarchy is shared across all Streaming Multiprocessors?"
  options={['L0', 'L1', 'L2']}
  correct={2}
  optionFeedback={[
    'Incorrect. L0 is an instruction cache for a single Tensor Core.',
    'Incorrect. L1 is shared memory within one Streaming Multiprocessor. Each SM has its own L1.',
    'Correct. L2 is the global cache shared across every Streaming Multiprocessor on the GPU.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A model's weights occupy 40 GB. Using the 50 percent KV cache headroom guideline, what is the minimum VRAM the GPU needs?"
  options={['40 GB', '60 GB', '80 GB']}
  correct={1}
  optionFeedback={[
    'Incorrect. 40 GB holds only the weights. With no headroom for the KV cache, inference runs slowly or crashes with an OOM error.',
    'Correct. 40 GB of weights plus 50 percent headroom, or 20 GB, gives a minimum of 60 GB.',
    'Incorrect. 80 GB doubles the weight size. That margin is generous, but the guideline sets the minimum at 1.5 times the weights.',
  ]}
/>

<MultipleChoice
  id="kc3"
  question="A chat service runs LLM decode at a batch size of four and needs more tokens per second. Which specification should guide the GPU choice?"
  options={['L2 cache size', 'Memory bandwidth', 'Sparse FLOPS']}
  correct={1}
  optionFeedback={[
    'Incorrect. L2 cache is tens of megabytes. Decode still streams every weight from VRAM, so the VRAM transfer rate sets the pace.',
    'Correct. Decode at low to medium batch sizes is memory-bound, so higher memory bandwidth produces more tokens per second.',
    'Incorrect. Inference is dense by default, and decode is limited by memory bandwidth rather than compute.',
  ]}
/>
