<script module>
  export const pageConfig = { title: 'MIG Profiles and Slices' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import MigSlices from '../../../components/MigSlices.svelte';
</script>

<h1>MIG Profiles and Slices</h1>

<p>An H100 divides into two kinds of slices that combine to form MIG instances.</p>
<ul>
  <li>Eight <strong>memory slices</strong> of 10 GB each, for 80 GB in total.</li>
  <li>Seven <strong>compute slices</strong>, each built from an equal group of <Term id="streaming-multiprocessor">Streaming Multiprocessors</Term>.</li>
</ul>
<p>
  Software engineering usually works in powers of two, so seven compute slices look odd. GPUs rarely have a
  clean power-of-two SM count. An <Term id="sxm">SXM</Term> H100 has 132 SMs. MIG creates seven evenly sized compute slices and leaves
  the leftover SMs idle.
</p>

<MigSlices />

<h2>Fixed profiles</h2>
<p>
  You cannot combine slices freely. NVIDIA defines a fixed set of <strong>MIG profiles</strong>, and each profile
  pairs a number of compute slices with a fixed amount of memory. The profile name states both: in
  <code>3g.40gb</code>, <code>3g</code> means three of the seven compute slices and <code>40gb</code> means
  40 GB of memory.
</p>
<div class="ie-table-wrap" role="region" aria-label="MIG profiles on an 80 GB H100, from NVIDIA's MIG user guide" use:scrollable>
  <table class="ie-table">
    <caption>MIG profiles on an 80 GB H100, from NVIDIA's MIG user guide</caption>
    <thead>
      <tr><th scope="col">Profile</th><th scope="col">Compute slices</th><th scope="col">Memory</th><th scope="col">Memory slices</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">1g.10gb</th><td>1</td><td>10 GB</td><td>1</td></tr>
      <tr><th scope="row">1g.20gb</th><td>1</td><td>20 GB</td><td>2</td></tr>
      <tr><th scope="row">2g.20gb</th><td>2</td><td>20 GB</td><td>2</td></tr>
      <tr><th scope="row">3g.40gb</th><td>3</td><td>40 GB</td><td>4</td></tr>
      <tr><th scope="row">4g.40gb</th><td>4</td><td>40 GB</td><td>4</td></tr>
      <tr><th scope="row">7g.80gb</th><td>7</td><td>80 GB</td><td>8</td></tr>
    </tbody>
  </table>
</div>

<h2>Calculating a profile's resources</h2>
<ol class="ie-steps">
  <li>Compute share: compute slices ÷ 7.</li>
  <li>Memory: read it from the profile name. Do not multiply the compute slices by 10 GB.</li>
  <li>
    Instances per GPU, for one profile type: take the smaller of two limits. The compute limit is 7 ÷ compute
    slices, rounded down. The memory limit is 8 ÷ memory slices, rounded down.
  </li>
</ol>

<Signal kind="worked" title="The 3g.40gb profile">
  <ol class="ie-steps">
    <li>Compute share: 3 ÷ 7 ≈ 0.43, or about 43 percent of the GPU's compute.</li>
    <li>Memory: 40 GB, which is four memory slices and half of the <Term id="vram">VRAM</Term>.</li>
    <li>Compute limit: 7 ÷ 3 = 2.33, rounded down to 2. Memory limit: 8 ÷ 4 = 2.</li>
    <li>Instances per GPU: the smaller limit is 2, so one H100 holds two 3g.40gb instances.</li>
  </ol>
</Signal>

<Signal kind="mistake" title="Multiplying slices by 10 GB">
  <p>
    A three-slice instance does not get 30 GB. Each profile pairs its compute slices with a fixed memory
    allocation, and the 3g profile receives four memory slices, or 40 GB. Read the memory from the profile name.
  </p>
</Signal>

<h2>Faded example: the 2g.20gb profile</h2>
<p>
  The 2g.20gb profile uses two compute slices and two memory slices. The limits are done: the compute limit is
  7 ÷ 2 = 3.5, rounded down to 3, and the memory limit is 8 ÷ 2 = 4.
</p>
<NumericQuestion
  id="mig_faded"
  question="Final step: how many 2g.20gb instances fit on one H100?"
  answer={3}
  unit="instances"
  correctFeedback="Correct. The smaller limit wins. Compute allows 3 and memory allows 4, so three instances fit, and one memory slice and one compute slice stay unused."
  incorrectFeedback="Take the smaller of the two limits. Compute allows 3 and memory allows 4, so compute runs out first and three instances fit."
/>

<h2>Practice: MIG profiles</h2>

<p class="ie-obj">Objective 8: Calculate the resources of a MIG profile</p>
<NumericQuestion
  id="mig_practice_1"
  question="What percentage of an H100's compute does one 4g.40gb instance receive? Round to the nearest whole percent."
  answer={57}
  tolerance={1}
  unit="percent"
  correctFeedback="Correct. Four of seven compute slices: 4 ÷ 7 ≈ 0.571, or about 57 percent."
  incorrectFeedback="The compute share is compute slices ÷ 7. For 4g.40gb that is 4 ÷ 7 ≈ 0.571, or about 57 percent."
/>

<p class="ie-obj">Objective 8: Calculate the resources of a MIG profile</p>
<NumericQuestion
  id="mig_practice_2"
  question="How many 1g.10gb instances fit on one H100?"
  answer={7}
  unit="instances"
  correctFeedback="Correct. The compute limit is 7 ÷ 1 = 7 and the memory limit is 8 ÷ 1 = 8. The smaller limit is 7, so one memory slice stays unused."
  incorrectFeedback="Compute allows 7 ÷ 1 = 7 instances and memory allows 8 ÷ 1 = 8. The smaller limit, 7, wins."
/>

<Callout type="tip">
  <p>
    Orpheus TTS is a 3-billion-parameter <Term id="tts">text-to-speech</Term> model. Running it as two MIG
    instances on one GPU is sometimes a more efficient use of resources than giving it the whole GPU as a single
    instance. Chapter 6's Speech Synthesis Inference lesson returns to this example.
  </p>
</Callout>
