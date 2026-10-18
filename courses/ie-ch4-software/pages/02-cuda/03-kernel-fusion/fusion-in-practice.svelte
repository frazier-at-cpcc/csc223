<script module>
  export const pageConfig = { title: 'Kernel Fusion in Practice' };
</script>

<script>
  import RooflineExplorer from '$shared/sims/RooflineExplorer.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Kernel Fusion in Practice</h1>

<p>
  Real kernel fusion is far more complicated than the multiplication example.
  Real functions are more complex, and their data does not overlap as cleanly.
  The goal stays the same: move data between memory and compute as few times as
  possible.
</p>

<h2>Common fusion patterns</h2>

<p>
  Inference workloads repeat a few fusion patterns. One common pattern combines
  a <Term id="gemm">matrix multiplication</Term>, the bias addition that follows it, and the
  <Term id="activation-function">activation function</Term> after that into a single kernel. The bias and the
  activation then run on the matrix multiplication's output while it is still on
  chip.
</p>

<h2>Automatic and manual fusion</h2>

<ul>
  <li>
    Automatic fusion: compilers such as <Term id="torch-compile" /> identify
    straightforward fusion opportunities and generate fused kernels without
    engineer involvement.
  </li>
  <li>
    Manual fusion: sophisticated algorithms such as <Term id="flashattention" />
    require handwritten fused kernels. Engines load these kernels as plugin
    kernels during inference.
  </li>
</ul>

<h2>Why bytes, not arithmetic, set the time in decode</h2>

<p>
  Chapter 2 showed that <Term id="decode">decode</Term> is memory-bound. The simulation below
  places decode on the <Term id="roofline-model">roofline model</Term> so you can see how far below the
  compute ceiling it runs. A workload in that region finishes faster only when it
  moves fewer bytes, which is exactly what fusion achieves.
</p>

<Signal kind="try" title="Measure how much compute decode leaves idle">
  <ol>
    <li>Select the scenario "Single-user decode on H100." Record the attainable throughput as a percentage of peak.</li>
    <li>Select "Same decode on B200." Compare the percentage of peak with the H100 value.</li>
    <li>Return to the H100 and drag the batch-size slider until the verdict changes to compute bound. Note the batch size at the crossover.</li>
  </ol>
</Signal>

<RooflineExplorer gpu="h100" workload="decode" batch={1} title="Roofline explorer: decode on one GPU" headingLevel={2} />

<p>
  At batch size 1, decode uses well under one percent of the GPU's peak compute
  on both GPUs. Removing a megabyte of memory traffic saves time. Removing
  arithmetic saves almost none. Large batches raise the arithmetic intensity of
  the linear layers, but elementwise kernels stay memory-bound at any batch size,
  so fusing them pays off in both regimes.
</p>

<NumericQuestion
  id="sim_roofline_pct"
  question="Using the simulation's single-user decode scenario on the H100, what percentage of peak compute does decode attain? Enter the percentage shown."
  answer={0.339}
  tolerance={0.01}
  unit="percent"
  correctFeedback="Decode at batch size 1 attains about 3.35 TFLOPS of the 989 TFLOPS peak, about 0.339 percent. The GPU spends its time waiting on memory, so removing bytes is what speeds it up."
  incorrectFeedback="Load the scenario 'Single-user decode on H100' and read the status line. The attainable throughput is 3.35 TFLOPS, which is about 0.339 percent of the 989 TFLOPS peak."
/>
