<script module>
  export const pageConfig = { title: 'Chapter 2 Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Chapter 2: Models</h1>

<p>
  <strong>Inference engineering</strong> is the practice of making generative AI models faster, less
  expensive, and more reliable without sacrificing the quality that makes them valuable. Both goals
  depend on a working intuition for how models operate internally.
</p>

<p>
  This chapter builds that intuition. It covers the neural network basics behind every model, the
  mechanics and architecture of large language models (LLMs), the pipelines behind image and video
  generation, a method for finding the bottleneck of an inference workload, and the main approaches
  to optimizing attention.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Describe the structure of a neural network in terms of nodes, layers, hidden states, encoders, and decoders.</li>
  <li>Explain why activation functions are placed between linear layers.</li>
  <li>Trace an LLM request from tokenization through prefill, decode, and token sampling, and predict the effect of temperature, top-k, and top-p.</li>
  <li>Interpret an LLM architecture name and identify the layers and sublayers of a transformer-based LLM.</li>
  <li>Explain how attention relates tokens and how the KV cache changes the cost of attention.</li>
  <li>Compare dense and Mixture of Experts models by total parameters, active parameters, and behavior under batched serving.</li>
  <li>Calculate the forward passes an image generation request requires from its denoising steps and guidance.</li>
  <li>Select between standard, few-step, and video generation models for a workload based on latency, quality, and compute cost.</li>
  <li>Classify an inference workload as compute bound or memory bound by comparing arithmetic intensity to a GPU's ops:byte ratio.</li>
  <li>Differentiate lossless attention implementations from attention algorithms that change time complexity.</li>
</ol>

<h2>How this chapter fits the book</h2>

<p>
  Chapter 1 established the prerequisites for inference work. This chapter explains the models
  themselves. Later chapters build directly on it. Chapter 3 applies the bottleneck analysis to GPU
  hardware. Chapter 5 returns to the KV cache and Expert Parallelism as optimization techniques.
  Chapter 6 applies the image and video material to specific modalities.
</p>

<h2>How this course works</h2>

<p>
  Each lesson closes with an ungraded knowledge check. You may retry those questions as often as you
  like. The final section holds a graded chapter quiz of 12 questions. A score of 70 percent or higher
  passes the chapter.
</p>

<Callout type="tip">
  <p>
    Many pages include a recreated figure from the book. Each figure has a caption and an expandable
    text description that states everything the figure shows.
  </p>
</Callout>
