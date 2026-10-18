<script module>
  export const pageConfig = { title: 'How the Techniques Interact' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>How the Techniques Interact</h1>

<Signal kind="summary" title="How the techniques interact">
  <p>
    Each technique relieves one bottleneck, charges its own cost, and stops paying off at a point you can predict.
    Read the table by row to decide whether one technique fits. Read it by column to see where two techniques draw
    on the same resource.
  </p>
  <div class="ie-table-wrap" role="region" aria-label="Chapter 5 techniques by bottleneck, cost, and limit" use:scrollable>
    <table class="ie-table">
      <caption>Chapter 5 techniques by bottleneck, cost, and limit</caption>
      <thead>
        <tr>
          <th scope="col">Technique</th>
          <th scope="col">Bottleneck addressed</th>
          <th scope="col">Cost</th>
          <th scope="col">Stops paying off when</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><Term id="quantization">Quantization</Term></th>
          <td>Memory bandwidth in <Term id="decode">decode</Term>; compute in <Term id="prefill">prefill</Term> when <Term id="activations">activations</Term> are also quantized</td>
          <td>Risk to output quality, and the effort of running <Term id="perplexity">perplexity</Term>, benchmarks, and custom evals</td>
          <td>Evals show a loss beyond run-to-run noise, or the GPU lacks hardware support for the format</td>
        </tr>
        <tr>
          <th scope="row"><Term id="speculative-decoding">Speculative decoding</Term></th>
          <td>Idle compute in <Term id="memory-bound">memory-bound</Term> decode, which limits <Term id="tokens-per-second">TPS</Term> and <Term id="inter-token-latency">ITL</Term></td>
          <td>Draft compute and memory, plus training for EAGLE or Medusa</td>
          <td>Large batches saturate compute, or acceptance falls with high <Term id="temperature">temperature</Term> or unpredictable text</td>
        </tr>
        <tr>
          <th scope="row"><Term id="prefix-caching">Prefix caching</Term> and <Term id="cache-aware-routing">cache-aware routing</Term></th>
          <td>Prefill recomputing shared context, which raises <Term id="time-to-first-token">TTFT</Term></td>
          <td><Term id="kv-cache">KV cache</Term> memory, plus a router that tracks cache contents</td>
          <td>Requests share no prefix, novel tokens sit at the start, or one <Term id="replica">replica</Term> leaves nothing to route between</td>
        </tr>
        <tr>
          <th scope="row">KV cache offloading</th>
          <td><Term id="vram">VRAM</Term> too small to keep reusable prefixes</td>
          <td>Slower reads from host memory or SSD</td>
          <td>Prefixes are short or rarely reused, so a slow read saves little over recomputing</td>
        </tr>
        <tr>
          <th scope="row"><Term id="model-parallelism">Model parallelism</Term></th>
          <td><Term id="weights">Weights</Term> and KV cache too large for one GPU; per-user latency</td>
          <td>More GPUs and inter-GPU communication</td>
          <td>The model fits on fewer GPUs, or the strategy sends frequent traffic over slow links</td>
        </tr>
        <tr>
          <th scope="row"><Term id="disaggregation">Disaggregation</Term></th>
          <td>Prefill and decode interfering under heavy load</td>
          <td>Extra GPUs, KV cache transfer, and two new bottlenecks to tune</td>
          <td>Volume is below about one hundred million tokens per day, the model is under one hundred billion parameters, or traffic is not prefill-heavy</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Symbiotic and competing pairs</h2>
  <ul>
    <li>
      Quantization is symbiotic with nearly everything. Smaller weights and a smaller KV cache leave memory for
      <Term id="draft-model">draft models</Term>, cached prefixes, and the cache that disaggregation transfers.
    </li>
    <li>
      Prefix caching and conditional disaggregation are symbiotic. A cached input stays on the decode engine, which
      keeps the prefill queue short.
    </li>
    <li>
      Large batches and speculative decoding compete for the same spare compute. Traffic growth that raises the
      <Term id="batch-size">batch size</Term> eventually switches speculation off.
    </li>
    <li>
      On a fixed pool of GPUs, a higher degree of parallelism per replica competes with the number of replicas.
      More GPUs per replica lowers per-user latency, and more replicas raise total <Term id="throughput">throughput</Term> and give cache-aware
      routing more caches to use.
    </li>
  </ul>

  <h2>What comes next</h2>
  <p>
    Chapter 6 applies these same techniques to vision, embedding, speech, image, and video models, where each
    modality moves the bottleneck to a different place. Context parallelism, which this chapter only named, becomes
    essential there for long video sequences.
  </p>
</Signal>

<h2>Practice: combining techniques</h2>
<p>These ungraded items practice objective 1: deciding which techniques a deployment should apply together.</p>

<Sorting
  id="syn_pairs"
  question="Sort each pair of choices by how the two interact."
  items={[
    'KV cache quantization and disaggregation',
    'Prefix caching and cache-aware routing',
    'Large batch sizes and speculative decoding',
    'Higher TP degree per replica and more replicas on a fixed GPU pool',
    'FP8 weights and a draft model that must fit beside the target',
  ]}
  targets={['Symbiotic', 'Competing']}
  correct={[0, 0, 1, 1, 0]}
  correctFeedback="Correct. Symbiotic pairs relieve each other's bottleneck. Competing pairs draw on the same compute or the same GPUs."
  incorrectFeedback="A smaller KV cache helps disaggregation and a draft model fit in memory, and routing raises prefix cache hits. Large batches use the compute that speculation needs, and GPUs given to a wider replica cannot also run extra replicas."
/>

<MultipleChoice
  id="syn_plan"
  question="A company serves a 70-billion-parameter chat model on one node of H100 GPUs at 30 million tokens per day. Every request starts with the same 5,000-token system prompt, batch sizes stay low, and output quality must not change perceptibly. Which plan should the team adopt first?"
  options={[
    'Dynamic disaggregation in 2P6D with cache-aware routing',
    'EP8 across the node with KV cache offloading to networked SSD',
    'FP8 with custom evals, prefix caching, and speculative decoding',
    'Multi-node TP8PP2 with NVFP4 quantization of every component',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Thirty million tokens per day and a 70-billion-parameter model both fall short of disaggregation, and one replica leaves nothing to route between.',
    'Incorrect. A dense chat model has no experts to distribute, and a single shared prompt fits in VRAM without a slow storage tier.',
    'Correct. FP8 speeds decode with low risk once evals confirm quality. The shared prompt makes prefix caching cut TTFT, and low batch sizes leave compute for speculation.',
    'Incorrect. The model fits on one node, so multi-node parallelism adds cost, and quantizing every component to 4 bits risks the quality requirement.',
  ]}
/>
