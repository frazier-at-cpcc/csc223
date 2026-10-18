<script module>
  export const pageConfig = { title: 'Re-Using the KV Cache' };
</script>

<script>
  import { Video } from 'tessera-learn';
  import kvCacheGrowthTranscript from '$assets/videos/kv-cache-growth.txt?raw';
  import RequestTimeline from '$shared/sims/RequestTimeline.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Re-Using the KV Cache</h1>

<Signal kind="recall" chapter={2} title="The KV cache within one request">
  <p>
    During <Term id="prefill">prefill</Term>, the engine writes the key and value tensors of every prompt token to the
    <Term id="kv-cache" />. Each <Term id="decode">decode</Term> step appends the keys and values of one more token. Without the cache, the
    engine would recompute every earlier token for each new one, and LLM inference would be unbearably slow. Every
    inference engine uses the KV cache within each request by default.
  </p>
</Signal>

<h2>Video: How the KV Cache Grows</h2>
<Video src="$assets/videos/kv-cache-growth.mp4" title="How the KV Cache Grows, explainer video" transcript={kvCacheGrowthTranscript} />
<details class="video-answer">
  <summary>Check your answer to the question at the end of the video</summary>
  <p>The cache holds 2,500 entries after prefill and 2,800 entries after 300 decode steps. Each decode step adds one entry.</p>
</details>

<h2>Caching between requests</h2>
<p>
  Engineers gain more from the KV cache by re-using it across requests. <strong>Prefix caching</strong> re-uses the
  KV cache of a shared prefix from an earlier request, so prefill skips those tokens. Skipping prefill lowers
  <Term id="time-to-first-token">time to first token (TTFT)</Term>, because prefill produces the first token.
</p>
<p>
  Pay-per-token APIs charge less for cache-hit input tokens than for cache-miss tokens for this reason. Reading a
  cached token takes very little compute or time. The same principle lowers latency and raises <Term id="throughput">throughput</Term> on your
  own deployments, which saves money.
</p>

<h2>Workloads where prefix caching pays off</h2>
<p>A two-token prefix saves little. In some domains, prefix caching skips prefill on thousands of tokens.</p>
<ul>
  <li>
    <strong>Complex system prompts.</strong> <Term id="agent">Agents</Term>, customer-facing chatbots,
    <Term id="rag">RAG</Term> scaffolds, and tool calls send a long <Term id="system-prompt">system prompt</Term> on every call.
  </li>
  <li><strong>Code completion.</strong> Coding tools pass the same thousands of lines of code as shared context.</li>
  <li><strong>Documents and retrieval.</strong> Summarization, question answering, and retrieval place repeated context ahead of the user prompt.</li>
  <li>
    <strong>Multi-turn conversations.</strong> Each turn repeats every earlier message in the
    <Term id="chat-template">chat template</Term>, so savings grow with every turn.
  </li>
</ul>

<Signal kind="try" title="Watch a prefix cache hit">
  <ol>
    <li>The simulator opens on a different example. Select the "Prefix cache hit" scenario first, then press Step once. Record the TTFT and how many prompt tokens prefill computed.</li>
    <li>Press Reset, move the prefix cache slider to 0 tokens, and press Step once. Record the new TTFT.</li>
    <li>Step to the end of the request. Record how many KV cache entries the request holds, and explain why the cached entries count toward it.</li>
  </ol>
</Signal>

<RequestTimeline
  headingLevel={2}
  title="Prefix caching and time to first token"
  promptTokens={['You', 'are', 'a', 'travel', 'agent', '.', 'Quote', 'prices', 'in', 'euros', '.', 'User', ':', 'Find', 'a', 'hotel', 'in', 'Lisbon', '?']}
  outputTokens={['Hotel', 'Avenida', 'costs', '140', 'euros', '.']}
  prefillMs={380}
  itlMs={25}
  prefixCachedTokens={11}
/>

<h2>Simulator practice: cached tokens and TTFT</h2>
<NumericQuestion
  id="prefix_sim_1"
  question="Select the Prefix cache hit scenario, then set the prefix cache slider to 7 tokens. What TTFT does the simulator report after the prefill pass, in milliseconds?"
  answer={420}
  tolerance={1}
  unit="ms"
  correctFeedback="Correct. Prefill must compute 28 − 7 = 21 of the 28 prompt tokens, so TTFT = 560 ms × 21 ÷ 28 = 420 ms."
  incorrectFeedback="The scenario has a 28-token prompt and a full prefill time of 560 ms. With 7 tokens cached, prefill computes 21 tokens, so TTFT = 560 × 21 ÷ 28 = 420 ms."
/>
