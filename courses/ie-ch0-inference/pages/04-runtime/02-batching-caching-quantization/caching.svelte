<script module>
  export const pageConfig = { title: 'Caching' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Caching</h1>

<p>
  <dfn><strong>Caching</strong></dfn> reuses the <Term id="kv-cache">KV cache</Term> between requests that share a prefix. The KV cache
  stores the key and value tensors for every token already processed. When a new request begins with tokens that an
  earlier request already processed, the model reuses their keys and values instead of recomputing them.
</p>

<h2>Shared Prefixes</h2>

<p>Many requests begin with identical text.</p>

<ul>
  <li>A coding assistant sends the same long <Term id="system-prompt">system prompt</Term> with every request.</li>
  <li>A multi-turn chat resends the whole conversation history on each turn.</li>
  <li>An <Term id="agent">agent</Term> repeats its tool instructions on every step.</li>
</ul>

<p>
  Without caching, <Term id="prefill">prefill</Term> processes that shared text again for every request. With caching, prefill reads
  the stored keys and values for the prefix and computes only the new tokens.
</p>

<Signal kind="worked" title="A shared system prompt">
  <p>Two requests to a support assistant each begin with the same 2,400-token system prompt and add 60 tokens of their own.</p>
  <ol>
    <li>The first request finds nothing in the cache. Prefill computes all 2,460 tokens and stores their keys and values.</li>
    <li>The second request finds the 2,400 prompt tokens already cached. Prefill computes only its own 60 tokens.</li>
    <li>Prefill for the second request does about 60 / 2,460, or roughly 2 percent, of the first request's work.</li>
  </ol>
  <p>
    The second user sees the first output token much sooner. Caching targets a high time to first token caused by long,
    repeated prefixes.
  </p>
</Signal>

<p>Chapter 5 covers prefix caching and how routers send requests to the replica that holds a matching cache.</p>
