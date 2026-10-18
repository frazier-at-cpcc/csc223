<script module>
  export const pageConfig = { title: 'Knowledge Check: Video Generation' };
</script>

<script>
  import { MultipleChoice, Matching, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Video Generation</h1>

<p>
  This check is ungraded. All three items practice objective 9: justify an optimization plan for image
  or video generation from the workload's compute-bound, attention-heavy profile.
</p>

<Matching
  id="kc_video_caching"
  question="Match each caching approach to what it lets the model skip."
  pairs={[
    { left: 'Timestep-based caching', right: 'Entire denoising steps, by reusing the outputs of earlier steps' },
    { left: 'Transformer-based caching', right: 'Layers inside one step, by reusing stored hidden states' },
    { left: 'The KV cache in LLM decode', right: 'Recomputing the keys and values of tokens already processed' },
  ]}
  correctFeedback="Video caching reuses earlier results across denoising steps or layers. It is a different mechanism from the KV cache that LLMs use across tokens."
  incorrectFeedback="Timestep-based caching skips whole denoising steps. Transformer-based caching skips layers within a step by reusing hidden states. The LLM KV cache stores keys and values so decode does not recompute them for earlier tokens."
/>

<Sorting
  id="kc_video_selective"
  question="A team applies selective quantization to attention in a video model. Sort each part of the run into the precision the lesson recommends."
  items={[
    'The first 10 of 50 denoising steps',
    'The last 30 of 50 denoising steps',
    'The first transformer layer',
    'The hidden layers between the first and last',
    'The last transformer layer',
  ]}
  targets={['Keep at full precision', 'Quantize']}
  correct={[0, 1, 0, 1, 0]}
  correctFeedback="Early steps set the outline and prompt adherence, and the first and last layers take the input and produce the output. Later steps and hidden layers tolerate approximation."
  incorrectFeedback="Protect the parts that matter most for quality: the early steps, which set the outline, and the first and last layers, which handle input and output. Quantize the later steps and the hidden layers."
/>

<MultipleChoice
  id="kc_video_batch"
  question="A team wants to raise the throughput of its video generation service on one eight-GPU node. An engineer proposes raising the batch size from one to eight videos. Which reasoning best evaluates the proposal?"
  options={[
    'It helps, because a larger batch loads each weight once and reuses it for all eight videos',
    'It fails to help, because the work is compute bound, so the plan should make each step cheaper',
    'It fails to help, because the KV cache that eight videos need overflows the memory of the GPUs',
  ]}
  correct={1}
  optionFeedback={[
    'Sharing weight loads across a batch helps memory-bound work such as LLM decode. Video generation is compute bound, so the arithmetic for eight videos takes about eight times as long.',
    'Correct. A compute-bound workload already keeps the GPUs busy at a batch size of one. Throughput and cost improve only when each step does less work, through faster kernels, caching, quantization, or parallelism.',
    'Video diffusion models do not keep a KV cache across denoising steps, and memory is not the limit here. Compute is.',
  ]}
/>
