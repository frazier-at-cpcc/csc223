<script module>
  export const pageConfig = { title: 'Chapter 2 Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 2: Models</h1>

<p>Content current as of October 2026.</p>

<p>
  Chapter 0 defined <Term id="inference-engineering">inference engineering</Term> as the work of making generative AI models faster,
  less expensive, and more reliable without losing the quality that makes them valuable. Every one of those
  goals depends on a working intuition for how models operate internally.
</p>

<p>
  This chapter builds that intuition. It covers the neural network basics behind every model, the
  mechanics and architecture of large language models (<Term id="llm">LLMs</Term>), the pipelines behind image and video
  generation, a method for finding the bottleneck of an inference workload, and the main approaches to
  optimizing <Term id="attention">attention</Term>.
</p>

<h2>Where this chapter sits in the inference stack</h2>

<StackMap highlight={2} />

<p>
  Models sit in the runtime layer, directly above the hardware. Chapter 3 applies this chapter's bottleneck
  analysis to <Term id="gpu">GPU</Term> specification sheets. Chapter 4 runs the models on inference engines. Chapter 5 returns to
  the <Term id="kv-cache">KV cache</Term> and <Term id="mixture-of-experts">Mixture of Experts</Term> as optimization targets. Chapter 6 applies the image and video material
  to specific modalities.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Explain why a neural network places <Term id="activation-function">activation functions</Term> between its linear layers.</li>
  <li>Trace an LLM request from its tokenized prompt through <Term id="prefill">prefill</Term>, <Term id="decode">decode</Term>, and <Term id="token">token</Term> <Term id="sampling">sampling</Term>.</li>
  <li>Interpret a <Term id="transformer">transformer</Term> model's architecture from its configuration name and block structure.</li>
  <li>Explain how the KV cache changes the cost of attention during decode.</li>
  <li>Compare the memory and compute demands of dense and Mixture of Experts models under <Term id="batching">batched</Term> serving.</li>
  <li>Calculate the denoiser <Term id="forward-pass">forward passes</Term> that an image generation request requires.</li>
  <li>Select an image or video generation model that meets a workload's latency, quality, and cost constraints.</li>
  <li>Classify an inference operation as <Term id="compute-bound">compute bound</Term> or <Term id="memory-bound">memory bound</Term> by calculating its <Term id="arithmetic-intensity">arithmetic intensity</Term>.</li>
  <li>Differentiate lossless attention implementations from attention algorithms that change complexity.</li>
</ol>

<h2>How this course works</h2>

<ul>
  <li>The next page retrieves the concepts from Chapters 0 and 1 that this chapter builds on.</li>
  <li>Each lesson closes with an ungraded knowledge check. Pages that teach a calculation also hold practice questions. Retry any ungraded question as often as you like.</li>
  <li>Two interactive simulations let you step through an LLM request and move a workload along the roofline.</li>
  <li>A synthesis page and a chapter glossary precede the graded quiz of 14 questions. A score of 70 percent or higher passes the chapter.</li>
</ul>

<Callout type="tip">
  <p>
    Underlined terms open their series definition when selected. Each recreated figure has a caption and an
    expandable text description that states everything the figure shows.
  </p>
</Callout>
