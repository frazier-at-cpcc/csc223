<script module>
  export const pageConfig = { title: 'Welcome to Chapter 0' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Chapter 0: Inference</h1>

<p>
  This chapter opens <cite>Inference Engineering</cite>. It defines inference, explains why serving generative AI models
  is hard, and introduces the three layers that a complete inference platform needs. It closes with a map of the rest of
  the book.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Distinguish training from inference in the lifecycle of a generative AI model.</li>
  <li>Explain why inference for generative AI models is more complex than inference for classic machine learning models.</li>
  <li>Classify an inference task as belonging to the runtime, infrastructure, or tooling layer.</li>
  <li>Select the model performance technique that addresses a described runtime bottleneck.</li>
  <li>Interpret a speculative decoding sequence to determine which draft tokens are accepted, rejected, discarded, and generated.</li>
  <li>Explain how infrastructure problems change from autoscaling to capacity to a unified pool of compute as scale grows.</li>
  <li>Describe how a global control plane and workload planes unify multi-cloud capacity and improve reliability and latency.</li>
  <li>Evaluate developer-experience options against the balance of control and abstraction that inference engineers need.</li>
  <li>Identify the chapter of the book that addresses a given inference engineering topic.</li>
</ol>

<h2>How this chapter fits the book</h2>

<p>
  Chapter 0 is the frame for everything that follows. It names the three layers of an inference platform: runtime,
  infrastructure, and tooling. Each later chapter goes deeper into a part of that stack, from use case planning in
  Chapter 1 to production operations in Chapter 7.
</p>

<p>
  The course has five content sections. Each lesson ends with an ungraded knowledge check. The final section holds a
  graded chapter quiz of 11 questions. A score of 70 percent passes.
</p>

<Callout type="tip">
  <p>
    Open the text description under each figure to read the diagram as prose. The descriptions carry the same information
    as the graphics.
  </p>
</Callout>
