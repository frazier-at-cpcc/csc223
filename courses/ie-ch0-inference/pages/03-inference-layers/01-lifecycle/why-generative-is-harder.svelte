<script module>
  export const pageConfig = { title: 'Why Generative AI Inference Is Harder' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Why Generative AI Inference Is Harder</h1>

<p>
  Four properties of generative AI models make them harder to serve than classic ML models. Each one draws on a term from
  the Core Concepts section, and each one returns in a later chapter.
</p>

<h2>Model Size Against GPU Memory</h2>

<p>
  A 70-billion-parameter model in FP16 has 140 GB of weights. One H100 GPU has 80 GB of <Term id="vram">VRAM</Term>. The
  weights do not fit on one GPU, and the <Term id="kv-cache">KV cache</Term> needs room too. Serving the model requires several GPUs, a
  lower precision, or both. Chapter 3 sizes GPU memory, and Chapter 5 covers lower precisions and splitting a model across
  GPUs.
</p>

<h2>Sequential Token Generation</h2>

<p>
  A classic model returns one prediction from one computation. An LLM runs one <Term id="forward-pass">forward pass</Term> for every output
  token, and each pass must wait for the one before it. A 1,000-token answer takes ten times as many decode passes as a
  100-token answer, so latency and cost grow with output length. Because <Term id="decode">decode</Term> is memory-bound, each of
  those passes reads the full set of weights from memory. Chapter 2 explains the cost of each pass.
</p>

<h2>Variable Request Lengths</h2>

<p>
  Classic requests have a fixed size. LLM prompts range from a few tokens to more than 100,000, and no one knows the length
  of a response until the model stops. Each request holds a KV cache that grows at its own rate. That variation makes it
  hard to group requests efficiently on a GPU and hard to predict how much capacity traffic needs. Chapters 5 and 7 address
  both problems.
</p>

<h2>GPU Scarcity and Cost</h2>

<p>
  Datacenter GPUs cost far more per hour than CPUs, and no single region or cloud provider can always supply as many as a
  growing service needs. Idle GPUs waste money, and too few GPUs leave requests waiting. Chapter 3 compares GPU options, and
  Chapter 7 covers capacity across clouds.
</p>

<h2>What the Four Properties Require</h2>

<p>
  Together, these properties explain why weights plus GPUs do not make a production service. The model needs software
  that runs it efficiently on its GPUs, infrastructure that supplies and scales those GPUs, and tooling that lets engineers
  control both. The next lesson names those three layers.
</p>
