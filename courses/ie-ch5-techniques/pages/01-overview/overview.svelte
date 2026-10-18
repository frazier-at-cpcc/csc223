<script module>
  export const pageConfig = { title: 'Chapter Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Chapter 5 Overview: Techniques</h1>

<p>
  Chapter 5 of <cite>Inference Engineering</cite> presents five categories of applied research that accelerate
  inference: quantization, speculative decoding, caching, model parallelism, and disaggregation. Each technique
  comes with circumstances in which it pays off and with bottlenecks or tradeoffs that it introduces. This course
  follows the same pattern for every technique.
</p>

<h2>How this chapter fits the book</h2>
<p>
  The earlier chapters establish the foundations. They cover the prefill and decode phases of inference, the
  models being served, the GPUs and interconnects that run them, and the inference engines that schedule the work.
  Chapter 5 builds on all four. It explains how to make a running deployment faster, cheaper, or both. Chapter 6
  then extends these ideas to other modalities, and Chapter 7 addresses running inference in production.
</p>

<h2>Learning objectives</h2>
<p>After completing this chapter, you will be able to:</p>
<ol>
  <li>Explain how system constraints and traffic volume determine which inference optimizations are worth applying.</li>
  <li>
    Compare number formats by precision, type, dynamic range, and granularity to select a quantization format for a
    production workload.
  </li>
  <li>
    Rank model components by quantization sensitivity and select checks that confirm a quantized model has no
    perceptible quality loss.
  </li>
  <li>
    Explain how speculative decoding drafts, validates, and accepts tokens, and calculate the tokens produced in one
    forward pass.
  </li>
  <li>Select a speculative decoding algorithm for a described workload.</li>
  <li>Predict prefix cache hits for a pair of prompts and restructure context to increase KV cache re-use.</li>
  <li>
    Describe how KV cache allocation, storage tiers, cache-aware routing, and long-context optimizations extend the
    value of the KV cache.
  </li>
  <li>
    Estimate the minimum GPU count for a model and choose among tensor, expert, and pipeline parallelism for
    single-node and multi-node deployments.
  </li>
  <li>Determine when disaggregated serving is appropriate and identify the bottlenecks it introduces.</li>
</ol>

<Callout type="info">
  <p>
    Each lesson closes with an ungraded knowledge check. The final section holds a graded chapter quiz of twelve
    items. You have three attempts at the quiz, and your best attempt counts. A score of 70 percent or higher passes the chapter.
  </p>
</Callout>
