<script module>
  export const pageConfig = { title: 'Principles for Applying Techniques' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Principles for Applying Techniques</h1>

<p>
  Inference research moves into production quickly. A technique published in a paper can run in production
  systems within weeks or months. Much of the visible work in inference engineering consists of bridging the gap
  between a research result and a reliable production service. Three principles decide which techniques a
  deployment should adopt.
</p>

<h2>Constraints and specialization</h2>
<p>
  A core principle of inference engineering holds that each constraint you introduce into an inference system
  improves the performance you can achieve. <Term id="disaggregation">Disaggregation</Term> illustrates the
  principle. It constrains each engine to run only <Term id="prefill">prefill</Term> or only <Term id="decode">decode</Term>, and each
  specialized engine can then be tuned for its single job.
</p>

<h2>Traffic volume</h2>
<p>
  The more traffic a deployment carries, the more optimizations it can adopt while keeping
  <Term id="unit-economics">unit economics</Term> reasonable. Higher model parallelism across more GPUs,
  <Term id="cache-aware-routing">cache-aware routing</Term>, and dynamic disaggregation pay off only when many GPUs,
  often across multiple nodes, serve the same model. A deployment with one <Term id="replica">replica</Term> has no other
  replica to route to and too little traffic to keep separate prefill and decode engines busy.
</p>
<p>
  Real-world traffic also shifts over time. Volume gives you the data to adapt the system as usage changes. Tuning
  engine parameters, speculation algorithms, and model servers is therefore continuous work, carried out through
  iterative deployments or dynamic runtime adjustments.
</p>

<Callout type="tip">
  <p>
    Finding the right configuration takes patient experimentation. During one internal hackathon, an engineer
    tested 77 configurations of a code autocomplete model with a handwritten script. The winning configuration was
    not obvious, and it doubled <Term id="tokens-per-second">tokens per second (TPS)</Term> for the customer's model.
  </p>
</Callout>

<h2>Interactions between techniques</h2>
<p>
  Some techniques reinforce each other and some compete. Two techniques are <strong>symbiotic</strong> when one
  relieves a bottleneck in the other. <Term id="kv-cache-quantization">Quantizing the KV cache</Term> shrinks the
  cache that disaggregation must transfer and store, so those two techniques are symbiotic. Two techniques are
  <strong>competing</strong> when both draw on the same resource. Increasing the <Term id="batch-size">batch size</Term> consumes the spare
  compute that speculative decoding needs, so those two pull against each other. The goal is a balanced set of
  optimizations that delivers more than the sum of its parts. The synthesis page at the end of this chapter returns
  to these interactions with every technique in view.
</p>

<h2>Lossless and lossy techniques</h2>
<p>
  Quantization can reduce output quality, because it changes the numbers the model computes with. Speculative
  decoding with standard verification, prefix caching, model parallelism, and disaggregation are lossless. They
  change where and when the model computes, not what it computes. The Medusa page describes one looser verification
  rule that trades exactness for speed.
</p>
