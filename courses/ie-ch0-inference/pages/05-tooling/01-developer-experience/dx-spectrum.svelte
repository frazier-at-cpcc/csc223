<script module>
  export const pageConfig = { title: 'The Developer Experience Spectrum' };
</script>

<h1>The Developer Experience Spectrum</h1>

<p>Developer experience is subjective. For inference, the options form a spectrum between two extremes.</p>

<table>
  <caption>Developer experience options for inference, from most abstraction to most control</caption>
  <thead>
    <tr>
      <th scope="col">Position</th>
      <th scope="col">What the engineer gets</th>
      <th scope="col">Trade-off</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Black box</th>
      <td>Hand the platform model weights and receive an API.</td>
      <td>High productivity, little control over runtime or scaling behavior.</td>
    </tr>
    <tr>
      <th scope="row">Middle ground</th>
      <td>Managed workflows that still expose the controls that matter.</td>
      <td>Enough control for mission-critical inference and enough abstraction to work productively.</td>
    </tr>
    <tr>
      <th scope="row">Basic constructs</th>
      <td>Raw compute, network, disk, and similar primitives.</td>
      <td>Full control, with every layer above the primitives left for the engineer to build.</td>
    </tr>
  </tbody>
</table>

<h2>The right position</h2>

<p>
  The right developer experience sits in the middle. Inference engineers need enough control to run mission-critical
  inference with confidence. They also need enough abstraction to work productively.
</p>

<p>
  A black box fails the first test. An engineer cannot tune what the platform hides. Basic constructs fail the second
  test. An engineer who rebuilds autoscaling and routing for every model spends little time on the model itself.
</p>
