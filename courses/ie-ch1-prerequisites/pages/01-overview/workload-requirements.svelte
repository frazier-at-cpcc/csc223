<script module>
  export const pageConfig = { title: 'Five Requirements to Define' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Five Requirements to Define</h1>

<p>Before optimizing, an inference engineer defines five product requirements.</p>

<div class="ie-table-wrap" role="region" aria-label="Product requirements that constrain an inference system" use:scrollable>
  <table class="ie-table">
    <caption>Product requirements that constrain an inference system</caption>
    <thead>
      <tr>
        <th scope="col">Requirement</th>
        <th scope="col">Question it answers</th>
        <th scope="col">Example answer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><dfn><strong>Model requirements</strong></dfn></th>
        <td>Which model or models must the system run?</td>
        <td>One open 8-billion-parameter chat model</td>
      </tr>
      <tr>
        <th scope="row"><dfn><strong>Application interface</strong></dfn></th>
        <td>How do inputs reach the model, and in what format must the output return?</td>
        <td>Text in from a web app, streamed text out</td>
      </tr>
      <tr>
        <th scope="row"><dfn><strong>Latency budget</strong></dfn></th>
        <td>How fast must the product respond to a user action, measured end to end?</td>
        <td>First words on screen within half a second</td>
      </tr>
      <tr>
        <th scope="row"><dfn><strong>Unit economics</strong></dfn></th>
        <td>How much can the business spend per request, per user, or per month?</td>
        <td>No more than $0.50 of inference per user each month</td>
      </tr>
      <tr>
        <th scope="row"><dfn><strong>Usage patterns</strong></dfn></th>
        <td>How many users are active at once, and does activity follow a pattern?</td>
        <td>About 300 users at once, peaking during business hours</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  A latency budget covers the whole wait, including the network and any queue, not only the time the model computes.
  Unit economics compares the cost of serving one unit of use with what that unit earns.
  The number of requests that a system handles at the same moment is its <Term id="concurrency">concurrency</Term>, and usage patterns describe how concurrency changes over the day.
</p>

<h2>When the answers are not yet clear</h2>

<p>
  Early in a product's life, the team often cannot answer these questions.
  The team is still searching for <dfn><strong>product-market fit</strong></dfn>, the point at which the product has shown that customers want it.
  At that stage, off-the-shelf model APIs are usually the better choice than a dedicated inference investment.
</p>

<p>
  As the product grows, the requirements become clear.
  Clear requirements make inference engineering worth the effort.
</p>

<Callout type="tip">
  <p>Write the five requirements down before any optimization work begins. The chapter synthesis turns them into a requirements sheet with measurable targets.</p>
</Callout>
