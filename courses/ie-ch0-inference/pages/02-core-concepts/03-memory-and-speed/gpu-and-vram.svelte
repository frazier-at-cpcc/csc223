<script module>
  export const pageConfig = { title: 'GPUs and VRAM' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>GPUs and VRAM</h1>

<dl>
  <dt><dfn><strong>GPU</strong></dfn></dt>
  <dd>
    A graphics processing unit: a highly parallel processor that runs thousands of arithmetic operations at once. Forward
    passes consist mostly of <Term id="matmul">matrix multiplications</Term>, which suit this parallel design.
  </dd>
  <dt><dfn><strong>VRAM</strong></dfn></dt>
  <dd>
    The memory on the GPU itself. It holds the <Term id="weights">weights</Term>, the <Term id="kv-cache">KV cache</Term>, and the intermediate
    results of each forward pass.
  </dd>
</dl>

<p>
  VRAM has two properties that matter for inference. Its capacity limits what fits on the GPU. Its bandwidth, the rate at
  which data moves out of it, limits decode speed. As of October 2026, an NVIDIA H100 provides 80 GB of VRAM, an H200
  provides 141 GB, and a B200 provides about 180 GB.
</p>

<h2>Comparing Weight Memory with VRAM</h2>

<p>
  The first check for any deployment compares weight memory with VRAM. Weights that exceed the VRAM of one GPU need a
  lower precision, several GPUs, or both.
</p>

<Signal kind="mistake" title="Weights that fit do not mean the model fits">
  <p>
    VRAM must also hold the KV cache for every active request and the intermediate results of each pass. A model whose
    weights fill 78 GB of an 80 GB GPU cannot serve real traffic. Chapter 3 teaches a planning rule: total VRAM should be at
    least 1.5 times the weight memory.
  </p>
</Signal>

<h2>Practice: Weight Memory</h2>

<p>
  The Parameters and Weights page worked an 8-billion-parameter model and a 70-billion-parameter model. Solve the next two
  problems on your own.
</p>

<NumericQuestion
  id="practice_weight_32b"
  question="A team stores a 32-billion-parameter model in FP8. How many gigabytes do its weights occupy?"
  answer={32}
  unit="GB"
  correctFeedback="Correct. FP8 uses 1 byte per parameter, so 32 × 10^9 × 1 byte = 32 GB."
  incorrectFeedback="FP8 uses 1 byte per parameter. 32 × 10^9 × 1 byte = 32 × 10^9 bytes, which is 32 GB."
/>

<NumericQuestion
  id="practice_weight_120b"
  question="A 120-billion-parameter model is stored in FP4. How many gigabytes do its weights occupy?"
  answer={60}
  unit="GB"
  correctFeedback="Correct. FP4 uses half a byte per parameter, so 120 × 10^9 × 0.5 bytes = 60 GB."
  incorrectFeedback="FP4 uses 4 bits, which is half a byte. 120 × 10^9 × 0.5 bytes = 60 × 10^9 bytes, which is 60 GB."
/>
