<script module>
  export const pageConfig = { title: 'Downsampling' };
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

<div class="worked">
  <p><strong>Worked example.</strong> A request includes eight product photos.</p>
  <ul>
    <li>High resolution: 8 × 1,000 = about 8,000 visual tokens</li>
    <li>Low resolution: about one quarter of that, or about 2,000 visual tokens</li>
  </ul>
  <p>
    The low-resolution request prefills faster and needs a smaller KV cache. The cost is detail the
    model can no longer see.
  </p>
</div>
