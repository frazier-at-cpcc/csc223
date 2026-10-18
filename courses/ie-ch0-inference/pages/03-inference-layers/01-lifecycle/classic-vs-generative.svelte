<script module>
  export const pageConfig = { title: 'Classic ML and Generative AI Inference' };
</script>

<script>
  import ScrollTable from '../../../components/ScrollTable.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Classic ML and Generative AI Inference</h1>

<h2>Classic ML Inference</h2>

<p>
  Inference for classic <Term id="machine-learning">machine learning</Term> models is relatively straightforward. In its
  early days, Baseten served models built with XGBoost, a library for decision-tree models that predict a label or a score.
  Those models ran on lightweight <Term id="cpu">CPUs</Term> with a simple software stack. A request carried a fixed set of
  input values, and the model returned one prediction in one computation.
</p>

<h2>Generative AI Inference</h2>

<p>
  Inference for generative AI models is complex. Model weights plus a set of <Term id="gpu">GPUs</Term> do not add up to a
  production service. That combination is neither fast enough nor reliable enough for large-scale use.
</p>

<ScrollTable label="Classic ML inference compared with generative AI inference">
<table>
  <caption>Classic ML inference compared with generative AI inference</caption>
  <thead>
    <tr>
      <th scope="col">Aspect</th>
      <th scope="col">Classic ML</th>
      <th scope="col">Generative AI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Example model</th>
      <td>An XGBoost fraud score</td>
      <td>A large language model, image model, or speech model</td>
    </tr>
    <tr>
      <th scope="row">Model size</th>
      <td>Often a few megabytes</td>
      <td>Often tens to hundreds of gigabytes of weights</td>
    </tr>
    <tr>
      <th scope="row">Work per request</th>
      <td>One computation</td>
      <td>One forward pass for every output token</td>
    </tr>
    <tr>
      <th scope="row">Request size</th>
      <td>A fixed set of input values</td>
      <td>Prompts from a few tokens to over 100,000 tokens</td>
    </tr>
    <tr>
      <th scope="row">Hardware</th>
      <td>Lightweight CPUs</td>
      <td>Expensive, scarce GPUs</td>
    </tr>
    <tr>
      <th scope="row">Software</th>
      <td>A simple stack</td>
      <td>Coordinated runtime, infrastructure, and tooling layers</td>
    </tr>
  </tbody>
</table>
</ScrollTable>

<p>The next page explains why each difference in the table makes serving harder.</p>
