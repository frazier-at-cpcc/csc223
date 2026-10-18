<script module>
  export const pageConfig = { title: 'Level 3: A Unified Pool of Compute' };
</script>

<h1>Level 3: A Unified Pool of Compute</h1>

<p>
  The final level of scale is a global system. That system treats all available resources as a single unified pool of
  compute.
</p>

<h2>Removing the silos</h2>

<p>
  A unified pool places each workload wherever capacity exists. A model that would starve in one cluster runs on idle GPUs
  in another region or cloud.
</p>

<table>
  <caption>How infrastructure problems change with scale</caption>
  <thead>
    <tr>
      <th scope="col">Level</th>
      <th scope="col">Defining problem</th>
      <th scope="col">Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1. Autoscaling</th>
      <td>Knowing when to add and remove replicas, and doing it quickly</td>
      <td>Scale replicas with traffic</td>
    </tr>
    <tr>
      <th scope="row">2. Capacity</th>
      <td>Finding enough GPUs, generally past a few hundred</td>
      <td>Spread workloads across regions and clouds</td>
    </tr>
    <tr>
      <th scope="row">3. Unified pool</th>
      <td>Silos that starve some clusters while others sit idle</td>
      <td>Treat all resources as one pool of compute</td>
    </tr>
  </tbody>
</table>
