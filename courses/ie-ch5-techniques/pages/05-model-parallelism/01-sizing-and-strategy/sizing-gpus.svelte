<script module>
  export const pageConfig = { title: 'Estimating GPU Count' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import MemoryFit from '$shared/sims/MemoryFit.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Estimating GPU Count</h1>

<p>
  Every frontier LLM is too large to fit on one GPU for batch inference. GPUs have grown, and models have grown
  faster. <Term id="model-parallelism">Model parallelism</Term> splits one model across several GPUs, and the first
  question is how many GPUs it needs.
</p>

<Signal kind="recall" chapter={3} title="Weight memory and the planning factor">
  <p>
    Weight memory equals the parameter count times the bytes per parameter: 2 bytes in FP16 or BF16, 1 byte in <Term id="fp8">FP8</Term>,
    and half a byte in FP4. One billion parameters at one byte occupy one gigabyte. Chapter 3 then applied a
    <Term id="memory-planning-factor">planning factor</Term>: required <Term id="vram">VRAM</Term> is at least the factor times the weight
    memory, with a minimum factor of 1.5.
  </p>
</Signal>

<h2>Memory beyond the weights</h2>
<p>
  DeepSeek-V3.1 has 671 billion parameters, so its FP8 <Term id="weights">weights</Term> occupy about 671 GB. That alone would cause an
  <Term id="out-of-memory">out-of-memory (OOM) error</Term> on a single <Term id="b200" /> with 180 GB.
</p>
<p>
  Four B200 GPUs provide 720 GB of VRAM, which could hold the weights with almost nothing to spare. No room would
  remain for the <Term id="kv-cache" />. At runtime, engines give the KV cache most of the memory left after the
  weights load, often 80 percent or more of it, through settings such as <code>free_gpu_memory_fraction</code>.
  With only 49 GB left across four GPUs, that share would hold too few tokens to serve any reasonable sequence
  length or <Term id="batch-size">batch size</Term>. A full <Term id="node">node</Term> of eight B200 GPUs is needed for real production traffic.
</p>

<h2>The planning factor for production</h2>
<p>
  Chapter 3's factor of 1.5 is the floor for fitting a model with modest concurrency. Production deployments that
  serve many concurrent sequences need more KV cache, so this chapter uses a planning factor of 1.8. A factor of 1.8
  reserves room for the KV cache, <Term id="activations">activations</Term>, and overhead equal to 80 percent of the weight memory.
</p>
<p class="ie-formula">required VRAM = bytes per parameter × parameters (billions) × planning factor</p>
<p>Round the result up to the next available instance size to find the minimum GPU count.</p>

<Figure
  number="5.11"
  caption="After calculating how much VRAM inference requires, round up to the next available instance size to find the minimum GPU count."
>
  <pre class="ie-code"><code># Deciding GPU allocation for DeepSeek
bits_precision = 8  # FP8 quantization
params = 671  # parameters in billions
planning_factor = 1.8

vram_required = (bits_precision / 8) * params * planning_factor
# DeepSeek requires about 1200 GB of VRAM with this config

b200_vram_available = [180, 360, 720, 1440]

round_up(vram_required, b200_vram_available)
# Serving DeepSeek in FP8 requires 1440 GB of VRAM (8xB200 GPUs)</code></pre>
</Figure>

<Signal kind="worked" title="A 235-billion-parameter model in FP8 on B200 GPUs">
  <p>B200 instances offer 1, 2, 4, or 8 GPUs, with 180, 360, 720, or 1,440 GB of VRAM.</p>
  <ol>
    <li>Bytes per parameter: 8 bits ÷ 8 = 1 byte.</li>
    <li>Weight memory: 1 × 235 = 235 GB.</li>
    <li>Required VRAM: 235 GB × 1.8 = 423 GB.</li>
    <li>Round up: 423 GB exceeds 360 GB, so the smallest instance that fits is 720 GB, or four B200 GPUs.</li>
  </ol>
  <p>
    Many deployments, even for midsize models such as GPT-OSS, use more GPUs than the minimum. Extra GPUs allow
    larger KV caches and better per-user latency.
  </p>
</Signal>

<h2>Faded example: a 120-billion-parameter model</h2>
<p>
  A team serves a 120-billion-parameter model in FP16 on H100 GPUs at a planning factor of 1.8. H100 instances
  offer 1, 2, 4, or 8 GPUs, with 80, 160, 320, or 640 GB of VRAM. The first steps are done: FP16 uses 2 bytes per
  parameter, so the required VRAM is 2 × 120 × 1.8 = 432 GB.
</p>
<NumericQuestion
  id="size_faded"
  question="Complete the final step. What is the minimum number of H100 GPUs?"
  answer={8}
  unit="GPUs"
  correctFeedback="Correct. 432 GB exceeds the 320 GB of four H100s, so the next instance, 640 GB, needs eight GPUs."
  incorrectFeedback="Round 432 GB up to the next instance size. Four H100s give only 320 GB, so the deployment needs the 640 GB instance, which has eight GPUs."
/>

<h2>Practice: minimum GPU count</h2>
<NumericQuestion
  id="size_practice_1"
  question="A 90-billion-parameter model is served in FP8 on H100 GPUs at a planning factor of 1.8. Instances offer 80, 160, 320, or 640 GB with 1, 2, 4, or 8 GPUs. What is the minimum number of GPUs?"
  answer={4}
  unit="GPUs"
  correctFeedback="Correct. 1 × 90 × 1.8 = 162 GB, which is slightly above 160 GB, so the deployment needs the 320 GB instance with four GPUs."
  incorrectFeedback="Required VRAM is 1 byte × 90 × 1.8 = 162 GB. The 160 GB instance falls 2 GB short, so round up to 320 GB, which is four H100 GPUs."
/>

<NumericQuestion
  id="size_practice_2"
  question="A 300-billion-parameter model is served in FP4 on B200 GPUs at a planning factor of 1.8. Instances offer 180, 360, 720, or 1,440 GB with 1, 2, 4, or 8 GPUs. What is the minimum number of GPUs?"
  answer={2}
  unit="GPUs"
  correctFeedback="Correct. FP4 uses half a byte per parameter, so 0.5 × 300 × 1.8 = 270 GB, which rounds up to the 360 GB instance with two GPUs."
  incorrectFeedback="FP4 stores each parameter in half a byte. Required VRAM is 0.5 × 300 × 1.8 = 270 GB. That exceeds 180 GB, so round up to 360 GB, which is two B200 GPUs."
/>

<Signal kind="try" title="Size a deployment in the calculator">
  <ol>
    <li>Select the "405B in FP8 on B200s, long context" scenario. Record the minimum GPU count that the summary reports at a planning factor of 1.8.</li>
    <li>Lower the planning factor to 1.5 and record the new minimum GPU count. Explain why Chapter 3's floor is too low for this long-context workload.</li>
    <li>Return the factor to 1.8. Raise the concurrent sequences until the verdict changes from "Fits with headroom", and record that sequence count.</li>
  </ol>
</Signal>

<MemoryFit
  headingLevel={2}
  title="GPU memory calculator"
  model="llama-70b"
  weightPrecision="fp8"
  kvPrecision="fp8"
  context={8192}
  sequences={16}
  gpu="h100"
  gpuCount={2}
  planningFactor={1.8}
/>

<h2>Calculator practice: concurrent sequences</h2>
<NumericQuestion
  id="size_sim_1"
  question="Select the 405B in FP8 on B200s, long context scenario, then set the context length to 32,768 tokens. What maximum number of concurrent sequences does the summary report?"
  answer={105}
  unit="sequences"
  correctFeedback="Correct. Eight B200s each keep about 111 GB for the KV cache after weights and overhead, and one 32,768-token sequence takes about 1.06 GB per GPU, so 105 sequences fit."
  incorrectFeedback="Load the scenario, then move the context length slider to 32,768 tokens. The summary reports 105 concurrent sequences: about 111 GB of KV room per GPU divided by about 1.06 GB per sequence."
/>
