<script module>
  export const pageConfig = { title: 'When to Switch to Dedicated' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>When to Switch to Dedicated</h1>

<p>As an AI product matures, three needs push it toward dedicated deployments.</p>

<div class="ie-table-wrap">
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
        <td>A chat product whose monthly token bill exceeds the cost of renting the GPUs to serve it.</td>
      </tr>
      <tr>
        <th scope="row">Specialization</th>
        <td>The product runs a custom or fine-tuned model, or it has specific latency or uptime requirements.</td>
        <td>A fine-tuned text-to-SQL model that no public endpoint offers.</td>
      </tr>
      <tr>
        <th scope="row">Orchestration</th>
        <td>The product chains multiple models in multi-step pipelines, and network hops and deployment complexity must shrink.</td>
        <td>A voice agent that runs speech recognition, an LLM, and speech synthesis for every turn.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>The cost of switching</h2>

<p>
  A dedicated deployment puts the team in charge of its own inference engineering.
  The team gains flexibility and control.
  The team also takes on more engineering surface area and a higher minimum monthly spend, because rented GPUs cost money even when traffic is low.
</p>

<Callout type="important">
  <p>Switch to a dedicated deployment only when a clear and immediate business need exists.</p>
</Callout>
