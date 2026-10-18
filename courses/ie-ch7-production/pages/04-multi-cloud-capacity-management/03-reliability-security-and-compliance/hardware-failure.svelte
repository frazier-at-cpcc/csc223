<script module>
  export const pageConfig = { title: 'Expecting Hardware Failure' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import FailureCauses from '../../../components/FailureCauses.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Expecting Hardware Failure</h1>

<p>
  GPUs fail often in production. Every engineer who has run a large training job plans for hardware failure. Inference
  engineers need to plan for it too.
</p>

<h2>The Llama 3 Failure Rate</h2>
<p>
  In the Llama 3 paper, Grattafiori and colleagues (2024) report that the Llama team ran 16,000 GPUs for 54 days and
  experienced 419 unexpected interruptions. Confirmed hardware issues caused about 78 percent of them.
</p>

<Signal kind="worked" title="From a training run to one inference node">
  <ol>
    <li>GPU-hours in the training run: 16,000 GPUs × 54 days × 24 hours = 20,736,000 GPU-hours.</li>
    <li>Failure rate: 20,736,000 ÷ 419 ≈ 49,500 GPU-hours per failure, or about one failure per 50,000 GPU-hours.</li>
    <li>One 8-GPU inference node for one year: 8 × 24 × 365 = 70,080 GPU-hours.</li>
    <li>Expected failures for that node: 70,080 ÷ 50,000 ≈ 1.4 per year.</li>
  </ol>
  <p>At that rate, a single 8-GPU node should expect more than one failure per year, and a fleet of nodes should expect failures every week.</p>
</Signal>

<Figure
  number="7.12"
  caption="Root cause of failures when training Llama 3, adapted from “The Llama 3 Herd of Models” (Grattafiori et al., 2024)."
  description="A bar chart of the 419 unexpected interruptions, grouped by the category labels in Table 5 of the paper. GPU causes account for 268 interruptions: faulty GPUs 148, HBM3 memory 72, SRAM memory 19, the GPU system processor 17, silent data corruption 6, and thermal interface and sensor faults 6. Dependency causes account for 56, mostly software bugs. Network switches and cables account for 35, unplanned host maintenance for 32, other host components such as network cards and power supplies for 21, and NCCL watchdog timeouts of unknown cause for 7."
>
  <FailureCauses />
</Figure>
