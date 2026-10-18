<script module>
  export const pageConfig = { title: 'Runtime, Infrastructure, and Tooling' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Runtime, Infrastructure, and Tooling</h1>

<p>Doing inference well requires three layers.</p>

<dl>
  <dt><dfn><strong>Runtime</strong></dfn></dt>
  <dd>Optimizing the performance of a single model on a single GPU-backed instance.</dd>
  <dt><dfn><strong>Infrastructure</strong></dfn></dt>
  <dd>Scaling across clusters, regions, and clouds without creating silos while maintaining excellent uptime.</dd>
  <dt><dfn><strong>Tooling</strong></dfn></dt>
  <dd>Giving engineers who work on inference the right level of abstraction to balance control with productivity.</dd>
</dl>

<h2>Instances and Replicas</h2>

<p>The layer definitions rest on two more terms.</p>

<dl>
  <dt><dfn><strong>Instance</strong></dfn></dt>
  <dd>
    A provisioned machine, usually virtual, that bundles one or more <Term id="gpu">GPUs</Term> with CPU, RAM, storage, and
    networking. Cloud providers rent GPUs as instances.
  </dd>
  <dt><dfn><strong>Replica</strong></dfn></dt>
  <dd>One running copy of a model deployment. A service adds replicas to handle more traffic.</dd>
</dl>

<p>
  In this chapter, one replica runs on the GPUs of one instance. A replica may use one GPU or several GPUs inside that
  instance. Chapter 5 covers the larger models whose replicas span several instances.
</p>

<h2>The Boundaries Between the Layers</h2>

<p>Each layer answers a different question.</p>

<ul>
  <li>The runtime layer asks how fast one replica can run on the GPUs of its instance.</li>
  <li>
    The infrastructure layer asks how to serve more traffic than one replica can handle, in more places, without downtime.
  </li>
  <li>The tooling layer asks how engineers control the first two layers without losing productivity.</li>
</ul>

<p>
  The instance is the boundary between the first two layers. Work that changes how a replica uses the GPUs inside its
  instance belongs to the runtime layer. Work that adds, places, or connects replicas across instances belongs to the
  infrastructure layer. Work that shapes how engineers reach either layer belongs to the tooling layer.
</p>

<p>
  No single layer is sufficient. The three layers must work together to handle mission-critical inference at scale. The
  rest of this course takes them one at a time.
</p>
