<script module>
  export const pageConfig = { title: 'Decisions Across the Software Stack' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Decisions Across the Software Stack</h1>

<Signal kind="summary" title="One service, four levels, one measurement loop">
  <p>
    Each level of the software stack asks the engineer for a different decision.
    The table follows one deployment through every level. A company is launching
    a customer-support assistant on an open 70-billion-parameter dense model with
    a mature architecture. It runs on four H100 GPUs in one region. The target is
    a P90 time to first token under 400 ms, and a team of three engineers owns
    the service.
  </p>
</Signal>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="table-scroll" role="region" aria-label="Decision table, scrolls sideways on small screens" tabindex="0">
  <div class="table-wrap" role="region" aria-label="The decision at each stack level, what settles it, how to verify it, and the result for the support assistant" use:scrollable>
  <table class="data">
    <caption>The decision at each stack level, what settles it, how to verify it, and the result for the support assistant</caption>
    <thead>
      <tr>
        <th scope="col">Level</th>
        <th scope="col">Decision</th>
        <th scope="col">What settles it</th>
        <th scope="col">How to verify it</th>
        <th scope="col">Support assistant</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">NVIDIA Dynamo</th>
        <td>Adopt Dynamo or serve with the engine alone</td>
        <td>Traffic volume and worker count. Disaggregation and cache-aware routing need many busy workers.</td>
        <td>Benchmark both setups at production load</td>
        <td>One replica on four GPUs has no routing choices to make. Use the engine alone and revisit at many replicas.</td>
      </tr>
      <tr>
        <th scope="row">Inference engine</th>
        <td>vLLM, SGLang, or TensorRT-LLM</td>
        <td>Hardware, then model support, then performance need, then engineering effort</td>
        <td>Benchmark the finalists on production-shaped traffic from a shared baseline</td>
        <td>All three support the model on H100s. The small team starts with vLLM and benchmarks TensorRT-LLM only if vLLM misses the 400 ms target.</td>
      </tr>
      <tr>
        <th scope="row">Deep learning framework</th>
        <td>Model format and execution path</td>
        <td>Whether an engine supports the architecture, whether the graph must travel with the weights, and load safety</td>
        <td>Load test in the chosen runtime, and check outputs against reference code</td>
        <td>The engine supports the architecture, so the weights ship as safetensors. No ONNX export or torch.compile is needed.</td>
      </tr>
      <tr>
        <th scope="row">CUDA</th>
        <td>Which kernels run, and which to fuse</td>
        <td>The GPU architecture, and the bytes each kernel moves, since memory-bound kernels run at the speed of memory</td>
        <td>Profile with PyTorch Profiler or Nsight Compute, then re-benchmark</td>
        <td>The engine selects Hopper kernels automatically. No plugin kernels are added, so a later GPU change carries no porting obligation.</td>
      </tr>
    </tbody>
  </table>
  </div>
</div>

<h2>The measurement loop that connects the levels</h2>

<p>
  Benchmarking runs through every row. Suppose the first benchmark of the
  assistant reports a P90 time to first token of 520 ms. The team follows the
  chapter's loop:
</p>

<ol>
  <li>Confirm that the benchmark matches production on all four workload dimensions and starts from a recorded baseline.</li>
  <li>Change one engine setting at a time and re-run the benchmark.</li>
  <li>If configuration cannot close the gap, profile one prefill pass to find the operation that dominates the time.</li>
  <li>Fix the cause at the level where it lives. A slow elementwise chain calls for kernel fusion at the CUDA level. A missing architecture feature calls for a different engine.</li>
  <li>Re-run the benchmark against the baseline before shipping.</li>
</ol>

<p>
  Two habits carry across all four levels. First, decide at the lowest level that
  can fix the problem, and no lower: most services never need a custom kernel.
  Second, trust a decision only after a realistic benchmark confirms it.
</p>

<h2>What comes next</h2>

<p>
  This chapter treated quantization, speculative decoding, prefix caching,
  parallelism, and disaggregation as engine features to switch on. Chapter 5
  opens each technique to show how it works, which bottleneck it relieves, and
  when it stops paying off.
</p>
