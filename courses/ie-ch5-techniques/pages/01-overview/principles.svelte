<script module>
  export const pageConfig = { title: 'Principles for Applying Techniques' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Principles for Applying Techniques</h1>

<p>
  Inference research moves into production quickly. A technique published in a paper can run in production
  systems within weeks or months. Much of the visible work in inference engineering consists of bridging the gap
  between a research result and a reliable production service.
</p>

<h2>Constraints improve performance</h2>
<p>
  A core principle of inference engineering holds that each constraint you introduce into an inference system
  improves the performance you can achieve. Disaggregation illustrates the principle. It constrains each engine to
  run only prefill or only decode, and each specialized engine can then be tuned for its single job.
</p>

<h2>Traffic volume unlocks optimizations</h2>
<p>
  A second principle governs this chapter. The more traffic a deployment carries, the more optimizations it can
  adopt while keeping unit economics reasonable. Higher model parallelism across more GPUs, KV-aware routing, and
  dynamic disaggregation pay off only when many GPUs, often across multiple nodes, serve the same model.
</p>
<p>
  Real-world traffic does not respect constraints. Volume gives you the data to adapt the system as usage changes.
  Tuning engine parameters, speculation algorithms, and model servers is therefore continuous work, carried out
  through iterative deployments or dynamic runtime adjustments.
</p>

<Callout type="tip">
  <p>
    Finding the right configuration takes patient experimentation. During one internal hackathon, an engineer
    tested 77 configurations of a code autocomplete model with a handwritten script. The winning configuration was
    not obvious, and it doubled tokens per second (TPS) for the customer's model.
  </p>
</Callout>

<h2>Techniques interact</h2>
<p>
  Some techniques reinforce each other and some compete. Quantizing the KV cache relieves a bottleneck in
  disaggregation, so those two techniques are symbiotic. Increasing the batch size consumes compute that
  speculative decoding needs, so those two pull against each other. The goal is a balanced set of optimizations
  that delivers more than the sum of its parts.
</p>
<p>
  Quantization is the only technique in this chapter that can reduce output quality. Speculative decoding,
  caching, model parallelism, and disaggregation are lossless.
</p>
