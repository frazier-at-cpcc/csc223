<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import { MultipleChoice, Matching, Sorting } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<p>
  This chapter applies ideas from Chapters 2 and 5 to six new modalities. Answer these four ungraded
  items from memory before you continue. Each item names the chapter that taught the idea. The
  feedback restates the rule if you need it.
</p>

<Signal kind="recall" chapter={2} title="Bottlenecks, guidance, and attention cost">
  <p>
    Chapter 2 classified each workload as compute bound or memory bound, counted the forward passes that
    classifier-free guidance adds, and showed that attention cost grows with the square of sequence
    length. Image, video, and speech models in this chapter rely on all three ideas.
  </p>
</Signal>

<Sorting
  id="recall_bottleneck"
  question="Sort each workload by the resource that usually limits it."
  items={[
    'LLM decode for a single user',
    'LLM prefill of a long prompt',
    'One denoising step of an image generation model',
    'Generating a video clip on an eight-GPU node',
  ]}
  targets={['Compute bound', 'Memory-bandwidth bound']}
  correct={[1, 0, 0, 0]}
  correctFeedback="Decode at a small batch size loads every weight to produce one token, so memory bandwidth limits it. Prefill, image generation, and video generation process many positions at once, so arithmetic limits them."
  incorrectFeedback="Recall the Chapter 2 rule: a workload that does a lot of arithmetic for every byte it loads is compute bound. Single-user decode does little arithmetic per weight loaded, so it is memory-bandwidth bound. Prefill and diffusion models process many positions per pass and are compute bound."
/>

<NumericQuestion
  id="recall_cfg_passes"
  question="An image generation request runs 25 denoising steps with classifier-free guidance on every step. How many forward passes through the denoising model does it make?"
  answer={50}
  unit="forward passes"
  correctFeedback="Guidance runs one pass with the prompt and one without on each step: 25 × 2 = 50."
  incorrectFeedback="Classifier-free guidance runs two forward passes per step, one conditioned on the prompt and one unconditioned. 25 steps × 2 passes = 50 forward passes."
/>

<MultipleChoice
  id="recall_quadratic"
  question="A transformer processes a full sequence with self-attention. The sequence length doubles. About how much does the attention computation grow?"
  options={['About twice as much', 'About four times as much', 'About eight times as much']}
  correct={1}
  optionFeedback={[
    'Linear layers grow by about two times, because they process each position once. Attention compares every position with every other position.',
    'Correct. Attention compares N positions with N positions, so its cost grows with N squared. Doubling N multiplies the work by about 2 × 2 = 4.',
    'Eight times would follow from cubic growth. Attention compares pairs of positions, so its cost grows with the square of the length.',
  ]}
/>

<Signal kind="recall" chapter={5} title="Optimization techniques">
  <p>
    Chapter 5 built a toolkit of techniques for LLM serving. Each modality lesson asks which of these tools
    still applies, so recall what each one does.
  </p>
</Signal>

<Matching
  id="recall_techniques"
  question="Match each Chapter 5 technique to what it does."
  pairs={[
    { left: 'Prefix caching', right: 'Reuses the stored keys and values of a repeated prompt prefix, so prefill skips those tokens' },
    { left: 'KV cache quantization', right: 'Stores keys and values at lower precision to cut memory use and bandwidth' },
    { left: 'Speculative decoding', right: 'Drafts several tokens and verifies them in one forward pass of the target model' },
    { left: 'Disaggregation', right: 'Runs prefill and decode on separate, independently scaled workers' },
    { left: 'Microscaling (MX) formats', right: 'Give each block of 32 values its own scale factor, with hardware support starting on Blackwell' },
  ]}
  correctFeedback="Each lesson in this chapter tests these techniques against a new modality."
  incorrectFeedback="Review Chapter 5: prefix caching reuses a cached prefix, KV cache quantization shrinks the cache, speculation drafts and verifies tokens, disaggregation separates the two phases, and microscaling formats scale small blocks of values."
/>
