<script module>
  export const pageConfig = { title: 'Knowledge Check: Scale to Zero and Component Scaling' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Scale to Zero and Component Scaling</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 5: judge fit for scale to zero and component scaling</p>
<MultipleChoice
  id="kc_sz_fit"
  question="Which workload is the best fit for scale to zero?"
  options={[
    'A support chatbot with light, unpredictable traffic around the clock',
    'A nightly job that summarizes the previous day of documents',
    'A voice assistant that must answer within 300 milliseconds',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Light, unscheduled, latency-sensitive traffic means random users pay the cold start. Such an application is better served by a pay-per-token API.',
    'Correct. Periodic batch work has no user waiting live, so a cold start on the first request costs nothing that matters.',
    'Incorrect. A 300-millisecond target cannot absorb a cold start of minutes on the first request after an idle period.',
  ]}
/>

<p class="ie-objective">Practices objective 5: judge fit for scale to zero and component scaling</p>
<MultipleChoice
  id="kc_sz_split"
  question="A voice agent runs voice activity detection, transcription, and an LLM as one combined service on full 8-GPU nodes. When call volume doubles, the team must add whole nodes even though only the transcription stage is saturated. Which design fixes the waste?"
  options={[
    'Move each stage to its own cluster near its users.',
    'Scale each stage on its own right-sized hardware.',
    'Set min replicas to 0 for the combined service.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Separate clusters add a network penalty to every message between stages. Keep the stages in one cluster and scale them separately.',
    'Correct. Independent component scaling lets the transcription stage add GPU slices on its own, without buying LLM capacity that is already sufficient.',
    'Incorrect. Scale to zero only changes what happens when traffic stops. Doubled call volume still forces whole nodes onto the combined service.',
  ]}
/>
