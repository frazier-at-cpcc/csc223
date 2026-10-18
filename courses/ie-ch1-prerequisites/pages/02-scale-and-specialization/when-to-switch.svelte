<script module>
  export const pageConfig = { title: 'When to Switch to Dedicated' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>When to Switch to Dedicated</h1>

<p>As an AI product matures, three needs push it toward dedicated deployments.</p>

<div class="ie-table-wrap" role="region" aria-label="Reasons to move from shared inference to dedicated deployments" use:scrollable>
  <table class="ie-table">
    <caption>Reasons to move from shared inference to dedicated deployments</caption>
    <thead>
      <tr>
        <th scope="col">Reason</th>
        <th scope="col">Signal</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Scale</th>
        <td>Traffic volume makes paying per GPU cheaper than paying per million tokens.</td>
        <td>A chat product whose monthly token bill exceeds the full cost of renting and running the GPUs that would serve it.</td>
      </tr>
      <tr>
        <th scope="row">Specialization</th>
        <td>The product runs a custom or fine-tuned model, or it has specific latency or uptime requirements.</td>
        <td>A fine-tuned text-to-SQL model that no public endpoint offers.</td>
      </tr>
      <tr>
        <th scope="row">Orchestration</th>
        <td>The product chains multiple models in multi-step pipelines, and network hops and deployment complexity must shrink.</td>
        <td>A voice <Term id="agent">agent</Term> that runs speech recognition, a language model, and speech synthesis for every turn.</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  <Term id="fine-tuning">Fine-tuning</Term> adapts a pre-trained model to one task by training it further on new data.
  Section 04 of this chapter covers it.
  A fine-tuned model is a custom model, so no public endpoint serves it.
</p>

<h2>The cost of switching</h2>

<p>
  A dedicated deployment puts the team in charge of its own inference engineering.
  The team gains flexibility and control.
  The team also takes on more engineering surface area and a higher minimum monthly spend, because rented GPUs cost money even when traffic is low.
</p>

<Signal kind="mistake" title="Moving to dedicated to lower the monthly minimum">
  <p>
    A dedicated deployment raises the floor of monthly spend.
    Rented GPUs bill every hour that they run, whether or not traffic arrives.
    Shared inference has no floor, because the team pays only for the tokens it sends.
    Scale lowers the cost of each token on dedicated GPUs only after traffic keeps those GPUs busy.
  </p>
</Signal>

<Callout type="important">
  <p>Switch to a dedicated deployment only when a clear and immediate business need exists. The next page shows how to test the scale reason with numbers.</p>
</Callout>
