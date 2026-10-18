<script module>
  export const pageConfig = { title: 'Welcome to Chapter 0' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 0: Inference</h1>

<p>Content current as of October 2026.</p>

<h2>Why Inference Engineering Exists</h2>

<p>
  A product team builds a chatbot on an open model. In the demo, one engineer types a question, and the answer begins to
  stream within a second. On launch day, ten thousand users arrive at once. Answers take thirty seconds to start, some
  requests time out, and the GPU bill for one week exceeds the budget for the quarter.
</p>

<p>
  The model did not change between the demo and the launch. The load on the serving system changed.
  <Term id="inference-engineering">Inference engineering</Term> is the discipline that makes a model fast, reliable, and affordable under real
  traffic. This chapter explains why that work is hard and how the rest of the book divides it.
</p>

<h2>About the Book</h2>

<p>
  This course follows Chapter 0 of <cite>Inference Engineering</cite>. The book comes from engineers at Baseten, a
  company that runs inference for other businesses. Baseten therefore appears in a few places as an example of an
  inference provider.
</p>

<h2>The Inference Stack</h2>

<StackMap highlight={0} />

<p>
  Every chapter in this series opens with this map. Chapter 0 introduces the whole map, so no single row is highlighted.
  Later chapters highlight the row they cover.
</p>

<h2>Learning Objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Trace an LLM request through its prefill and decode forward passes.</li>
  <li>Calculate the weight memory of a model from its parameter count and precision.</li>
  <li>Explain why serving generative AI models is harder than serving classic machine learning models.</li>
  <li>Classify an inference task by the layer of the inference stack that owns it.</li>
  <li>Select the model performance technique that addresses a described runtime bottleneck.</li>
  <li>Analyze a speculative decoding step to determine how many tokens it produces.</li>
  <li>Select the infrastructure response to a described scale, reliability, or latency problem.</li>
  <li>Recommend a developer-experience option for a described engineering team.</li>
  <li>Identify the chapter of the book that addresses a given inference engineering topic.</li>
</ol>

<h2>How This Course Is Organized</h2>

<p>
  The course has eight content sections. Section 02, Core Concepts, defines the vocabulary that every later chapter uses.
  Sections 03 to 06 cover the three layers of an inference platform. Section 07 maps the rest of the book, and Section 08
  connects the chapter in one worked case.
</p>

<p>
  Each lesson ends with an ungraded knowledge check that gives feedback on every answer. The final section holds a graded
  quiz of 12 questions. A score of 70 percent passes. You have three attempts, and the best attempt counts. The quiz
  reports your score but does not reveal which answers were correct.
</p>

<Callout type="tip">
  <p>
    A term with a dashed underline opens its definition when you select it. Open the text description under each figure
    to read the diagram as prose.
  </p>
</Callout>
