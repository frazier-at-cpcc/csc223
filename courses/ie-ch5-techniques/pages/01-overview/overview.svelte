<script module>
  export const pageConfig = { title: 'Chapter Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 5 Overview: Techniques</h1>

<p>
  Chapter 5 of <cite>Inference Engineering</cite> presents five categories of applied research that accelerate
  inference: <Term id="quantization">quantization</Term>, <Term id="speculative-decoding">speculative decoding</Term>, caching,
  <Term id="model-parallelism">model parallelism</Term>, and <Term id="disaggregation">disaggregation</Term>. Each technique pays off in
  some circumstances and introduces bottlenecks or tradeoffs of its own. This course follows the same pattern for
  every technique: the bottleneck it relieves, how it works, what it costs, and when it stops paying off.
</p>
<p>Content current as of October 2026.</p>

<h2>How this chapter fits the book</h2>
<p>
  The earlier chapters establish the foundations. Chapter 1 sets the latency, <Term id="throughput">throughput</Term>, and cost targets. Chapter
  2 explains the <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term> phases and their bottlenecks. Chapter 3 covers the GPUs and interconnects, and
  Chapter 4 covers the inference engines that schedule the work. Chapter 5 sits in the runtime layer of the stack
  and builds on all four. It explains how to make a running deployment faster, cheaper, or both. Chapter 6 extends
  these ideas to other modalities, and Chapter 7 addresses running inference in production.
</p>

<StackMap highlight={5} />

<h2>Learning objectives</h2>
<p>After completing this chapter, you will be able to:</p>
<ol>
  <li>
    Explain how system constraints, traffic volume, and interactions between techniques determine which
    optimizations a deployment should apply.
  </li>
  <li>
    Select a quantization format for a production workload by comparing precision, type, dynamic range, and
    granularity.
  </li>
  <li>Evaluate a post-training quantization plan for its expected speedup and its risk to output quality.</li>
  <li>Calculate the expected number of tokens that one target-model <Term id="forward-pass">forward pass</Term> produces under speculative decoding.</li>
  <li>Select a speculative decoding algorithm for a described workload.</li>
  <li>
    Choose the <Term id="kv-cache">KV cache</Term> technique that solves a described caching problem: context reordering, memory allocation,
    offloading, <Term id="cache-aware-routing">cache-aware routing</Term>, or <Term id="chunked-prefill">chunked prefill</Term>.
  </li>
  <li>Estimate the minimum GPU count for a model from its weight memory and a planning factor.</li>
  <li>Choose a parallelism strategy for a single-node or multi-node deployment.</li>
  <li>Evaluate disaggregated serving for a described workload, including the remedies for the bottlenecks it introduces.</li>
</ol>

<Callout type="info">
  <p>
    The chapter opens with a short retrieval check on earlier chapters. Each lesson closes with an ungraded
    knowledge check, and several pages include simulations with tasks to complete. A synthesis page and a chapter
    glossary come before the graded quiz. The quiz has thirteen items. You have three attempts, and your best
    attempt counts. A score of 70 percent or higher passes the chapter.
  </p>
</Callout>
