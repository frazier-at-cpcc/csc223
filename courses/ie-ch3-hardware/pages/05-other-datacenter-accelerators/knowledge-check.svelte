<script module>
  export const pageConfig = { title: 'Knowledge Check: Other Datacenter Accelerators' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Other Datacenter Accelerators</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<Matching
  id="kc_edges"
  question="Match each vendor to the competitive edge it pursues."
  pairs={[
    { left: 'Cerebras', right: 'Memory bandwidth from on-chip SRAM' },
    { left: 'Furiosa', right: 'Power efficiency' },
    { left: 'Google', right: 'Platform integration with its cloud and models' },
  ]}
  correctFeedback="Correct. Cerebras and Groq pursue memory bandwidth, Furiosa and Qualcomm pursue power efficiency, and Amazon and Google pursue platform integration."
  incorrectFeedback="Review the three edges. Cerebras targets decode with very fast on-chip memory, Furiosa designs for low power, and Google ties its TPUs to Google Cloud and its own models."
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_challenge"
  question="A new accelerator startup has a fast chip, but few customers can run their models on it. Which shared challenge best explains this?"
  options={['Distribution', 'Manufacturing', 'Software']}
  correct={2}
  optionFeedback={[
    'Incorrect. Distribution concerns getting manufactured chips installed and online. The scenario describes chips that exist but cannot run customer models.',
    'Incorrect. Manufacturing concerns building the chip. The scenario states that the chip already exists and is fast.',
    'Correct. Most inference software targets CUDA, so a vendor must rebuild the inference stack before customer models run on new hardware.',
  ]}
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_power_edge"
  question="An operator runs a steady, high-volume classification service in a datacenter with a strict power budget per rack. Throughput is adequate on current hardware, but electricity dominates the operating bill. Which edge should guide the evaluation of an alternative accelerator?"
  options={['Memory bandwidth', 'Platform integration', 'Power efficiency']}
  correct={2}
  optionFeedback={[
    'Incorrect. Memory bandwidth raises decode speed, but the scenario says throughput is already adequate.',
    'Incorrect. Platform integration helps teams that commit to one cloud. The constraint here is power in the operator\'s own datacenter.',
    'Correct. When power is the binding cost and limit, an accelerator that does the same work on less power addresses the constraint directly.',
  ]}
/>
