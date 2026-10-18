<script module>
  export const pageConfig = { title: 'Compliance Constraints' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Compliance Constraints</h1>

<p>
  In both consumer and business applications, compliance can limit infrastructure choices.
  The limits are strictest in regulated industries, such as health care and finance.
</p>

<div class="ie-table-wrap" role="region" aria-label="Compliance considerations for inference infrastructure" use:scrollable>
  <table class="ie-table">
    <caption>Compliance considerations for inference infrastructure</caption>
    <thead>
      <tr>
        <th scope="col">Consideration</th>
        <th scope="col">Question to answer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Data sovereignty</th>
        <td>Are the GPUs in a geographic region where the product is allowed to send user data?</td>
      </tr>
      <tr>
        <th scope="row">User privacy</th>
        <td>Are the model's inputs and outputs kept private and secure?</td>
      </tr>
      <tr>
        <th scope="row">Regulatory compliance</th>
        <td>Do the team and its underlying providers comply with every relevant regulation?</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  <dfn><strong>Data sovereignty</strong></dfn> refers to the legal constraints on where model inputs and outputs are processed and stored geographically.
  A sovereignty rule can remove entire <Term id="gpu">GPU</Term> regions or providers from consideration before any performance work starts.
</p>

<Signal kind="worked" title="Applying a sovereignty rule to four options">
  <p>A bank's regulator requires that customer conversations be processed and stored only inside the European Union. The team lists its options and tests each one against the rule.</p>
  <div class="ie-table-wrap" role="region" aria-label="Infrastructure options tested against an EU-only processing rule" use:scrollable>
    <table class="ie-table">
      <caption>Infrastructure options tested against an EU-only processing rule</caption>
      <thead>
        <tr>
          <th scope="col">Option</th>
          <th scope="col">Where the GPUs run</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Shared API, default endpoint</th>
          <td>United States only</td>
          <td>Ruled out. The data would leave the EU.</td>
        </tr>
        <tr>
          <th scope="row">Shared API, EU regional endpoint</th>
          <td>Frankfurt, with processing in the region written into the contract</td>
          <td>Kept, after legal review of the contract.</td>
        </tr>
        <tr>
          <th scope="row"><Term id="dedicated-deployment">Dedicated deployment</Term> in a cloud region</th>
          <td>Paris</td>
          <td>Kept.</td>
        </tr>
        <tr>
          <th scope="row">Dedicated deployment on-premises</th>
          <td>The bank's data center in Milan</td>
          <td>Kept.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>The rule removes one option before any latency or cost comparison. Performance work then chooses among the three that remain.</p>
</Signal>

<Signal kind="mistake" title="Treating encryption as a sovereignty fix">
  <p>
    Encrypting traffic protects user privacy while data travels.
    It does not change where the GPUs process the data.
    A rule about location is satisfied only by running the model in a permitted location.
    Chapter 7 covers how production platforms place workloads in compliant regions.
  </p>
</Signal>

<Callout type="important">
  <p>Inference engineers work closely with security and legal experts to confirm that the infrastructure they operate is compliant.</p>
</Callout>
