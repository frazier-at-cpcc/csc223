<script module>
  export const pageConfig = { title: 'Forms of Model Parallelism' };
</script>

<script>
  import { Video } from 'tessera-learn';
  import tensorVsPipelineTranscript from '$assets/videos/tensor-vs-pipeline.txt?raw';
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Forms of Model Parallelism</h1>

<Signal kind="recall" chapter={3} title="The interconnect hierarchy">
  <p>
    Within a node, GPUs communicate over <Term id="nvlink" /> through <Term id="nvswitch">NVSwitch</Term> chips.
    Between nodes, they communicate through network adapters over <Term id="infiniband" /> or RDMA-capable Ethernet.
    Every link is slower than the GPU's own VRAM, and the links between nodes add more latency than NVLink.
  </p>
</Signal>

<h2>Video: Tensor and Pipeline Parallelism</h2>
<Video src="$assets/videos/tensor-vs-pipeline.mp4" title="Tensor and Pipeline Parallelism, explainer video" transcript={tensorVsPipelineTranscript} />
<details class="video-answer">
  <summary>Check your answer to the question at the end of the video</summary>
  <p>Case 1 calls for tensor parallelism across the eight GPUs, TP8, because the GPUs share NVLink and tensor parallelism gives the lowest latency. Case 2 calls for tensor parallelism within each node and pipeline parallelism between them, TP8PP2, because tensor parallelism needs too much communication to span the slower link between nodes.</p>
</details>

<h2>Communication as the limit on scaling</h2>
<p>
  Multi-GPU inference works only when it scales efficiently from one GPU to many. The limit on that scaling is
  communication between GPUs. <Term id="decode">Decode</Term> is bound by memory bandwidth, and every interconnect runs at a fraction of VRAM
  speed, so a strategy that sends too much data between GPUs makes communication the new bottleneck. Designing
  parallelism around these links is called <strong>topology-aware parallelism</strong>.
</p>

<h2>Three primary forms</h2>
<ul>
  <li><strong>Pipeline Parallelism (PP)</strong> splits the layers of the model into sequential stages across GPUs.</li>
  <li><strong>Tensor Parallelism (TP)</strong> splits the tensors within each layer across GPUs.</li>
  <li>
    <strong>Expert Parallelism (EP)</strong> places whole experts of a <Term id="mixture-of-experts">Mixture of
    Experts (MoE)</Term> model on different GPUs.
  </li>
</ul>

<div class="ie-table-wrap" role="region" aria-label="Tradeoffs of the three forms of model parallelism" use:scrollable>
  <table class="ie-table">
    <caption>Tradeoffs of the three forms of model parallelism</caption>
    <thead>
      <tr><th scope="col">Method</th><th scope="col">Mechanism</th><th scope="col">Communication</th><th scope="col">Drawback</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">PP</th>
        <td>Each GPU handles one stage of the layers.</td>
        <td>Low: activations pass once between stages.</td>
        <td>Higher per-request latency, and stages can sit idle while they wait on each other.</td>
      </tr>
      <tr>
        <th scope="row">TP</th>
        <td>Compute-heavy operations such as matrix multiplications are split across GPUs.</td>
        <td>High: an <Term id="all-reduce">all-reduce</Term> after every split layer.</td>
        <td>The per-layer synchronization needs NVLink, so TP rarely spans nodes.</td>
      </tr>
      <tr>
        <th scope="row">EP</th>
        <td>Each expert lives within one GPU, so computation inside an expert is fast.</td>
        <td>Moderate: tokens travel to the GPUs that hold their experts.</td>
        <td>EP favors total <Term id="throughput">throughput</Term> over per-user latency, and it applies only to MoE models.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Where each form fits</h2>
<ul>
  <li>Tensor Parallelism generally gives the lowest latency within a single node.</li>
  <li>Expert Parallelism improves throughput for MoE LLMs.</li>
  <li>
    Pipeline Parallelism costs latency, so it appears mainly in multi-node inference, where its low communication
    suits the slower links between nodes.
  </li>
</ul>
<p>
  Other strategies, such as <Term id="context-parallelism">Context Parallelism</Term>, also split computation
  across devices. They are rare in LLM inference but essential for video generation, which Chapter 6 covers.
</p>
