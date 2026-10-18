<script module>
  export const pageConfig = { title: 'The Developer Experience Spectrum' };
</script>

<script>
  import ScrollTable from '../../../components/ScrollTable.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>The Developer Experience Spectrum</h1>

<p>Developer experience is subjective. For inference, the options form a spectrum between two extremes.</p>

<ScrollTable label="Developer experience options for inference, from most abstraction to most control">
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
      <td>High productivity, with little control over runtime or scaling behavior.</td>
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
</ScrollTable>

<h2>The Book's Position for Inference Engineers</h2>

<p>
  The book argues that the right developer experience for inference engineers sits in the middle. Inference engineers need
  enough control to run mission-critical inference with confidence. They also need enough abstraction to work
  productively. A black box fails the first test, because an engineer cannot tune what the platform hides. Basic
  constructs fail the second test, because an engineer who rebuilds autoscaling and routing for every model spends little
  time on the model itself.
</p>

<h2>Criteria for Choosing a Position</h2>

<p>The book's argument applies to teams that run mission-critical inference. Any team can weigh four criteria to choose its position.</p>

<ul>
  <li>Control describes how much tuning of engines, quantization, and scaling the workload needs to meet its targets.</li>
  <li>Expertise describes whether the team has inference engineers who can use those controls.</li>
  <li>Operations describes whether the team can staff the clusters, upgrades, and on-call duty that lower-level positions require.</li>
  <li>Speed describes how quickly the team must ship and how often it releases new models.</li>
</ul>

<ScrollTable label="Three teams and the position each one&#39;s constraints support">
<table>
  <caption>Three teams and the position each one's constraints support</caption>
  <thead>
    <tr>
      <th scope="col">Team</th>
      <th scope="col">Deciding constraints</th>
      <th scope="col">Defensible position</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">A two-person product team adding a non-critical summary feature</th>
      <td>No inference engineers, a loose latency target, and a launch in two weeks</td>
      <td>Black box</td>
    </tr>
    <tr>
      <th scope="row">A bank's inference group serving a customer-facing assistant</th>
      <td>Strict latency and uptime targets, engineers who tune engines, and monthly model releases</td>
      <td>Middle ground</td>
    </tr>
    <tr>
      <th scope="row">An AI lab with a large platform team and its own data centers</th>
      <td>Custom schedulers and engines, and staff to build and run every layer</td>
      <td>Basic constructs</td>
    </tr>
  </tbody>
</table>
</ScrollTable>

<Signal kind="mistake" title="The middle ground is not always the answer">
  <p>
    The middle ground suits inference engineers who run mission-critical models. A team with no need for control and no
    staff to use it gains nothing from controls it never touches, so a black box serves it better. A team that builds its
    own platform needs the primitives. Recommend a position from the team's constraints, not from the spectrum's midpoint.
  </p>
</Signal>
