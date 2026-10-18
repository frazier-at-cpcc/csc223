<script module>
  export const pageConfig = { title: 'Capstone Step 2: Model Choice' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Capstone Step 2: Model Choice</h1>

<Signal kind="recall" chapter={2}>
  <p>
    <Term id="prefill">Prefill</Term> processes the whole input in parallel and is compute-bound, so it sets time to first token.
    <Term id="decode">Decode</Term> generates one token per <Term id="forward-pass">forward pass</Term> and reads every weight from memory on each pass, so it is
    memory-bound and sets tokens per second. A model with more parameters reads more bytes on every decode step.
  </p>
</Signal>

<p>
  Beacon's team fine-tuned two candidates from the Llama 3.1 family and ran both on a held-out set of 2,000 support
  tickets.
</p>
<div class="ie-table-wrap" role="region" aria-label="Capstone Step 2: Model Choice table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Candidate</th><th scope="col">Parameters</th><th scope="col">Tickets resolved</th></tr>
  </thead>
  <tbody>
    <tr><td>Fine-tuned Llama 3.1 8B</td><td>8.03 billion</td><td>71 percent</td></tr>
    <tr><td>Fine-tuned Llama 3.1 70B</td><td>70.6 billion</td><td>84 percent</td></tr>
  </tbody>
</table>
</div>

<p class="ie-objective">Decision 2a, drawing on Chapter 2</p>
<NumericQuestion
  id="cap_bytes"
  question="In FP16, each parameter takes 2 bytes. How many gigabytes of weights does the 70B candidate read from memory on every decode step?"
  answer={141.2}
  tolerance={0.5}
  unit="GB"
  correctFeedback="Correct. 70.6 billion parameters × 2 bytes = 141.2 GB, read once for every decode step. The 8B candidate reads 16.1 GB, about a ninth as much."
  incorrectFeedback="Every decode step reads all of the weights. Multiply parameters by bytes per parameter: 70.6 billion × 2 bytes = 141.2 billion bytes, or 141.2 GB."
/>

<p class="ie-objective">Decision 2b, drawing on Chapter 2</p>
<MultipleChoice
  id="cap_model"
  question="Beacon must resolve at least 80 percent of tickets and deliver at least 30 tokens per second to each user. Which model should the team carry forward?"
  options={[
    'The 8B model, because its smaller weights decode fastest',
    'The 70B model, planning enough memory bandwidth for its decode',
    'The 70B model, because larger models need less memory per token',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The 8B model would decode quickly, but it resolves only 71 percent of tickets and fails the quality requirement. Speed cannot rescue a model that gets the answer wrong.',
    'Correct. Only the 70B model meets the quality bar. It reads about nine times more bytes per decode step, so the hardware and techniques in the next steps must supply enough memory bandwidth to reach 30 tokens per second.',
    'Incorrect. A larger model reads more weight bytes on every decode step, not fewer. That extra traffic is what makes it harder to serve quickly.',
  ]}
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    Beacon will serve the fine-tuned Llama 3.1 70B model. Its 141.2 GB of FP16 weights make memory capacity and memory
    bandwidth the central hardware questions.
  </p>
</details>
