<script module>
  export const pageConfig = { title: 'Prefill and Decode' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import RequestTimeline from '$shared/sims/RequestTimeline.svelte';
</script>

<h1>Prefill and Decode</h1>

<Signal kind="recall" chapter={0} title="The two phases">
  <p>
    Chapter 0 introduced <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term>, and Chapter 1
    tied prefill to time to first <Term id="token">token</Term>. Before reading on, name the phase that reads the whole prompt and the
    phase that runs once per output token. This page shows what each phase computes inside the model.
  </p>
</Signal>

<p>
  Both phases are built from the same unit of work. A <Term id="forward-pass">forward pass</Term> is one run
  of input through every layer of the model. The phases differ in how many tokens each forward pass
  processes and in what it does with the <Term id="kv-cache">KV cache</Term>.
</p>

<h2>What each phase computes</h2>

<div class="ie-table-wrap" role="region" aria-label="The two phases of LLM inference" use:scrollable>
  <table class="ie-table">
    <caption>The two phases of LLM inference</caption>
    <thead>
      <tr><th scope="col">Phase</th><th scope="col">Tokens per forward pass</th><th scope="col">KV cache</th><th scope="col">What it produces</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Prefill</th>
        <td>Every prompt token, in parallel, in one forward pass</td>
        <td>Writes the keys and values of every prompt token at every layer</td>
        <td>The first output token</td>
      </tr>
      <tr>
        <th scope="row">Decode</th>
        <td>Only the newest token</td>
        <td>Reads every stored key and value, then appends the newest token's key and value</td>
        <td>One more output token per forward pass</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Keys and values are two vectors the model computes for every token at every layer. Lesson 4 of this section
  explains what they are and why storing them saves work.
</p>

<h2>Walking through one request</h2>

<ol>
  <li>The engine applies the <Term id="chat-template">chat template</Term> and tokenizes the request. This is step zero.</li>
  <li>Prefill runs one forward pass over all of the prompt tokens. It writes their keys and values to the KV cache and yields the <Term id="logits">logits</Term> for the first output token, which <Term id="sampling">sampling</Term> turns into that token.</li>
  <li>Decode runs a forward pass on that first output token. The pass reads the cached keys and values, appends the new token's own, and yields the second output token.</li>
  <li>Each later decode pass repeats step 3 with the newest token.</li>
  <li>The loop stops at the stop token, the <code>max_tokens</code> limit, or the end of the <Term id="context-window">context window</Term>.</li>
</ol>

<p>
  A response of N output tokens therefore takes N forward passes: one prefill pass and N − 1 decode passes.
  Prefill sets <Term id="time-to-first-token">time to first token</Term>. Each decode pass sets one
  <Term id="inter-token-latency">inter-token latency</Term>.
</p>

<Signal kind="mistake" title="Two misreadings of this lesson">
  <ul>
    <li>Decode does not produce the first output token. The prefill pass already computes the logits for it, which is why prefill sets TTFT.</li>
    <li>The KV cache does not store <Term id="attention">attention</Term> outputs or attention scores. It stores the key and value vectors of each processed token.</li>
  </ul>
</Signal>

<Signal kind="try" title="Step through a request">
  <ol>
    <li>Select the Short chat reply scenario and press Step once. Record the number of KV cache entries and the output token that appeared.</li>
    <li>Press Step until the request completes. Record the forward passes and the final KV cache entries, then explain why the cache holds one entry fewer than the prompt plus output tokens.</li>
    <li>Select Long prompt, short answer. Compare its TTFT and its number of decode passes with the first scenario.</li>
  </ol>
</Signal>

<RequestTimeline headingLevel={2} />

<h2>Practice with the simulation</h2>

<p>Use the simulation above to answer each question. Your answers are not graded.</p>

<NumericQuestion
  id="rt_kv"
  question="Load the Long prompt, short answer scenario and step until the request completes. How many entries does the KV cache hold at the end?"
  answer={27}
  unit="entries"
  correctFeedback="Prefill writes 24 prompt entries, and each of the 3 decode passes appends one more: 24 + 3 = 27. The fourth output token is never processed, so its keys and values are never written."
  incorrectFeedback="The scenario has 24 prompt tokens and 4 output tokens. Prefill writes 24 entries. The 3 decode passes each append the keys and values of the token they process, which gives 24 + 3 = 27."
/>

<NumericQuestion
  id="rt_time"
  question="Load the Short chat reply scenario and set the inter-token latency to 50 ms. At what elapsed time does the final output token arrive?"
  answer={470}
  unit="ms"
  correctFeedback="The first of the 8 tokens arrives at TTFT, 120 ms. Each of the other 7 tokens adds 50 ms: 120 + 7 × 50 = 470 ms."
  incorrectFeedback="The scenario produces 8 output tokens. The first arrives at the 120 ms prefill time. Each of the 7 decode passes adds one inter-token latency: 120 + 7 × 50 = 470 ms."
/>
