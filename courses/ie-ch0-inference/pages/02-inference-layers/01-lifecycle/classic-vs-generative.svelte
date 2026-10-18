<script module>
  export const pageConfig = { title: 'Classic ML and Generative AI Inference' };
</script>

<h1>Classic ML and Generative AI Inference</h1>

<h2>Classic ML inference</h2>

<p>
  Inference for classic ML models is relatively straightforward. In its early days, Baseten served models built with tools
  like XGBoost. Those models ran on lightweight CPUs with a simple software stack.
</p>

<h2>Generative AI inference</h2>

<p>
  Inference for generative AI models is complex. Model weights plus a set of GPUs do not add up to a production service.
  That combination is neither fast enough nor reliable enough for large-scale use.
</p>

<p>
  Serving generative AI models well requires three layers that work together: runtime, infrastructure, and tooling. The
  next lesson defines each one.
</p>

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
      <td>XGBoost model</td>
      <td>Large language model, image or speech model</td>
    </tr>
    <tr>
      <th scope="row">Hardware</th>
      <td>Lightweight CPUs</td>
      <td>GPUs</td>
    </tr>
    <tr>
      <th scope="row">Software</th>
      <td>Simple stack</td>
      <td>Coordinated runtime, infrastructure, and tooling layers</td>
    </tr>
  </tbody>
</table>
