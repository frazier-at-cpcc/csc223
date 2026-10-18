<script module>
  export const pageConfig = { title: 'Asynchronous Inference' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Asynchronous Inference</h1>

<p>
  Some systems are built for <Term id="throughput">throughput</Term>, not latency. Bulk document processing and computing an
  <Term id="embedding">embedding</Term> for every document in a corpus are not latency sensitive. These use cases benefit from
  asynchronous jobs.
</p>

<h2>Synchronous and Asynchronous Requests</h2>
<div class="ie-table-wrap" role="region" aria-label="Synchronous and Asynchronous Requests table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Property</th><th scope="col">Synchronous request</th><th scope="col">Asynchronous job</th></tr>
  </thead>
  <tbody>
    <tr><td>Client behavior</td><td>Waits on the open request for the result</td><td>Fires the request and moves on</td></tr>
    <tr><td>Server response</td><td>Returns the result on the same request</td><td>Acknowledges at once, then sends the result to a webhook named in the request</td></tr>
    <tr><td>Time limit</td><td>Usually a few minutes before the request fails</td><td>Usually measured in hours</td></tr>
  </tbody>
</table>
</div>
<p>
  An <strong>asynchronous request</strong> is a fire-and-forget approach to inference. The server acknowledges the job
  immediately. When the job finishes, the server delivers the result to the <strong>webhook</strong>, a URL that the
  client supplied in the original request.
</p>
<p>
  Asynchronous jobs combined with strong server-side queueing make high-throughput, latency-insensitive systems more
  robust and efficient. The queue absorbs a large submission, and the autoscaler works through it at a steady pace.
</p>
