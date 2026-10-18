<script module>
  export const pageConfig = { title: 'Exploring the Roofline' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import RooflineExplorer from '$shared/sims/RooflineExplorer.svelte';
</script>

<h1>Exploring the Roofline</h1>

<p>
  The simulation below plots the two decode calculations from the earlier worked example on a
  <Term id="roofline-model">roofline</Term>. It uses the same model. A linear layer's FP16 intensity equals the
  batch size during decode, or the number of tokens processed together during prefill. Decode attention stays
  near 1 operation per byte. Both axes use a logarithmic scale.
</p>

<Signal kind="try" title="Move a workload across the ridge">
  <ol>
    <li>Select Single-user decode on H100. Record the arithmetic intensity, the attainable throughput, and the percent of peak compute.</li>
    <li>Raise the batch size until the verdict changes to compute bound. Record the crossover batch size the status reports, and compare it with the ridge point.</li>
    <li>Switch the workload to Decode attention and set the batch size to 512. Record the intensity, and explain why batching does not move this point.</li>
  </ol>
</Signal>

<RooflineExplorer headingLevel={2} />

<h2>Practice with the simulation</h2>

<p>Use the simulation above to answer each question. Your answers are not graded.</p>

<NumericQuestion
  id="rf_h200"
  question="Select the H200 SXM and the Decode (linear layers) workload at FP16. At what batch size does decode cross the ridge point?"
  answer={207}
  tolerance={1}
  unit="requests"
  correctFeedback="The H200 keeps the H100's 989 TFLOPS but raises bandwidth to 4.8 TB/s, so its ridge falls to about 206 operations per byte. Decode crosses it at a batch size of about 207."
  incorrectFeedback="The status line reports the crossover. The H200 ridge is 989 / 4.8 ≈ 206 operations per byte, and FP16 decode intensity equals the batch size, so the smallest batch at or above the ridge is 207."
/>

<NumericQuestion
  id="rf_a100"
  question="Select the A100 80GB SXM and the Decode (linear layers) workload. Set the batch size to 64. What attainable throughput, in TFLOPS, does the simulation report?"
  answer={130.5}
  tolerance={1}
  unit="TFLOPS"
  correctFeedback="At batch 64 the intensity is 64 operations per byte, below the A100 ridge of about 153. Attainable throughput is bandwidth × intensity = 2.039 × 64 ≈ 130 TFLOPS, about 42 percent of the 312 TFLOPS peak."
  incorrectFeedback="Below the ridge, attainable throughput equals bandwidth times intensity. The A100 has 2.039 TB/s, and batch 64 gives 64 operations per byte, so 2.039 × 64 ≈ 130 TFLOPS."
/>
