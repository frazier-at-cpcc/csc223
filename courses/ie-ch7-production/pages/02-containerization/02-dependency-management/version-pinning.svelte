<script module>
  export const pageConfig = { title: 'Version Pinning' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Version Pinning</h1>

<p>
  <strong>Version pinning</strong> means specifying the exact version of every dependency that goes into an image.
  A pinned dependency tree keeps runtime behavior consistent across environments. It also lets you rebuild the image
  repeatedly and get the same result each time.
</p>

<p>Figure 7.2 in the book compares three ways to declare the same requirement.</p>

<pre class="ie-code"><code>requirements:
  transformers            # No
  transformers&gt;=4.40.0    # No
  transformers==4.56.2    # Yes</code></pre>

<p>
  The first line accepts any version. The second accepts any version at or above 4.40.0, so a future release can
  change behavior without warning. Only the third line fixes one exact version.
</p>

<h2>How pinning protects a build</h2>

<p>
  Package tools such as uv, poetry, and pip flag version incompatibilities and raise an error while the image builds.
  With every version pinned, an image that builds successfully once resolves to the same versions every time
  afterward. A later upstream release cannot break it.
</p>

<h2>Day zero support for new models</h2>

<p>
  Breaking changes are most common around newly released models. When a new model such as a DeepSeek release is
  announced, the whole inference ecosystem races to offer day zero support. Inference engineers building images for a
  brand-new model often depend on overnight builds or other developer pre-releases instead of stable releases.
</p>

<Callout type="warning">
  <p>
    Pre-release dependencies are more prone to bugs. Plan to rebuild the image on stable releases in the days and
    weeks after the model launch.
  </p>
</Callout>
