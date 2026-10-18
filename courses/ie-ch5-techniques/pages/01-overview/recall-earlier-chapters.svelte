<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import { Matching, MultipleChoice, Sorting } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<p>
  Every technique in this chapter relieves a bottleneck that an earlier chapter introduced. Answer these four
  ungraded questions from memory before you read on. Each one names the concept that a later page extends.
</p>

<h2>Prefill, decode, and the KV cache</h2>
<Signal kind="recall" chapter={2} title="Phases and bottlenecks">
  <p>
    Quantization, speculation, caching, and disaggregation each target one phase of inference. Match each concept to
    its description.
  </p>
  <Matching
    id="rc_phases"
    question="Match each concept from Chapter 2 to its description."
    pairs={[
      { left: 'Prefill', right: 'Processes the whole prompt in one forward pass, produces the first output token, and is compute bound' },
      { left: 'Decode', right: 'Produces one token per forward pass and is memory bound at low batch sizes' },
      { left: 'KV cache', right: 'Stores the key and value tensors of every token already processed' },
      { left: 'Arithmetic intensity', right: 'The floating-point operations a workload performs for each byte it moves' },
    ]}
    correctFeedback="Correct. Prefill is compute bound and produces the first token. Decode reads every weight for each new token, so memory bandwidth limits it."
    incorrectFeedback="Prefill handles the whole prompt at once and produces the first output token. Decode adds one token per pass and waits on memory. The KV cache holds keys and values, and arithmetic intensity is FLOPs per byte moved."
  />
</Signal>

<h2>Memory planning</h2>
<Signal kind="recall" chapter={3} title="The planning factor">
  <p>
    Chapter 3 sized GPU memory with a planning factor: required <Term id="vram">VRAM</Term> is at least the factor times the weight memory.
    Section 5.4 of this chapter raises the factor for production concurrency.
  </p>
  <NumericQuestion
    id="rc_planning"
    question="A model's weights occupy 44 GB. Using Chapter 3's minimum planning factor of 1.5, what is the minimum VRAM the deployment needs, in GB?"
    answer={66}
    unit="GB"
    correctFeedback="Correct. 1.5 × 44 GB = 66 GB. The extra 22 GB is headroom for the KV cache, activations, and runtime overhead."
    incorrectFeedback="Multiply the weight memory by the planning factor: 1.5 × 44 GB = 66 GB. The factor already includes the weights, so do not add 44 GB again."
  />
</Signal>

<h2>Interconnects</h2>
<Signal kind="recall" chapter={3} title="Links inside and between nodes">
  <p>Model parallelism depends on which links a strategy crosses. Sort each link by where it carries traffic.</p>
  <Sorting
    id="rc_links"
    question="Sort each interconnect by where it carries traffic between GPUs."
    items={['NVLink', 'NVSwitch', 'InfiniBand network adapter', 'RDMA over Ethernet network adapter']}
    targets={['Between GPUs inside one node', 'Between nodes']}
    correct={[0, 0, 1, 1]}
    correctFeedback="Correct. NVLink and NVSwitch connect the GPUs inside a node. InfiniBand and RDMA-capable Ethernet adapters connect nodes."
    incorrectFeedback="NVLink and NVSwitch form the fast fabric inside a node. InfiniBand and RDMA over Ethernet connect separate nodes, at lower bandwidth and higher latency than NVLink."
  />
</Signal>

<h2>Latency metrics</h2>
<Signal kind="recall" chapter={1} title="Time to first token and tokens per second">
  <p>Each technique in this chapter improves some latency metrics and leaves others unchanged.</p>
  <MultipleChoice
    id="rc_metrics"
    question="Users of a document assistant report that answers take several seconds to begin, but text streams quickly once it starts. Which metric is out of target?"
    options={['End-to-end throughput', 'Inter-token latency', 'Time to first token', 'Tokens per second']}
    correct={2}
    optionFeedback={[
      'Incorrect. Throughput counts tokens across all users. The complaint concerns the wait for one user’s first token.',
      'Incorrect. Inter-token latency is the gap between streamed tokens, and the text streams quickly.',
      'Correct. The long wait before the first token is time to first token, which prefill determines.',
      'Incorrect. Tokens per second measures streaming speed after the first token, which users report as fast.',
    ]}
  />
</Signal>
