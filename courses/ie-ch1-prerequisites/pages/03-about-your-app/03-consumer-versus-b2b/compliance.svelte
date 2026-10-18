<script module>
  export const pageConfig = { title: 'Compliance Constraints' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Compliance Constraints</h1>

<p>
  In both consumer and business applications, compliance can limit infrastructure choices.
  The limits are strictest in regulated industries.
</p>

<div class="ie-table-wrap">
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
  <strong>Data sovereignty</strong> refers to the legal constraints on where model inputs and outputs are processed and stored geographically.
  A sovereignty rule can remove entire GPU regions or providers from consideration before any performance work starts.
</p>

<Callout type="important">
  <p>Inference engineers work closely with security and legal experts to confirm that the infrastructure they operate is compliant.</p>
</Callout>
