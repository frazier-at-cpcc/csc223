<script module>
  export const pageConfig = { title: 'Visual Tokens and the Longer Sequence' };
</script>

<h1>Visual Tokens and the Longer Sequence</h1>

<p>
  As a rule of thumb, one high-resolution image adds about 1,000 visual tokens to the input sequence.
  At a high level, image tokens behave like regular text tokens. They add up quickly, though.
</p>

<div class="worked">
  <p><strong>Worked example.</strong> A user sends a 200-token question with three high-resolution photos.</p>
  <ul>
    <li>Text: 200 tokens</li>
    <li>Images: 3 × 1,000 = 3,000 tokens</li>
    <li>Total input: about 3,200 tokens, so the images account for roughly 94 percent of the sequence</li>
  </ul>
</div>

<p>
  Across VLMs, the primary inference challenge is the longer input sequence and the larger
  key-value (KV) cache that comes with it. The challenge appears in both phases of inference.
</p>

<ul>
  <li>
    <strong>Prefill:</strong> each image is patched, embedded, tokenized, and fed into prefill as part
    of the input sequence. More image tokens mean more prefill work and a longer time to first token.
  </li>
  <li>
    <strong>Decode:</strong> the mechanics match an LLM, but every generated token attends over a
    longer context. Some models also add attention variants for the image tokens.
  </li>
</ul>
