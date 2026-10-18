<script module>
  export const pageConfig = { title: 'The KV Cache' };
</script>

<script>
  import { Video } from 'tessera-learn';
  import kvCacheGrowthTranscript from '$assets/videos/kv-cache-growth.txt?raw';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>The KV Cache</h1>

<p>
  Inside each layer, <Term id="attention">attention</Term> lets every token draw information from the tokens before it. For each token,
  attention computes three vectors: a query, a key, and a value. The new token's query is compared with its own key
  and the keys of earlier tokens, and the resulting scores weight a sum of their values. Chapter 2 explains
  <Term id="query-key-value">queries, keys, and values</Term> in detail.
</p>

<p>
  The keys and values of earlier tokens do not change when a new token arrives. Recomputing them on every pass would
  waste work. The <dfn><strong>KV cache</strong></dfn> stores the key and value tensors for every token already
  processed, so later forward passes reuse them instead of recomputing them.
</p>

<h2>Video: How the KV Cache Grows</h2>
<Video src="$assets/videos/kv-cache-growth.mp4" title="How the KV Cache Grows, explainer video" transcript={kvCacheGrowthTranscript} tracks={[{ src: '$assets/videos/kv-cache-growth.vtt', kind: 'captions', srclang: 'en', label: 'English' }]} />
<details class="video-answer">
  <summary>Check your answer to the question at the end of the video</summary>
  <p>The cache holds 2,500 entries after prefill and 2,800 entries after 300 decode steps. Each decode step adds one entry.</p>
</details>

<h2>How the Cache Grows</h2>

<p>
  The prefill pass writes keys and values for every prompt token. Each decode pass then processes one token and appends
  that token's keys and values to the cache. The cache grows by one entry per token for the life of the request.
</p>

<Signal kind="worked" title="Counting forward passes and KV cache entries">
  <p>A request has a 5-token prompt and produces a 3-token response. Count the passes and the cache entries.</p>
  <ol>
    <li>Pass 1, prefill: the model processes all 5 prompt tokens. The cache holds 5 entries. The pass produces output token 1.</li>
    <li>Pass 2, decode: the model processes output token 1 and appends its entry. The cache holds 6 entries. The pass produces output token 2.</li>
    <li>Pass 3, decode: the model processes output token 2 and appends its entry. The cache holds 7 entries. The pass produces output token 3, and the response is complete.</li>
  </ol>
  <p>
    Three output tokens took three forward passes. The final cache holds 5 + 3 − 1 = 7 entries. The keys and values of the
    last token are never written, because no later pass processes that token.
  </p>
  <p>
    In general, a request with a P-token prompt and an N-token response runs N forward passes, and its cache holds
    P + N − 1 entries when the last token is produced.
  </p>
</Signal>

<Signal kind="mistake" title="The KV cache does not store attention outputs">
  <p>
    The cache holds the key and value tensors of earlier tokens. It does not hold the result of attention. Every decode
    pass still computes attention for the new token, and it reads the cached keys and values to do so.
  </p>
</Signal>

<h2>Why the Cache Matters</h2>

<p>
  The cache saves computation, but it costs GPU memory. It grows with every token of every request that a GPU serves at
  the same time, and it shares memory with the weights. Chapter 3 plans GPU memory for it, and Chapter 5 reuses it across
  requests.
</p>
