<script module>
  export const pageConfig = { title: 'Runtime, Infrastructure, and Tooling' };
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

<h2>How the layers divide the work</h2>

<p>Each layer answers a different question.</p>

<ul>
  <li>The runtime layer asks how fast one model instance can run.</li>
  <li>The infrastructure layer asks how to serve more traffic than one instance can handle, in more places, without downtime.</li>
  <li>The tooling layer asks how engineers control the first two layers without losing productivity.</li>
</ul>

<p>
  No single layer is sufficient. The three layers must work together to handle mission-critical inference at scale. The
  rest of this course takes them one at a time.
</p>
