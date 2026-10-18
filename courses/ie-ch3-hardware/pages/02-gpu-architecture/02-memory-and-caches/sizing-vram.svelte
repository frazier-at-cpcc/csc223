<script module>
  export const pageConfig = { title: 'Sizing VRAM for a Model' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Sizing VRAM for a Model</h1>

<p>
  Total VRAM limits the size of the model a GPU can serve. The VRAM must hold two things:
</p>
<ol>
  <li>The model weights.</li>
  <li>
    Headroom for the <strong>KV cache</strong>, the stored key and value tensors for each token. Plan for at
    least 50 percent of the weight size. Long contexts, high batch sizes, and video generation models need
    more.
  </li>
</ol>

<h2>What happens when VRAM runs short</h2>
<ul>
  <li>If VRAM cannot hold the weights, loading the model fails with an out-of-memory (OOM) error.</li>
  <li>If VRAM holds the weights but lacks headroom, inference runs slowly or crashes with an OOM error.</li>
</ul>

<h2>Worked example</h2>
<p>A model's weights occupy 50 GB. Apply the guideline in three steps.</p>
<ol>
  <li>Compute the minimum headroom: 50 GB × 0.5 = 25 GB.</li>
  <li>Add the weights and the headroom: 50 GB + 25 GB = 75 GB.</li>
  <li>Compare against candidate GPUs. An 80 GB H100 meets the 75 GB minimum. A 48 GB L40 cannot even load the weights.</li>
</ol>

<Callout type="tip">
  <p>
    Treat 1.5 times the weight size as a floor, not a target. A deployment that serves long documents or large
    batches needs a larger margin for the KV cache.
  </p>
</Callout>
