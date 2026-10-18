<script module>
  export const pageConfig = { title: 'Version Pinning' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Version Pinning</h1>

<p>
  <strong>Version pinning</strong> means specifying the exact version of every dependency that goes into an image.
  A pinned dependency tree keeps runtime behavior consistent across environments. It also lets you rebuild the image
  repeatedly and get the same result each time.
</p>
<p>Figure 7.2 in the book compares three ways to declare the same requirement. The version number is the book's example.</p>
<pre class="ie-code"><code>requirements:
  transformers            # No
  transformers&gt;=4.40.0    # No
  transformers==4.56.2    # Yes</code></pre>
<p>
  The first line accepts any version. The second accepts any version at or above 4.40.0, so a future release can
  change behavior without warning. Only the third line fixes one exact version.
</p>

<h2>Pinning the Whole Dependency Tree</h2>
<p>
  Package tools such as uv, poetry, and pip flag version incompatibilities and raise an error while the image builds.
  An exact pin in a requirements file fixes only the packages listed there. Each of those packages depends on other
  packages, called <strong>transitive dependencies</strong>, and an unpinned transitive dependency still resolves to
  its newest release on every rebuild. A reproducible build pins three things.
</p>
<div class="ie-table-wrap" role="region" aria-label="Pinning the Whole Dependency Tree table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">What to pin</th><th scope="col">How</th><th scope="col">What it prevents</th></tr>
  </thead>
  <tbody>
    <tr><td>Direct dependencies</td><td>Exact versions in the requirements file</td><td>A new release of a listed package entering the build</td></tr>
    <tr><td>Transitive dependencies</td><td>A committed lock file, such as <code>uv.lock</code>, <code>poetry.lock</code>, or the output of <code>pip freeze</code></td><td>A new release of a dependency's dependency entering the build</td></tr>
    <tr><td>Base image</td><td>A reference by image digest, such as <code>image@sha256:…</code>, instead of a tag</td><td>A re-pushed tag silently swapping the foundation under every later layer</td></tr>
  </tbody>
</table>
</div>
<p>
  An <strong>image digest</strong> is a content hash that identifies one exact image. A tag such as <code>latest</code>
  or <code>v0.9</code> is a movable label, and its owner can point it at a different image at any time. With direct
  pins, a lock file, and a digest in place, a rebuild resolves the same package versions on the same base, so a new
  upstream release does not change the image.
</p>

<Signal kind="mistake" title="Treating one pinned line as a guarantee">
  <p>
    Pinning <code>transformers==4.56.2</code> does not freeze the packages that transformers itself installs, and it
    does not freeze the base image. Pinning also stops at the container boundary: the host GPU driver and the GPU
    type sit outside the image. Reproducibility comes from the full set of pins, plus a host that meets the image's
    driver requirement.
  </p>
</Signal>

<h2>Day Zero Support for New Models</h2>
<p>
  Breaking changes are most common around newly released models. When a new model such as a DeepSeek release is
  announced, the whole inference ecosystem races to offer day zero support. Inference engineers building images for a
  brand-new model often depend on overnight builds or other developer pre-releases instead of stable releases.
</p>
<Callout type="warning">
  <p>
    Pre-release dependencies are more prone to bugs. Plan to rebuild the image on stable releases in the days and
    weeks after the model launch, and update the pins and the lock file when you do.
  </p>
</Callout>
