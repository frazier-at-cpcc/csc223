<script module>
  export const pageConfig = { title: 'Why Video Generation Is Demanding' };
</script>

<script>
  import ModalityFlow from '../../../components/ModalityFlow.svelte';
</script>

<h1>Why Video Generation Is Demanding</h1>

<ModalityFlow
  number="6.10"
  caption="Video generation models take text prompts and may take keyframes or other image, audio, and video input."
  alt="A text prompt and optional keyframes or media flow into a video generation model, which outputs a video"
  description="Two inputs, a text prompt and optional keyframes or other image, audio, or video input, flow into a box labeled video generation model. The model outputs a video clip."
  inputs={['Text prompt', 'Keyframes or media|(optional)']}
  model="Video|generation model"
  output="Video clip"
/>

<p>
  Video generation is the most demanding modality. Run these models on Blackwell GPUs whenever possible,
  or on Rubin GPUs once they are available. These GPUs provide three things video models need:
</p>

<ul>
  <li>high memory capacity for Context Parallelism,</li>
  <li>fast Tensor Cores for attention, and</li>
  <li>microscaling data formats for more precise quantization.</li>
</ul>

<h2>Same archetype as images, more data</h2>

<p>
  Video generation works like image generation, but it renders a full video from latent space instead
  of a single frame. It uses every image generation technique plus additional optimizations. Like image
  generation, it is compute bound and works by iterative denoising. Video models take about the same
  number of denoising steps, around 50, but each step processes far more data.
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

<p>
  Every attention calculation therefore processes a huge amount of data. Attention accounts for 70 to
  80 percent of compute time in video models, which makes it the most important target for
  optimization.
</p>
