<script module>
  export const pageConfig = { title: 'The Complete Inference Stack' };
</script>

<script>
  import ScrollTable from '../../../components/ScrollTable.svelte';
  import Term from '$shared/Term.svelte';
  import InferenceStack from '../../../components/InferenceStack.svelte';
</script>

<h1>The Complete Inference Stack</h1>

<p>
  Figure 0.1 shows the <Term id="inference-stack">inference stack</Term>. It places the runtime layer above the infrastructure layer. The
  tooling layer does not appear in the figure. It sits on top of both and decides how engineers reach them.
</p>

<h2>Reading the Figure</h2>

<InferenceStack />

<ul>
  <li>
    The runtime layer pairs six model performance techniques with a software stack. Inference engines run on PyTorch,
    and PyTorch runs on CUDA.
  </li>
  <li>
    The infrastructure layer builds upward from hardware resources. GPUs, storage, and networking support multi-cloud
    capacity management, autoscaling, routing, and load balancing.
  </li>
</ul>

<h2>Where Each Block Is Covered</h2>

<ScrollTable label="Blocks of Figure 0.1 and where each is covered">
<table>
  <caption>Blocks of Figure 0.1, with the section of this course that introduces each one and the chapter that covers it in depth</caption>
  <thead>
    <tr>
      <th scope="col">Block</th>
      <th scope="col">Layer</th>
      <th scope="col">Where it is covered</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">The six model performance techniques</th>
      <td>Runtime</td>
      <td>Section 04, then Chapter 5 in depth and Chapter 7 for batching</td>
    </tr>
    <tr>
      <th scope="row">Inference engines, PyTorch, and CUDA</th>
      <td>Runtime</td>
      <td>Section 04, then Chapter 4 in depth</td>
    </tr>
    <tr>
      <th scope="row">Routing and load balancing</th>
      <td>Infrastructure</td>
      <td>Section 08, then Chapter 7 in depth</td>
    </tr>
    <tr>
      <th scope="row">Autoscaling and multi-cloud capacity management</th>
      <td>Infrastructure</td>
      <td>Section 05, then Chapter 7 in depth</td>
    </tr>
    <tr>
      <th scope="row">GPUs, storage, and networking</th>
      <td>Infrastructure</td>
      <td>Section 02, then Chapter 3 in depth and Chapter 7 for weight storage</td>
    </tr>
  </tbody>
</table>
</ScrollTable>
