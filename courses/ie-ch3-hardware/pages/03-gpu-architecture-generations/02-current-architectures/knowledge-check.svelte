<script module>
  export const pageConfig = { title: 'Knowledge Check: Current Architectures' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Current Architectures</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="Which architecture first introduced FP4 Tensor Core support along with the MXFP8, MXFP4, and NVFP4 microscaling formats?"
  options={['Ada Lovelace', 'Blackwell', 'Hopper']}
  correct={1}
  optionFeedback={[
    'Incorrect. Ada Lovelace supports FP8, the same lowest precision as Hopper.',
    'Correct. Blackwell added FP4 and the microscaling formats for better quality retention at low precision.',
    'Incorrect. Hopper introduced FP8. FP4 arrived one generation later.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A team wants to split one large model across eight GPUs in a node using efficient parallelism. Why is the L40 a poor fit?"
  options={[
    'It does not support FP8 inference',
    'It does not support NVLink',
    'It has less than 16 GB of VRAM',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Lovelace GPUs, including the L40, support FP8 inference.',
    'Correct. Lovelace GPUs lack NVLink, so they cannot use the high-bandwidth interconnect that efficient multi-GPU parallelism requires.',
    'Incorrect. The L40 has 48 GB of VRAM. Its limitation for multi-GPU work is the interconnect, not capacity.',
  ]}
/>

<MultipleChoice
  id="kc3"
  question="Which kernel uses the asynchronous data transfer and execution features introduced with Hopper to speed up attention?"
  options={['FlashAttention 3', 'FlashAttention 4', 'Pipeline Parallelism']}
  correct={0}
  optionFeedback={[
    'Correct. FlashAttention 3 targets Hopper and uses its asynchronous features to improve attention performance and memory efficiency.',
    'Incorrect. FlashAttention 4 targets Blackwell and its extended asynchronous loading and storing features.',
    'Incorrect. Pipeline Parallelism is a method for splitting a model across GPUs, not an attention kernel.',
  ]}
/>
