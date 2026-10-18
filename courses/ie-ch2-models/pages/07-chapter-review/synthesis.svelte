<script module>
  export const pageConfig = { title: 'Synthesis: From Workload to Optimization' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import { Matching } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Synthesis: From Workload to Optimization</h1>

<Signal kind="summary" title="One map of the chapter">
  <p>
    Every section of this chapter feeds one chain of reasoning. The shape of a <Term id="forward-pass">forward pass</Term> sets its arithmetic
    intensity. The intensity, compared with the <Term id="gpu">GPU</Term>'s <Term id="ops-byte-ratio">ops:byte</Term> ratio of about 295 on an <Term id="h100">H100</Term> in FP16, sets the
    bottleneck. The bottleneck decides which latency metric suffers and which optimizations help.
  </p>

  <div class="ie-table-wrap" role="region" aria-label="Workload, bottleneck, metric, and the optimizations later chapters apply" use:scrollable>
    <table class="ie-table">
      <caption>Workload, bottleneck, metric, and the optimizations later chapters apply</caption>
      <thead>
        <tr>
          <th scope="col">Workload</th>
          <th scope="col">Work in one forward pass</th>
          <th scope="col"><Term id="arithmetic-intensity">Arithmetic intensity</Term></th>
          <th scope="col">Bottleneck</th>
          <th scope="col">Metric it sets</th>
          <th scope="col">Optimizations and where they are taught</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><Term id="llm">LLM</Term> <Term id="prefill">prefill</Term></th>
          <td>Every prompt <Term id="token">token</Term> at once, a matrix-matrix multiplication</td>
          <td>High: about the number of prompt tokens for linear layers, about 2,060 for fused <Term id="attention">attention</Term> over 4,096 tokens</td>
          <td><Term id="compute-bound">Compute bound</Term></td>
          <td><Term id="time-to-first-token">Time to first token</Term></td>
          <td><Term id="flashattention">FlashAttention</Term> (Chapter 2), prefix caching and chunked prefill (Chapter 5), more compute per GPU (Chapter 3)</td>
        </tr>
        <tr>
          <th scope="row">LLM <Term id="decode">decode</Term>, dense model</th>
          <td>One new token per request, a vector-matrix multiplication</td>
          <td>Low: about the <Term id="batching">batch</Term> size for linear layers, about 1 to 16 for attention, set by how many query heads share each KV head</td>
          <td><Term id="memory-bound">Memory bound</Term></td>
          <td><Term id="inter-token-latency">Inter-token latency</Term> and tokens per second</td>
          <td>Batching (Chapters 4 and 7), quantization and speculative decoding (Chapter 5), <Term id="pagedattention">PagedAttention</Term> (Chapter 2), more memory bandwidth (Chapter 3)</td>
        </tr>
        <tr>
          <th scope="row">LLM decode, <Term id="mixture-of-experts">Mixture of Experts</Term> model</th>
          <td>One new token per request through 8 of 128 experts per layer</td>
          <td>Low: compute follows the active count, while batched weight reads approach the total count</td>
          <td>Memory bound, with memory sized for every <Term id="parameter">parameter</Term></td>
          <td>Inter-token latency and tokens per second</td>
          <td><Term id="expert-parallelism">Expert Parallelism</Term> across GPUs (Chapter 5)</td>
        </tr>
        <tr>
          <th scope="row">Image denoising</th>
          <td>The whole latent, thousands of patch tokens, twice per guided step</td>
          <td>High, like prefill</td>
          <td>Compute bound</td>
          <td>Time per image</td>
          <td>Few-step models (Chapter 2), step and guidance optimizations (Chapter 6)</td>
        </tr>
        <tr>
          <th scope="row">Video denoising</th>
          <td>The whole X, Y, and T latent, at a batch size of one per node</td>
          <td>Very high, dominated by attention</td>
          <td>Compute bound</td>
          <td>Seconds of inference per second of video</td>
          <td>Context parallelism and attention optimizations (Chapter 6)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    Read any row from left to right to predict how a workload behaves before measuring it. A change that raises
    intensity, such as a larger batch or a fused <Term id="kernel">kernel</Term>, moves a memory-bound row toward the compute ceiling. A
    change that cuts passes, such as a few-step model, shrinks the work without changing the bottleneck. The
    <Term id="kv-cache">KV cache</Term> works differently. It keeps the number of passes the same and removes the
    recomputation inside each decode pass, which leaves one token per request in each pass and makes decode memory
    bound.
  </p>
</Signal>

<Matching
  id="syn_map"
  question="Retrieve the map. Match each workload to its bottleneck and the metric it sets."
  pairs={[
    { left: 'LLM prefill of a long prompt', right: 'Compute bound, and it sets time to first token' },
    { left: 'LLM decode at a batch size of 1', right: 'Memory bound, and it sets inter-token latency' },
    { left: 'One guided image denoising step', right: 'Compute bound, and it sets time per image' },
    { left: 'Decode attention at any batch size', right: 'Memory bound at about 1 to 16 operations per byte' },
  ]}
  correctFeedback="Passes that process many tokens at once are compute bound. Passes that process one token per request are memory bound, and decode attention stays memory bound because each request reads its own KV cache."
  incorrectFeedback="Sort by the shape of the pass. Prefill and denoising process thousands of tokens per pass, which gives high intensity. Decode processes one token per request, which gives intensity near the batch size for linear layers and near the query-head group size, 1 to 16, for attention."
/>

<h2>What comes next</h2>

<p>
  Chapter 3 turns from models to the hardware they run on. It reads GPU specification sheets for the compute,
  memory bandwidth, and memory capacity that set the ridge point and the weight budget you calculated in this
  chapter.
</p>
