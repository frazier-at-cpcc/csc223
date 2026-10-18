<script module>
  export const pageConfig = { title: 'The Scope of the Runtime Layer' };
</script>

<h1>The Scope of the Runtime Layer</h1>

<p>
  The runtime layer makes an individual model run as performantly and efficiently as possible on its hardware. That
  hardware is one GPU or several GPUs inside a single instance.
</p>

<h2>One model, one instance</h2>

<p>
  The boundary of the runtime layer is the instance. Work that improves how a model uses the GPUs in front of it belongs
  here. Work that spreads traffic across many instances belongs to the infrastructure layer.
</p>

<p>Typical runtime goals include the following:</p>

<ul>
  <li>Return the first token to the user sooner.</li>
  <li>Generate more tokens per second for each user.</li>
  <li>Serve more total requests from the same GPUs.</li>
  <li>Fit a model into less GPU memory.</li>
</ul>
