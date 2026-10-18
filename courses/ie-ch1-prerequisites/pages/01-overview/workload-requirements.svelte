<script module>
  export const pageConfig = { title: 'Five Requirements to Define' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Five Requirements to Define</h1>

<p>Before optimizing, an inference engineer defines five product requirements.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Product requirements that constrain an inference system</caption>
    <thead>
      <tr>
        <th scope="col">Requirement</th>
        <th scope="col">Question it answers</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Model requirements</th>
        <td>Which model or models must the system run?</td>
      </tr>
      <tr>
        <th scope="row">Application interface</th>
        <td>How do inputs reach the model, and in what format must the output return?</td>
      </tr>
      <tr>
        <th scope="row">Latency budget</th>
        <td>How fast must the product respond to a user action, measured end to end?</td>
      </tr>
      <tr>
        <th scope="row">Unit economics</th>
        <td>How much can the business spend per request, per user, or per month?</td>
      </tr>
      <tr>
        <th scope="row">Usage patterns</th>
        <td>How many users are active at once, and does activity follow a pattern, such as a peak during business hours?</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>When the answers are not yet clear</h2>

<p>
  Early in a product's life, the team often cannot answer these questions.
  At that stage, off-the-shelf model APIs are usually the better choice than a dedicated inference investment.
</p>
<p>
  As the product grows, the requirements become clear.
  Clear requirements make inference engineering worth the effort.
</p>

<Callout type="tip">
  <p>Write the five requirements down before any optimization work begins. Every later tradeoff in this book is judged against them.</p>
</Callout>
