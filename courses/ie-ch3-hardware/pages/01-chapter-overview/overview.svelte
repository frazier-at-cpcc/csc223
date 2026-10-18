<script module>
  export const pageConfig = { title: 'Chapter 3 Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 3 Overview: Hardware</h1>

<p>
  Inference engineering runs on <strong>accelerators</strong>: specialized hardware that loads terabytes of
  data and performs trillions of operations per second. The <Term id="gpu">graphics processing unit (GPU)</Term> is the most common accelerator
  for inference, and NVIDIA leads the market for inference GPUs.
</p>
<p>
  This chapter builds a working mental model of that hardware. Inference engineers rarely design chips, but
  they choose GPUs, size deployments, and diagnose bottlenecks every day. Each of those decisions depends on
  knowing what is inside the box.
</p>

<p>Content current as of October 2026.</p>

<StackMap highlight={3} />

<h2>How this chapter fits the series</h2>
<p>
  Chapter 2 described the models that inference serves and showed why prefill is compute-bound and decode is
  memory-bound. This chapter turns that analysis into hardware choices. It reads GPU spec sheets, sizes
  memory, and traces the links between GPUs. Chapter 4 covers the software stack that runs on this hardware.
  Chapter 5 applies both to optimization techniques: its Number Formats lesson builds on the FP8 and FP4
  support introduced here, and its Model Parallelism and Disaggregation sections build on the interconnects
  described here.
</p>

<Callout type="info">
  <p>
    Hardware changes quickly. Product names, release dates, and specifications in this chapter are stated as of
    October 2026, and each specification table names its source. Check a current vendor datasheet before you
    provision hardware.
  </p>
</Callout>

<h2>Learning objectives</h2>
<p>After completing this chapter, you will be able to:</p>
<ol>
  <li>Explain how Streaming Multiprocessors, CUDA Cores, Tensor Cores, and Special Function Units divide GPU compute.</li>
  <li>Describe how VRAM and the on-chip SRAM caches feed data to the Tensor Cores.</li>
  <li>Calculate dense FLOPS at a common precision to compare two GPU spec sheets.</li>
  <li>Calculate the minimum VRAM for a model from its parameter count, its precision, and the 1.5 planning factor.</li>
  <li>Select the GPU specification that relieves a workload's bottleneck by comparing its arithmetic intensity with the GPU's ops:byte ratio.</li>
  <li>Differentiate NVIDIA GPU generations by the inference features that their names signal.</li>
  <li>Determine which interconnect limits a data path inside a GPU instance or across a multi-node cluster.</li>
  <li>Calculate the compute share, memory, and instance count of a Multi-Instance GPU profile.</li>
  <li>Recommend a deployment target for a workload, from datacenter GPUs and alternative accelerators to desktops and phones.</li>
</ol>

<h2>Chapter map</h2>
<ul>
  <li><strong>Chapter Overview</strong> retrieves the Chapter 2 concepts this chapter depends on, then introduces GPU market segments and deployment modes.</li>
  <li><strong>GPU Architecture</strong> examines compute units, memory, and caches inside a single GPU, and reads bottlenecks from a spec sheet.</li>
  <li><strong>GPU Architecture Generations</strong> decodes NVIDIA naming and compares Hopper, Ada Lovelace, Blackwell, Rubin, and the Grace and Vera CPUs.</li>
  <li><strong>Instances</strong> explains how cloud providers package GPUs, connect them into nodes, and split them into fractions.</li>
  <li><strong>Other Datacenter Accelerators</strong> surveys the vendors competing with NVIDIA.</li>
  <li><strong>Local Inference</strong> weighs running models on desktops, laptops, and phones.</li>
  <li><strong>Chapter Synthesis</strong> works through hardware choices for complete scenarios and lists the chapter glossary.</li>
  <li><strong>Chapter Quiz</strong> is the graded assessment. It covers every objective above.</li>
</ul>
<p>
  Each lesson ends with ungraded practice items, and each item names the objective it practices. Use those
  items to confirm your understanding before the chapter quiz.
</p>
