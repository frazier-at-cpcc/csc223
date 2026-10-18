<script module>
  export const pageConfig = { title: 'Caching' };
</script>

<h1>Caching</h1>

<p>
  <dfn><strong>Caching</strong></dfn> reuses the KV cache between requests that share a prefix. The
  <dfn><strong>KV cache</strong></dfn> holds the cached results of the attention algorithm for each token, so the model
  does not recompute them.
</p>

<h2>Shared prefixes</h2>

<p>
  Many requests begin with identical text. A coding assistant sends the same long system prompt with every request. A
  multi-turn chat resends the whole conversation history each turn. An agent repeats its tool instructions on every step.
</p>

<p>
  Without caching, the model processes that shared text again for every request. With caching, the model reuses the
  stored attention results for the prefix and processes only the new tokens.
</p>

<h2>Worked example</h2>

<p>
  Two requests share a 2,000-token system prompt. The first request builds the KV cache for those 2,000 tokens. The second
  request reuses that cache and computes attention only for its own new tokens. The second user sees the first output
  token sooner.
</p>
