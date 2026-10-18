<script module>
  export const pageConfig = { title: 'The Cost of Attention and the KV Cache' };
</script>

<h1>The Cost of Attention and the KV Cache</h1>

<h2>Quadratic cost</h2>

<p>
  Attention looks for relationships between the current token and every previous token in the sequence.
  Across a full sequence of N tokens, that comparison grows with N × N. Attention is therefore a
  quadratic-time operation with respect to sequence length. As the context grows, attention slows.
</p>

<h2>The KV cache</h2>

<p>
  In practice, attention during decode runs in linear time, because of the KV cache. The
  <strong>KV cache</strong> stores the key and value tensors for every previous token. Each new token
  looks up those stored values instead of recomputing them. Only the new token's comparisons with the
  prior tokens remain, which grows linearly with sequence length.
</p>

<ul>
  <li>Prefill builds the KV cache.</li>
  <li>Decode reads the KV cache and adds the new token's keys and values to it.</li>
  <li>The KV cache lives in GPU memory by default.</li>
</ul>

<p>
  Storing, accessing, and reusing the KV cache is a major topic in inference engineering. Section 5.3 of
  the book covers it in detail.
</p>
