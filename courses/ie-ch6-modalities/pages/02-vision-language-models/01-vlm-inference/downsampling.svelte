<script module>
  export const pageConfig = { title: 'Downsampling' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Downsampling</h1>

<p>
  VLMs introduce a quality-speed tradeoff that text models do not have. <strong>Downsampling</strong>
  converts an image or video into visual tokens at a lower resolution.
</p>
<ul>
  <li>A high-resolution representation takes about four times as many tokens as a low-resolution one.</li>
  <li>The high-resolution representation preserves more detail, such as small text or fine structure.</li>
</ul>
<p>
  Downsampling is generally unnecessary for a single image. It becomes useful when a request carries
  several images or video clips, because the token count multiplies with every additional input.
</p>

<Signal kind="worked" title="Eight product photos">
  <p>A request includes eight product photos.</p>
  <ol>
    <li>High resolution: 8 × 1,000 = about 8,000 visual tokens.</li>
    <li>Low resolution: about one quarter of that, 8,000 ÷ 4 = about 2,000 visual tokens.</li>
  </ol>
  <p>
    The low-resolution request prefills faster and needs a smaller KV cache. The cost is detail the
    model can no longer see.
  </p>
</Signal>

<Signal kind="mistake" title="Downsampling every request">
  <p>
    Downsampling is a quality decision, not a free speedup. A task that reads small printed text, such as
    a serial number on a label, can fail at low resolution even though the request becomes four times
    shorter. Downsample when the task needs only coarse content, and keep high resolution when it needs
    fine detail.
  </p>
</Signal>
