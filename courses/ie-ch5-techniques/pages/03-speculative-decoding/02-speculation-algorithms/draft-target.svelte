<script module>
  export const pageConfig = { title: 'Draft-Target Speculation' };
</script>

<h1>Draft-Target Speculation</h1>

<p>The original method of speculative decoding uses two models.</p>
<ul>
  <li>The <strong>draft model</strong> is an additional model that generates draft tokens.</li>
  <li>The <strong>target model</strong> is the original model. It verifies draft tokens and performs ordinary decode.</li>
</ul>

<h2>Choosing a draft model</h2>
<p>
  The most important configuration decision is which draft model to use. A good draft model has a high acceptance
  rate and needs minimal resources.
</p>
<ul>
  <li>Draft models usually come from the same model family as the target, because they share a tokenizer and similar behavior.</li>
  <li>As a rule of thumb, the draft model should be at least ten times smaller than the target by parameter count.</li>
  <li>Fine-tuning or distillation can raise the acceptance rate by teaching the draft model to behave more like the target.</li>
</ul>
<p>
  For example, a 70-billion-parameter target model calls for a draft model of 7 billion parameters or fewer from
  the same family.
</p>

<h2>Strengths and costs</h2>
<p>
  Draft-target speculation is quick to set up and requires no training or fine-tuning. Other algorithms generally
  perform better, because draft-target carries the most overhead of any method.
</p>
<ul>
  <li>The engine stores the draft model's weights, activations, and KV cache in memory.</li>
  <li>The engine spends compute on prefill for the draft model.</li>
  <li>
    The draft and target models must run in coordination so they do not compete for resources. Engines such as
    TensorRT-LLM handle this orchestration.
  </li>
</ul>
