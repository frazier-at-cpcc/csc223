<script module>
  export const pageConfig = { title: 'Forms of Model Parallelism' };
</script>

<h1>Forms of Model Parallelism</h1>

<h2>Communication is the limit</h2>
<p>
  Multi-GPU inference works only when it scales efficiently from one GPU to many. The limit on that scaling is
  communication overhead between GPUs. Within a node, GPUs communicate over NVLink and NVSwitch. Between nodes,
  they communicate over InfiniBand.
</p>
<p>
  NVLink and InfiniBand offer high bandwidth, but each runs at a fraction of the speed of VRAM. Decode is bound by
  memory bandwidth, so multi-GPU inference must avoid bottlenecks in inter-GPU communication. Designing parallelism
  around these links is called <strong>topology-aware parallelism</strong>.
</p>

<h2>Three primary forms</h2>
<ul>
  <li><strong>Pipeline Parallelism (PP)</strong> splits the layers of the model into stages across GPUs.</li>
  <li><strong>Tensor Parallelism (TP)</strong> splits the tensors within each layer across GPUs.</li>
  <li><strong>Expert Parallelism (EP)</strong> places whole experts of a Mixture of Experts (MoE) model on different GPUs.</li>
</ul>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Tradeoffs of the three forms of model parallelism</caption>
    <thead>
      <tr><th scope="col">Method</th><th scope="col">Mechanism</th><th scope="col">Drawback</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">PP</th>
        <td>Each GPU handles one stage of the layers.</td>
        <td>Poor latency and utilization, because stages wait on each other step by step.</td>
      </tr>
      <tr>
        <th scope="row">TP</th>
        <td>Compute-heavy operations such as matrix multiplications are split across GPUs.</td>
        <td>Requires synchronization across GPUs after every layer, so it does not suit multi-node deployments.</td>
      </tr>
      <tr>
        <th scope="row">EP</th>
        <td>Each expert lives within one GPU, so computation inside an expert is fast.</td>
        <td>Tokens must route between GPUs to reach their experts. EP favors throughput over per-user latency.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Where each form fits</h2>
<ul>
  <li>Tensor Parallelism generally gives the lowest latency within a single node.</li>
  <li>Expert Parallelism improves throughput for MoE LLMs.</li>
  <li>Pipeline Parallelism appears only in multi-node inference.</li>
</ul>
<p>
  Data parallelism strategies such as Context Parallelism also split computation across devices. They are rare in
  LLM inference but essential for video generation, which Chapter 6 covers.
</p>
