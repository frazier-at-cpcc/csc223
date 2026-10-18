<script module>
  export const pageConfig = { title: 'The Framework Landscape' };
</script>

<h1>The Framework Landscape</h1>

<p>
  <strong>Deep learning frameworks</strong> are the bridge between writing CUDA
  directly and using an off-the-shelf inference engine such as vLLM. Teams use
  these frameworks for both training and inference.
</p>

<h2>PyTorch leads this level of the stack</h2>

<p>
  Over the past few years, PyTorch has become the clear leader among deep
  learning frameworks. Two other frameworks appear in older code and research
  work.
</p>

<table class="data">
  <caption>Deep learning frameworks at a glance</caption>
  <thead>
    <tr>
      <th scope="col">Framework</th>
      <th scope="col">Origin</th>
      <th scope="col">Current position</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">PyTorch</th>
      <td>Created at Meta; now part of the Linux Foundation</td>
      <td>The industry standard for training and inference of generative AI models</td>
    </tr>
    <tr>
      <th scope="row">TensorFlow</th>
      <td>End-to-end machine learning platform officially supported by Google</td>
      <td>Prominent in the 2010s; has since fallen out of favor</td>
    </tr>
    <tr>
      <th scope="row">JAX</th>
      <td>Research project unofficially associated with Google</td>
      <td>Offers a simpler interface with fewer legacy features; its documentation warns users to expect sharp edges</td>
    </tr>
  </tbody>
</table>

<p>
  The rest of this section focuses on PyTorch and the technologies built around
  it and above it.
</p>
