<script module>
  export const pageConfig = { title: 'Expecting Hardware Failure' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import FailureCauses from '../../../components/FailureCauses.svelte';
</script>

<h1>Expecting Hardware Failure</h1>

<p>
  GPUs fail often in production. Every engineer who has run a large training job plans for hardware failure. Inference
  engineers need to plan for it too.
</p>

<h2>The Llama 3 failure rate</h2>

<p>
  In the Llama 3 paper, Grattafiori and colleagues (2024) report that the Llama team ran 16,000 GPUs for 54 days and
  experienced 419 unexpected interruptions. Hardware failure caused most of them.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <ul>
    <li>GPU-hours in the training run: 16,000 GPUs × 54 days × 24 hours = 20,736,000 GPU-hours.</li>
    <li>Failure rate: 20,736,000 ÷ 419 ≈ 49,500 GPU-hours per failure, or about one failure per 50,000 GPU-hours.</li>
    <li>One 8-GPU inference node for one year: 8 × 24 × 365 = 70,080 GPU-hours.</li>
  </ul>
  <p>At that rate, a single 8-GPU node should expect more than one failure per year. Inference engineers should expect hardware failure.</p>
</div>

<Figure
  number="7.12"
  caption="Root cause of failures when training Llama 3, adapted from “The Llama 3 Herd of Models” (Grattafiori et al., 2024)."
  description="A chart of five root-cause categories for unexpected interruptions during Llama 3 training. GPU failures are by far the largest category and account for more than half of all interruptions. Dependency, host, network, and maintenance causes each account for a much smaller share. Bar lengths approximate the slices of the pie chart in the book, which prints no exact values."
>
  <FailureCauses />
</Figure>
