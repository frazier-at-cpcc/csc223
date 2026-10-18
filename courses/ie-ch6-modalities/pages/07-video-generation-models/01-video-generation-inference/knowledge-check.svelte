<script module>
  export const pageConfig = { title: 'Knowledge Check: Video Generation' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Video Generation</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_video_gen_1"
  question="A team wants to raise the throughput of its video generation service. It proposes increasing the batch size from one to eight on its eight-GPU node. Why is this proposal unlikely to help?"
  options={[
    'Video generation is compute bound, so larger batches do not add useful throughput',
    'Video generation is memory-bandwidth bound, so larger batches overflow the KV cache',
    'Video generation already batches denoising steps, so the batch size is fixed at eight',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Compute-bound workloads gain little from batching. The only way to improve throughput and cost is to make the model faster.',
    'Video generation is compute bound, not bandwidth bound, and it does not rely on a KV cache.',
    'Video models run one video at a time across all eight GPUs, a batch size of one.',
  ]}
/>
