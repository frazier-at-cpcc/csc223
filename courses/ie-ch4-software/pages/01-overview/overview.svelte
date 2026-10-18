<script module>
  export const pageConfig = { title: 'Chapter Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 4: Software</h1>

<p>Content current as of October 2026.</p>

<p>
  NVIDIA leads the inference market in large part because of the mature software
  ecosystem around its hardware. This chapter surveys that ecosystem, from code
  that runs directly on the <Term id="gpu">GPU</Term> to systems that coordinate hundreds of GPUs.
</p>

<h2>Where this chapter sits in the stack</h2>

<StackMap highlight={4} />

<p>
  Chapter 2 introduced the models that inference serves. Chapter 3 described the
  GPUs and accelerators that run them. This chapter covers the software layer
  between the two. Chapter 5 then builds on this layer to explain the
  optimization techniques, such as <Term id="quantization">quantization</Term>, <Term id="speculative-decoding">speculative decoding</Term>, and
  <Term id="disaggregation">disaggregation</Term>, that inference engines and NVIDIA Dynamo implement.
</p>

<h2>Why software moves faster than hardware</h2>

<p>
  Hardware iteration is slow. Leading hardware companies release a new GPU
  architecture at most once a year, and a two-year cycle is more common.
</p>

<p>
  Software iteration is fast. Running a newly released <Term id="open-model">open model</Term> on its first
  day often requires a nightly build or prerelease version of every software
  dependency. The low barrier to entry also means that many organizations build
  inference software. Key contributors include:
</p>

<ul>
  <li>NVIDIA, which builds a software ecosystem that runs from CUDA up to Dynamo.</li>
  <li><Term id="hugging-face" />, which hosts the registry for open models and maintains the transformers and diffusers libraries.</li>
  <li>The Linux Foundation, which hosts hardware-agnostic projects such as PyTorch and vLLM.</li>
  <li>LMSYS Org, which develops inference and evaluation tools, most notably SGLang.</li>
</ul>

<p>
  The field changes too quickly for any single chapter to catalog. The chapter
  therefore concentrates on foundational technologies with long-term relevance.
  Claims about engine features and hardware support are dated where they appear,
  because they change from one release to the next.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Classify an inference engineering task by the level of the software stack where it happens: CUDA, deep learning framework, inference engine, or NVIDIA Dynamo.</li>
  <li>Distinguish the CUDA components and kernel libraries by the role each one plays in inference.</li>
  <li>Determine what a change of GPU architecture requires of a manually selected kernel.</li>
  <li>Calculate the bytes of memory traffic that kernel fusion removes from a chain of elementwise kernels.</li>
  <li>Choose the model format, runtime, or PyTorch tool that fits a stated storage or deployment need.</li>
  <li>Select vLLM, SGLang, or TensorRT-LLM for a deployment by weighing hardware, model support, performance need, and engineering effort.</li>
  <li>Judge whether a deployment carries enough traffic to justify the added complexity of NVIDIA Dynamo.</li>
  <li>Apply the four workload dimensions and the one-variable rule to correct a benchmark plan.</li>
  <li>Choose the benchmarking or profiling tool that answers a stated performance question.</li>
</ol>

<Callout type="info">
  <p>
    The next page retrieves the ideas from earlier chapters that this chapter
    builds on. Each lesson ends with an ungraded knowledge check, and a synthesis
    page and a chapter glossary precede the graded quiz. The quiz covers every
    objective. You need a score of 70 percent to pass.
  </p>
</Callout>
