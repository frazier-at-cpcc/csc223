<script module>
  export const pageConfig = { title: 'GPU Providers' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>GPU Providers</h1>

<p>Many companies sell access to GPUs. They fall into three major types. The examples are the book's, and the market changes quickly.</p>
<div class="ie-table-wrap" role="region" aria-label="GPU Providers table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Provider type</th><th scope="col">Description</th><th scope="col">Examples</th></tr>
  </thead>
  <tbody>
    <tr><td><Term id="hyperscaler">Hyperscaler</Term></td><td>A large, general-purpose cloud provider</td><td>AWS, GCP</td></tr>
    <tr><td><Term id="neocloud">Neocloud</Term></td><td>A cloud provider focused on GPUs</td><td>CoreWeave, Nebius</td></tr>
    <tr><td>Reseller</td><td>A secondary market for GPU capacity</td><td>SF Compute Company</td></tr>
  </tbody>
</table>
</div>

<h2>Comparing Providers</h2>
<p>
  Providers vary in capacity, availability, and reliability. Hyperscalers generally charge a premium. Across all
  providers, lower cost trades against uptime SLAs, support, regional availability, instance configuration, and
  cluster size.
</p>

<h2>Securing Capacity</h2>
<p>
  The first challenge is getting GPUs at all, especially the latest hardware. Large clusters are hard to find, and few
  providers offer blocks of hundreds of nodes. Many providers allocate most in-demand GPUs to their largest customers
  on long-term reservations. A team may need to work with several providers to get the GPUs it needs in the regions
  it needs.
</p>
