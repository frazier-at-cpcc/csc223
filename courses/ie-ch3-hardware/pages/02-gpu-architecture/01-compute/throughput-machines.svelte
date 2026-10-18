<script module>
  export const pageConfig = { title: 'GPUs as Throughput Machines' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>GPUs as Throughput Machines</h1>

<p>
  A <Term id="cpu">CPU</Term> and a <Term id="gpu">GPU</Term> solve different problems. A CPU excels at complex
  sequential execution: long chains of dependent instructions with branching logic. A GPU excels at simple,
  massively parallel work.
</p>
<p>
  More precisely, a GPU performs one uniform operation on thousands of independent pieces of data at the same
  time. AI model inference is a series of vector and matrix multiplications, and each multiplication breaks into
  many independent operations. That structure makes GPUs a natural fit for inference.
</p>

<h2>Threads on CPUs and GPUs</h2>
<p>
  A <strong>thread</strong> is an independent stream of instructions. The concept means the same thing on both
  processors, but the scale differs by orders of magnitude.
</p>
<div class="ie-table-wrap" role="region" aria-label="Thread capacity compared" use:scrollable>
  <table class="ie-table">
    <caption>Thread capacity compared</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">CPU</th><th scope="col">GPU</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Concurrent threads</th><td>Dozens to hundreds</td><td>Tens to hundreds of thousands</td></tr>
      <tr><th scope="row">Task switching</th><td>Costly context switches</td><td>A switch within a single clock cycle</td></tr>
      <tr><th scope="row">Instruction style</th><td>Complex, sequential</td><td>Simple, executed in parallel</td></tr>
    </tbody>
  </table>
</div>

<h2>The level of abstraction for inference engineers</h2>
<p>
  GPUs are extraordinarily complex devices. Their engineering spans the physics of power and cooling and the
  extremely tight tolerances of chip manufacturing. Inference engineers work at a level of abstraction above
  that hardware. A strong mental model of what happens inside the box is still essential for building
  high-performance systems, and the next pages build that model.
</p>
