<script module>
  export const pageConfig = { title: 'Video Inputs for VLMs' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Video Inputs for VLMs</h1>

<p>
  A video is more than a stack of images. Its frames express the motion of objects through space,
  and that motion disappears when a model sees frames one at a time. VLMs are trained on video clips
  to understand this time dimension. High-quality inference therefore processes an entire clip in a
  single call to the model.
</p>
<p>
  Videos may also carry audio. Many VLMs cannot process audio. In that case, a separate model
  transcribes the audio, and the transcript is added to the prompt.
</p>

<h2>Frame-rate arithmetic</h2>

<Signal kind="worked" title="A four-second cinematic clip">
  <p>Estimate the input sequence for a four-second cinematic clip at full resolution.</p>
  <ol>
    <li>Frames: cinematic video runs at 24 frames per second, so 4 seconds × 24 = 96 frames.</li>
    <li>Tokens per frame: each frame is an image, at about 1,000 tokens for a high-definition image.</li>
    <li>Visual tokens: 96 frames × 1,000 tokens = 96,000 tokens.</li>
  </ol>
  <p>Four seconds of video approaches 100,000 input tokens before any reduction.</p>
</Signal>

<p>
  Real video inputs do not reach this length because downsampling is practically obligatory.
  Lowering both resolution and frame rate makes it possible to evaluate a whole clip in one request.
  Each reduction multiplies: halving the frame rate halves the frames, and low resolution cuts the
  tokens per frame by about four times. Even so, video understanding models accept only very short
  clips.
</p>

<h2>After tokenization</h2>

<p>
  Once a video is tokenized and encoded, inference resembles image inference with a much longer
  context. <Term id="prefix-caching">Prefix caching</Term>,
  <Term id="kv-cache-offloading">KV cache offloading</Term>, and optimized attention implementations
  such as <Term id="flashattention">FlashAttention</Term> matter even more for input sequences of tens of
  thousands of tokens.
</p>
