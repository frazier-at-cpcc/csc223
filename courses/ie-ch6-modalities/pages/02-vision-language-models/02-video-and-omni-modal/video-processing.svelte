<script module>
  export const pageConfig = { title: 'Video Inputs for VLMs' };
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

<div class="worked">
  <p><strong>Worked example.</strong> Estimate the input sequence for a four-second cinematic clip.</p>
  <ul>
    <li>Cinematic video runs at 24 frames per second, so 4 seconds × 24 = 96 frames.</li>
    <li>Each frame is an image. At about 1,000 tokens per high-definition image, 96 × 1,000 = 96,000 tokens.</li>
  </ul>
  <p>Four seconds of video approaches 100,000 input tokens before any reduction.</p>
</div>

<p>
  Real video inputs do not reach this length because downsampling is practically obligatory.
  Lowering both resolution and frame rate makes it possible to evaluate a whole clip in one request.
  Even so, current video understanding models accept only very short clips.
</p>

<h2>After tokenization</h2>

<p>
  Once a video is tokenized and encoded, inference resembles image inference with a much longer
  context. Prefix caching, KV cache offloading, and optimized attention implementations matter even
  more for input sequences of tens of thousands of tokens.
</p>
