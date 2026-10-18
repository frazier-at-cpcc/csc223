<script module>
  export const pageConfig = { title: 'Capstone Step 3: Hardware and Memory' };
</script>

<script>
  import MemoryFit from '$shared/sims/MemoryFit.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Capstone Step 3: Hardware and Memory</h1>

<Signal kind="recall" chapter={3}>
  <p>
    Weight memory equals parameters times bytes per parameter. <Term id="vram" /> must also hold the <Term id="kv-cache">KV cache</Term>, so plan
    for total VRAM of at least 1.5 times the weight memory, the minimum <Term id="memory-planning-factor">memory planning factor</Term>. If VRAM
    cannot hold the weights, loading fails with an <Term id="out-of-memory">out-of-memory error</Term>.
  </p>
</Signal>

<p>
  Beacon's team has access to <Term id="h100" /> GPUs with 80 GB each. It serves the 70B model in FP16 first, with an 8,192-token
  context for long chats. Chapter 3 added one more rule, which the calculator below enforces: <Term id="tensor-parallelism">tensor parallelism</Term> splits the
  model's 8 KV heads across GPUs, so the GPU count must divide 8 evenly.
</p>

<p class="ie-objective">Decision 3a, drawing on Chapter 3</p>
<NumericQuestion
  id="cap_vram"
  question="At a planning factor of 1.5, how many gigabytes of total VRAM does Beacon's 141.2 GB of FP16 weights require?"
  answer={211.8}
  tolerance={0.5}
  unit="GB"
  correctFeedback="Correct. 1.5 × 141.2 = 211.8 GB. Three H100s hold 240 GB, but the GPU count must also split the model evenly, which the calculator checks next."
  incorrectFeedback="Multiply the weight memory by the planning factor: 1.5 × 141.2 GB = 211.8 GB of total VRAM."
/>

<Signal kind="try" title="Size the FP16 deployment">
  <p>The calculator loads Llama 3.1 70B in FP16 with an FP16 KV cache, an 8,192-token context, 16 concurrent sequences, and 2 H100 GPUs.</p>
  <ol>
    <li>Read the verdict with 2 GPUs, and note how far each GPU is over capacity.</li>
    <li>Set the GPU count to 3. Note that the memory now fits, then read the tensor-parallel warning below the steps.</li>
    <li>Set the GPU count to 4. Record the free memory per GPU and the most concurrent sequences the deployment can hold.</li>
  </ol>
</Signal>

<MemoryFit model="llama-70b" weightPrecision="fp16" kvPrecision="fp16" context={8192} sequences={16} gpu="h100" gpuCount={2} headingLevel={2} />

<p class="ie-objective">Decision 3b, drawing on Chapter 3</p>
<NumericQuestion
  id="cap_seqs"
  question="With 4 H100 GPUs in FP16 at an 8,192-token context, what is the largest number of concurrent sequences the calculator reports the deployment can hold?"
  answer={54}
  unit="sequences"
  correctFeedback="Correct. Each GPU holds 35.3 GB of weights and an 8 GB overhead reserve, which leaves room for 54 sequences of 8,192 tokens. Beacon plans a batch size of 16 for latency, so memory leaves plenty of headroom."
  incorrectFeedback="Set the calculator to Llama 3.1 70B, FP16 weights and KV cache, 8,192 tokens, H100, and 4 GPUs. The summary reports at most 54 concurrent sequences, because each GPU keeps about 36.7 GB for the KV cache after weights and overhead."
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    In FP16, one Beacon replica needs 4 H100 GPUs: the planning factor asks for 211.8 GB, and tensor parallelism rules
    out 3 GPUs. Step 5 revisits this number.
  </p>
</details>
