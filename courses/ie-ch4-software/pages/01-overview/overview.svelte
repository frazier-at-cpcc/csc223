<script module>
  export const pageConfig = { title: 'Chapter Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Chapter 4: Software</h1>

<p>
  NVIDIA leads the inference market in large part because of the mature software
  ecosystem around its hardware. This chapter surveys that ecosystem, from code
  that runs directly on the GPU to systems that coordinate hundreds of GPUs.
</p>

<h2>How this chapter fits the book</h2>

<p>
  Chapter 2 introduced the models that inference serves. Chapter 3 described the
  GPUs and accelerators that run them. This chapter covers the software layer
  between the two. Chapter 5 then builds on this layer to explain the
  optimization techniques, such as quantization, speculative decoding, and
  disaggregation, that inference engines and NVIDIA Dynamo implement.
</p>

<h2>Why software moves faster than hardware</h2>

<p>
  Hardware iteration is slow. Leading hardware companies release a new GPU
  architecture at most once a year, and a two-year cycle is more common.
</p>

<p>
  Software iteration is fast. Running a newly released open model on its first
  day often requires a nightly build or prerelease version of every software
  dependency. The low barrier to entry also means that many organizations build
  inference software. Key contributors include:
</p>

<ul>
  <li>NVIDIA, which builds a software ecosystem that runs from CUDA up to Dynamo.</li>
  <li>Hugging Face, which hosts the registry for open models and maintains the transformers and diffusers libraries.</li>
  <li>The Linux Foundation, which hosts hardware-agnostic projects such as PyTorch and vLLM.</li>
  <li>LMSYS Org, which develops inference and evaluation tools, most notably SGLang.</li>
</ul>

<p>
  The field changes too quickly for any single chapter to catalog. The chapter
  therefore concentrates on foundational technologies with long-term relevance.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Classify an inference task by the level of the software stack where it happens.</li>
  <li>Distinguish the components of CUDA and the kernel libraries that inference engineers build on.</li>
  <li>Explain why kernel implementations are tied to specific GPU architectures and determine what a hardware change requires of a manually selected kernel.</li>
  <li>Calculate the memory reads and writes that kernel fusion removes from a sequence of kernels.</li>
  <li>Explain how PyTorch supports inference through autograd, compilation, and the transformers and diffusers reference libraries.</li>
  <li>Compare the safetensors and ONNX model formats and the ONNX Runtime and TensorRT runtimes for a given need.</li>
  <li>Select vLLM, SGLang, or TensorRT-LLM for a deployment scenario.</li>
  <li>Judge whether a deployment justifies the added complexity of NVIDIA Dynamo.</li>
  <li>Design a performance benchmark that reflects production traffic and isolates the effect of each optimization.</li>
  <li>Differentiate benchmarking from profiling and choose a profiling tool for a stated investigation.</li>
</ol>

<Callout type="info">
  <p>
    Each lesson ends with an ungraded knowledge check. The graded chapter quiz in
    the final section covers every objective. You need a score of 70 percent to
    pass.
  </p>
</Callout>
