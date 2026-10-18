<script module>
  export const pageConfig = { title: 'Compute-Bound Workloads' };
</script>

<h1>Compute-Bound Workloads</h1>

<p>
  A <strong>compute-bound</strong> workload is limited by available FLOPS rather than by memory bandwidth.
  Adding faster memory does little for it. Adding more Tensor Core throughput speeds it up.
</p>

<h2>Which inference workloads are compute-bound</h2>
<ul>
  <li>
    <strong>LLM prefill</strong>, the phase in which the model processes the input sequence and builds the KV
    cache. Prefill handles every input token at once, so it performs large matrix multiplications.
  </li>
  <li>Image generation.</li>
  <li>Video generation.</li>
</ul>

<h2>Selecting hardware for these workloads</h2>
<p>
  When your workload is dominated by prefill or by image or video generation, choose the accelerator with more
  FLOPS. Compare candidates at the same precision and with dense figures, as the previous page described.
</p>
<p>
  The next lesson introduces the opposite case. LLM decode is limited by memory bandwidth, and it calls for a
  different specification.
</p>
