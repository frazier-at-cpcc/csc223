<script module>
  export const pageConfig = { title: 'Visual Tokens and the Longer Sequence' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Visual Tokens and the Longer Sequence</h1>

<p>
  As a rule of thumb, one high-resolution image adds about 1,000
  <Term id="visual-token">visual tokens</Term> to the input sequence. The exact count depends on the
  model's patch size and the image resolution, so check the model card before you rely on the rule. At
  a high level, image tokens behave like regular text <Term id="token">tokens</Term>. Image tokens add
  up quickly.
</p>

<Signal kind="worked" title="Text and images in one request">
  <p>A user sends a 200-token question with three high-resolution photos.</p>
  <ol>
    <li>Text tokens: 200.</li>
    <li>Visual tokens: 3 images × 1,000 tokens per image = 3,000 tokens.</li>
    <li>Total input: 200 + 3,000 = 3,200 tokens.</li>
    <li>Share from images: 3,000 ÷ 3,200 ≈ 94 percent of the sequence.</li>
  </ol>
  <p>Three photos make the request sixteen times longer than the question alone.</p>
</Signal>

<p>Finish the next example. The first steps are done for you.</p>

<NumericQuestion
  id="faded_vlm_tokens"
  question="A user sends a 150-token question with five high-resolution photos. Visual tokens: 5 × 1,000 = 5,000. Complete the final step: how many input tokens does the request carry in total?"
  answer={5150}
  unit="tokens"
  correctFeedback="150 text tokens + 5,000 visual tokens = 5,150 input tokens, and the photos make up about 97 percent of them."
  incorrectFeedback="Add the text tokens to the visual tokens: 150 + 5,000 = 5,150 input tokens."
/>

<h2>Effects on both phases of inference</h2>

<p>
  Across VLMs, the primary inference challenge is the longer input sequence and the larger
  <Term id="kv-cache">KV cache</Term> that comes with it. The challenge appears in both phases of
  inference.
</p>
<ul>
  <li>
    <strong>Prefill:</strong> each image is patched, embedded, tokenized, and fed into
    <Term id="prefill">prefill</Term> as part of the input sequence. More image tokens mean more prefill
    work and a longer time to first token.
  </li>
  <li>
    <strong>Decode:</strong> the mechanics match an LLM, but every generated token attends over a
    longer context. Some models also add attention variants for the image tokens.
  </li>
</ul>
