<script module>
  export const pageConfig = { title: 'Chapter 3 Overview' };
</script>

<h1>Chapter 3 Overview: Hardware</h1>

<p>
  Inference engineering runs on <strong>accelerators</strong>: specialized hardware that loads terabytes of
  data and performs trillions of operations per second. The graphics processing unit (GPU) is the most common
  accelerator for inference, and NVIDIA leads the market for inference GPUs.
</p>
<p>
  This chapter builds a working mental model of that hardware. Inference engineers rarely design chips, but
  they choose GPUs, size deployments, and diagnose bottlenecks every day. Each of those decisions depends on
  knowing what is inside the box.
</p>

<h2>How this chapter fits the book</h2>
<p>
  Chapter 2 described the models that inference serves. This chapter describes the datacenter and local
  hardware that runs those models. Chapter 4 covers the software stack that sits on top of this hardware, and
  Chapter 5 applies both to optimization techniques. Quantization formats (section 5.1) and parallelism and
  disaggregation (sections 5.4 and 5.5) depend directly on the compute, memory, and interconnect concepts
  introduced here.
</p>

<h2>Learning objectives</h2>
<p>After completing this chapter, you will be able to:</p>
<ol>
  <li>Classify GPUs by market segment and datacenter deployments by operating mode.</li>
  <li>
    Explain how Streaming Multiprocessors, CUDA Cores, Tensor Cores, and Special Function Units divide GPU
    compute, and why Tensor Core matrix multiply and accumulate throughput measures inference compute.
  </li>
  <li>Compare GPU compute specifications by matching precision and using dense rather than sparse FLOPS.</li>
  <li>Calculate whether a model fits on a GPU from its weight size and the 50 percent KV cache headroom guideline.</li>
  <li>Match a workload's bottleneck, compute or memory bandwidth, to the GPU specification that relieves it.</li>
  <li>Differentiate NVIDIA architecture generations and Grace and Vera CPUs by naming convention and inference-relevant features.</li>
  <li>Describe the components of a cloud GPU instance and the NVLink, NVSwitch, and InfiniBand interconnect hierarchy.</li>
  <li>Determine when a multi-instance GPU partition suits a workload and calculate the resources of a partition.</li>
  <li>Compare alternative datacenter accelerators by competitive edge and shared challenges.</li>
  <li>Evaluate whether desktop or mobile local inference suits a given use case.</li>
</ol>

<h2>Chapter map</h2>
<ul>
  <li><strong>GPU Architecture</strong> examines compute units, memory, and caches inside a single GPU.</li>
  <li><strong>GPU Architecture Generations</strong> decodes NVIDIA naming and compares Hopper, Ada Lovelace, Blackwell, Rubin, and the Grace and Vera CPUs.</li>
  <li><strong>Instances</strong> explains how cloud providers package GPUs, connect them into nodes, and split them into fractions.</li>
  <li><strong>Other Datacenter Accelerators</strong> surveys the vendors competing with NVIDIA.</li>
  <li><strong>Local Inference</strong> weighs running models on desktops, laptops, and phones.</li>
  <li><strong>Chapter Quiz</strong> is the graded assessment. It covers every objective above.</li>
</ul>
<p>
  Each lesson ends with an ungraded knowledge check. Use those checks to confirm your understanding before
  the chapter quiz.
</p>
