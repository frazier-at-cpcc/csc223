<script module>
  export const pageConfig = { title: 'Re-Using the KV Cache' };
</script>

<h1>Re-Using the KV Cache</h1>

<p>
  During prefill, the inference engine builds a <strong>KV cache</strong>, a store of the key and value tensors for
  each token in the input sequence. During decode, the engine adds an entry for each new token. Inference is
  autoregressive, so each new token depends on every token before it.
</p>

<h2>Caching within a request</h2>
<p>
  Every inference engine uses the KV cache within each request by default. Without it, the engine would recompute
  every earlier value in the sequence for each new token, and LLM inference would be unbearably slow.
</p>

<h2>Caching between requests</h2>
<p>
  Engineers gain more from the KV cache by re-using it across requests. <strong>Prefix caching</strong> re-uses the
  KV cache of a shared prefix from an earlier request, so the engine skips prefill for those tokens. Skipping prefill
  improves time to first token (TTFT).
</p>
<p>
  Pay-per-token APIs charge less for cache-hit input tokens than for cache-miss tokens for this reason. Reading a
  cached token takes very little compute or time. The same principle lowers latency and raises throughput on your
  own deployments, which saves money.
</p>

<h2>Where prefix caching pays off</h2>
<p>A two-token prefix saves little. In some domains, prefix caching skips prefill on thousands of tokens.</p>
<ul>
  <li><strong>Complex system prompts.</strong> Agents, customer-facing chatbots, RAG scaffolds, and tool calls send long system prompts on every call.</li>
  <li><strong>Code completion.</strong> Coding functions pass the same thousands of lines of code as shared context.</li>
  <li><strong>Documents and retrieval.</strong> Summarization, question answering, and retrieval place repeated context ahead of the user prompt.</li>
  <li><strong>Multi-turn conversations.</strong> Each turn repeats every earlier message in the chat template, so savings grow with every turn.</li>
</ul>
