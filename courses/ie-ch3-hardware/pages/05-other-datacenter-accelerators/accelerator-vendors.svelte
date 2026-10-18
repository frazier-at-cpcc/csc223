<script module>
  export const pageConfig = { title: 'Accelerator Vendors Beyond NVIDIA' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Accelerator Vendors Beyond NVIDIA</h1>

<p>
  NVIDIA's lead in AI hardware has made it one of the world's most valuable companies. It is far from the only
  company that builds hardware for AI inference. Industry giants such as Amazon and Google, and a large crop of
  startups, are investing billions of dollars in alternatives to NVIDIA <Term id="gpu">GPUs</Term>.
</p>
<p>
  This series focuses on NVIDIA GPUs. The following vendors offer the other notable options for running model
  inference. Several of them build an <strong>Application-Specific Integrated Circuit (ASIC)</strong>, a chip
  designed for one kind of workload. A GPU is a fairly general-purpose accelerator by comparison.
</p>

<div class="ie-table-wrap" role="region" aria-label="Notable non-NVIDIA datacenter accelerators, as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>Notable non-NVIDIA datacenter accelerators, as of October 2026</caption>
    <thead>
      <tr><th scope="col">Company</th><th scope="col">Ownership</th><th scope="col">Product line</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">AMD</th><td>Public</td><td>Instinct GPUs, such as the MI350 series, on AMD's own software stack. AMD announced the MI400 series for 2026.</td></tr>
      <tr><th scope="row">AWS</th><td>Public</td><td>Inferentia and Trainium: a pair of chips built for inference and training, respectively, on AWS</td></tr>
      <tr><th scope="row">Cerebras</th><td>Private</td><td>WSE-3: a wafer-scale chip with extremely high on-chip <Term id="memory-bandwidth">memory bandwidth</Term> that targets decode bottlenecks</td></tr>
      <tr><th scope="row">Etched</th><td>Private</td><td>Sohu: an ASIC built only for the <Term id="transformer">transformer</Term> architecture</td></tr>
      <tr><th scope="row">Furiosa</th><td>Private</td><td>RNGD: a power-efficient accelerator designed around tensor contraction, the general operation that includes matrix multiplication</td></tr>
      <tr><th scope="row">Google</th><td>Public</td><td>TPU: a Tensor Processing Unit, an AI-specific ASIC for inference and training</td></tr>
      <tr><th scope="row">Groq</th><td>Private</td><td>LPU: a language processing unit that relies on SRAM for high memory bandwidth. In December 2025, Groq licensed its technology to NVIDIA, and several Groq leaders joined NVIDIA.</td></tr>
      <tr><th scope="row">Qualcomm</th><td>Public</td><td>Cloud AI 100 Ultra: a card that combines four power-efficient AI 100 inference chips</td></tr>
      <tr><th scope="row">SambaNova</th><td>Private</td><td>RDU: a Reconfigurable Dataflow Unit with a large memory allocation for trillion-parameter models</td></tr>
    </tbody>
  </table>
</div>

<p>
  Company status and products change quickly in this market. Confirm each vendor's current offering before you
  plan around it.
</p>
