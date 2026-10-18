<script module>
  export const pageConfig = { title: 'Procurement Mechanisms' };
</script>

<h1>Procurement Mechanisms</h1>

<p>Cloud GPUs are bought through three mechanisms.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Mechanism</th><th scope="col">Terms</th><th scope="col">Cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Reserved</td><td>Blocks of hundreds or thousands of GPUs held for months or years</td><td>Discounted</td></tr>
    <tr><td>On-demand</td><td>Individual instances available as needed, up to a quota</td><td>Relatively high per hour</td></tr>
    <tr><td>Spot</td><td>On-demand instances that the provider can pre-empt after an agreed notice period, often minutes</td><td>Discounted</td></tr>
  </tbody>
</table>

<h2>Blending sources</h2>

<p>
  Large-scale inference generally blends all three. Low-cost reserved instances cover the baseline load that is always
  present. A mix of on-demand and spot instances handles traffic peaks. These GPUs are spread across several clusters
  worldwide so that capacity sits near end users.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>
    A service needs 200 GPUs at all hours and up to 320 GPUs at its daily peak. A blended plan reserves 200 GPUs for the
    constant baseline. It covers the extra 120 GPUs at peak with on-demand and spot capacity, which the team releases
    when the peak passes.
  </p>
</div>
