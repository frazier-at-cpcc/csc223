<script module>
  export const pageConfig = { title: 'Total Cost of Ownership' };
</script>

<h1>Total Cost of Ownership</h1>

<h2>Use a long time horizon</h2>

<p>
  Usage varies from hour to hour and day to day. Base cost estimates on a long time horizon, ideally at least a week,
  to smooth out those variations.
</p>

<h2>Count engineering time</h2>

<p>
  Dedicated deployments carry a second cost beyond GPUs. Engineers spend time building and maintaining the inference
  system. Increased reliability, security, and control justify that investment, but it still belongs in the estimate.
</p>

<p>
  <strong>Total cost of ownership (TCO)</strong> for inference adds engineering cost to GPU cost. TCO gives the complete
  picture for comparing a dedicated deployment with a per-token API.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>
    In the previous comparison, the dedicated deployment saved $650 in GPU spending over the same workload. If building
    and maintaining that deployment costs more than $650 in engineering time over the same period, the per-token API
    has the lower TCO. As volume grows, the GPU savings grow with it, and the balance can shift toward dedicated
    inference.
  </p>
</div>
