<script module>
  export const pageConfig = { title: 'Capstone Step 5: Optimizations' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Capstone Step 5: Optimizations</h1>

<Signal kind="recall" chapter={5}>
  <p>
    <Term id="quantization">Quantization</Term> stores weights in fewer bits, which cuts memory and speeds up memory-bound decode. It is
    the one technique in Chapter 5 that can lower output quality, so it needs a quality check. <Term id="prefix-caching">Prefix caching</Term>
    reuses the KV cache for a prefix that many requests share, and <Term id="cache-aware-routing">cache-aware routing</Term> sends each request
    to the replica that already holds its prefix.
  </p>
</Signal>

<p>
  Beacon now runs in FP16 on 4 H100s per replica. The team considers serving the model in <Term id="fp8" />, which takes
  1 byte per parameter. An evaluation of the FP8 model on the same 2,000 tickets resolves 83.5 percent, which still
  clears the 80 percent bar.
</p>

<p class="ie-objective">Decision 5a, drawing on Chapters 3 and 5</p>
<NumericQuestion
  id="cap_fp8_gpus"
  question="In FP8, Beacon's 70.6 billion parameters take 70.6 GB. At a planning factor of 1.5, what is the minimum number of 80 GB H100 GPUs per replica? Tensor parallelism allows 1, 2, 4, or 8 GPUs."
  answer={2}
  unit="GPUs"
  correctFeedback="Correct. 1.5 × 70.6 = 105.9 GB, which one 80 GB GPU cannot hold and two GPUs, with 160 GB, can. Two is a valid tensor-parallel size, so FP8 halves the GPUs per replica."
  incorrectFeedback="Multiply the FP8 weight memory by the planning factor: 1.5 × 70.6 GB = 105.9 GB. One H100 holds 80 GB, which is too little. Two hold 160 GB, which is enough, and 2 divides the model's 8 KV heads evenly. The answer is 2 GPUs."
/>

<p class="ie-objective">Decision 5b, drawing on Chapter 5</p>
<MultipleChoice
  id="cap_prefix"
  question="Every Beacon request begins with the same 1,000-token system prompt, and Beacon will run several replicas. Which pair of techniques removes the repeated prefill of that prompt?"
  options={[
    'Prefix caching, with cache-aware routing',
    'Speculative decoding, with a small draft model',
    'A larger batch size, with continuous batching',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Prefix caching keeps the KV cache for the shared system prompt, so each request prefills only its own 500 tokens. Cache-aware routing keeps requests on replicas that already hold the prefix.',
    'Incorrect. Speculative decoding speeds up decode by verifying drafted tokens. It does nothing for the prefill of a repeated prompt.',
    'Incorrect. A larger batch raises throughput, but every request in it still prefills the full 1,000-token prompt from scratch.',
  ]}
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    Beacon serves the FP8 model on 2 H100s per replica, with prefix caching and cache-aware routing. One replica still
    serves 16 concurrent users at about 50 tokens per second each, about 800 output tokens per second in total.
  </p>
</details>
