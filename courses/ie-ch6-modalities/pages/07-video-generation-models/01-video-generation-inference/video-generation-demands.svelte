<script module>
  export const pageConfig = { title: 'Why Video Generation Is Demanding' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import LatentAttention from '../../../components/LatentAttention.svelte';
</script>

<h1>Why Video Generation Is Demanding</h1>

<p>
  Video generation is the most demanding modality. Run these models on
  <Term id="blackwell">Blackwell</Term> GPUs whenever possible. The book also recommends
  <Term id="rubin">Rubin</Term>, the generation after Blackwell, once it is available. Check current
  availability, because the book predates Rubin's release. These GPUs provide three things video
  models need:
</p>
<ul>
  <li>high memory capacity for <Term id="context-parallelism">Context Parallelism</Term>,</li>
  <li>fast <Term id="tensor-core">Tensor Cores</Term> for attention, and</li>
  <li>
    <Term id="microscaling-format">microscaling data formats</Term>, which Blackwell introduced in
    hardware, for more precise quantization.
  </li>
</ul>

<h2>Same archetype as images, more data</h2>

<p>
  Video generation works like image generation, but it renders a full video from
  <Term id="latent-space">latent space</Term> instead of a single frame. It uses every image generation
  technique plus additional optimizations. Like image generation, it is
  <Term id="compute-bound">compute bound</Term> and works by iterative denoising. Video models take
  about the same number of denoising steps, around 50, but each step processes far more data.
</p>

<h2>Batch size of one</h2>

<p>
  Because video generation is compute bound, batching does not help the way it does for text. A video
  model usually runs on a full node of eight GPUs with a batch size of one. All eight GPUs cooperate on
  one video at a time. No batch-size knob trades latency for throughput here. The only way to improve
  throughput and cost is to make the model itself faster.
</p>

<h2>Attention dominates</h2>

<p>
  Early video models were framewise and generated one frame at a time, which reduced quality and
  coherence. Modern models denoise the whole video at once in latent space. An image latent space has
  two dimensions, width and height. A video latent space has three: width, height, and time.
</p>

<Signal kind="recall" chapter={2} title="Quadratic attention cost">
  <p>
    Chapter 2 showed that <Term id="attention">attention</Term> compares each position with every other
    position, so its cost grows with the square of the sequence length. Linear layers process each
    position once, so their cost grows in proportion to the length.
  </p>
</Signal>

<p>
  A video latent has width × height × time positions, so its sequence is many times longer than an
  image latent. Attention cost grows with the square of that length, while linear layers grow only
  linearly, so attention takes most of the compute. Attention accounts for 70 to 80 percent of compute
  time in video models, which makes it the most important target for optimization.
</p>

<LatentAttention />

<p>Use the quadratic rule to answer the next item.</p>

<NumericQuestion
  id="practice_attention_scaling"
  question="An image latent has 4,096 positions. A video latent with the same width and height holds 8 latent frames. By what factor does the attention work for one denoising step grow, compared with the single image?"
  answer={64}
  unit="times"
  correctFeedback="The video has 8 × 4,096 positions, 8 times as many. Attention grows with the square of the length, so 8 × 8 = 64 times the work. The linear layers grow only 8 times."
  incorrectFeedback="Find the growth in positions first: 8 latent frames give 8 times the positions. Attention cost grows with the square of the sequence length, so the factor is 8² = 64. An answer of 8 applies to the linear layers, not to attention."
/>
