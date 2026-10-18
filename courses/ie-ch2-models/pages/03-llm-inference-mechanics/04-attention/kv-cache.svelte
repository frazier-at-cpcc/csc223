<script module>
  export const pageConfig = { title: 'The Cost of Attention and the KV Cache' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>The Cost of Attention and the KV Cache</h1>

<h2>Quadratic cost</h2>

<p>
  Attention compares each token with every token before it. Across a full sequence of N tokens, those
  comparisons grow with N × N. Attention is therefore a quadratic-time operation with respect to sequence
  length. As the context grows, attention slows.
</p>

<h2>What the KV cache saves</h2>

<p>
  Chapter 0 introduced the <Term id="kv-cache">KV cache</Term>. This page shows the work it removes. A token's
  key and value at each layer depend only on that token and the tokens before it, so they never change once
  computed. The KV cache stores them in <Term id="gpu">GPU</Term> memory, called <Term id="vram">VRAM</Term>, and each <Term id="decode">decode</Term> step
  reuses them.
</p>

<ul>
  <li>Without a cache, every decode step would recompute the keys and values of the entire sequence so far.</li>
  <li>With a cache, each decode step computes the key, value, and query of the newest token only. It then compares that one query with every cached key.</li>
</ul>

<p>
  The comparisons of one decode step therefore grow linearly with the context length, not quadratically. Over
  a whole response the total attention work still grows quadratically, which is why long contexts stay
  expensive.
</p>

<Signal kind="worked" title="Counting the key and value computations">
  <p>A request has a 6-token prompt and produces 5 output tokens: one from <Term id="prefill">prefill</Term> and four from decode.</p>
  <pre><code>Pass                Tokens processed   Tokens processed
                    without a cache    with a cache
Prefill                   6                  6
Decode step 1             7                  1
Decode step 2             8                  1
Decode step 3             9                  1
Decode step 4            10                  1
Total                    40                 10</code></pre>
  <p>
    The cache cuts the key and value computations from 40 to 10. The saving grows with every token, because
    the uncached cost of each step rises while the cached cost stays at one token.
  </p>
</Signal>

<ul>
  <li>Prefill writes the KV cache for every prompt token.</li>
  <li>Decode reads the KV cache and appends the newest token's keys and values to it.</li>
  <li>The cache grows by one entry per token per layer, so long contexts and many concurrent requests fill GPU memory.</li>
</ul>

<p>
  Storing, sharing, and reusing the KV cache is a major topic in inference engineering. Chapter 3 sizes the
  memory it needs, and Chapter 5 covers prefix caching and KV cache offloading.
</p>
