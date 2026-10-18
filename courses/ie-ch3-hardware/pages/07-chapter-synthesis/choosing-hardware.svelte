<script module>
  export const pageConfig = { title: 'Choosing Hardware' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { MultipleChoice, RevealModal } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Choosing Hardware</h1>

<p>
  Each section of this chapter answered one question about hardware. A real hardware choice answers all of them
  for one workload. This page joins them into one decision sequence and applies it to three cases. A fourth case
  is yours to work.
</p>

<Signal kind="summary" title="A decision sequence for choosing hardware">
  <div class="ie-table-wrap" role="region" aria-label="Five questions, in order, with the rule this chapter supplies for each" use:scrollable>
    <table class="ie-table">
      <caption>Five questions, in order, with the rule this chapter supplies for each</caption>
      <thead>
        <tr><th scope="col">Step and question</th><th scope="col">Rule from this chapter</th></tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1. Target: where must the model run?</th>
          <td>Offline or strict privacy points to the device or on-premise. Scale points to datacenter <Term id="gpu">GPUs</Term>. A model that cannot use a full GPU points to a MIG slice or a small GPU. <span class="ie-obj-inline">Objective 9.</span></td>
        </tr>
        <tr>
          <th scope="row">2. Memory: how much VRAM does the model need?</th>
          <td>Weight memory = <Term id="parameter">parameters</Term> × bytes per parameter. Minimum <Term id="vram">VRAM</Term> = 1.5 × weight memory, more for long contexts or high concurrency. <span class="ie-obj-inline">Objectives 4, 8.</span></td>
        </tr>
        <tr>
          <th scope="row">3. Bottleneck: which specification sets the speed?</th>
          <td>Compare <Term id="arithmetic-intensity">arithmetic intensity</Term> with the ops:byte ratio. Below the ridge, buy bandwidth. Above it, buy dense <Term id="flops">FLOPS</Term> at the serving <Term id="precision">precision</Term>. <span class="ie-obj-inline">Objectives 1, 2, 3, 5.</span></td>
        </tr>
        <tr>
          <th scope="row">4. Interconnect: which link will carry the heaviest traffic?</th>
          <td>Keep tensor parallelism inside one <Term id="nvlink">NVLink</Term> domain. Cross <Term id="node">nodes</Term> over 400 to 800 Gb/s NICs with <Term id="pipeline-parallelism">pipeline parallelism</Term> or separate replicas. <span class="ie-obj-inline">Objective 7.</span></td>
        </tr>
        <tr>
          <th scope="row">5. Generation: which features must the GPU support?</th>
          <td><Term id="fp8">FP8</Term> needs <Term id="hopper">Hopper</Term>, Ada Lovelace, or later. <Term id="fp4">FP4</Term> and the MX formats need <Term id="blackwell">Blackwell</Term>. Multi-GPU tensor parallelism needs NVLink, which Lovelace lacks. <span class="ie-obj-inline">Objective 6.</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</Signal>

<h2>Case 1: a decode-heavy chat service with a 70-billion-parameter model</h2>
<Signal kind="worked" title="70B chat model in FP8, about 16 concurrent conversations per replica">
  <ol class="ie-steps">
    <li>
      <strong>Target.</strong> A public chat product needs elastic capacity, so it runs on cloud datacenter GPUs.
    </li>
    <li>
      <strong>Memory.</strong> 70 billion × 1 byte = 70 GB of <Term id="weights">weights</Term>. The
      <Term id="memory-planning-factor">planning factor</Term> gives 1.5 × 70 = 105 GB. One 80 GB <Term id="h100">H100</Term> is too
      small. One 141 GB H200 fits, and so do two H100s with 160 GB together.
    </li>
    <li>
      <strong>Bottleneck.</strong> <Term id="decode">Decode</Term> at a batch of 16 in FP8 has an arithmetic intensity of about 32, far below
      the H200's <Term id="ops-byte-ratio">ops:byte ratio</Term> of about 412. The service is <Term id="memory-bound">memory-bound</Term>, so
      bandwidth sets its speed. One H200 streams 4.8 TB/s, a ceiling of about 69 decode steps per second for 70 GB
      of weights.
    </li>
    <li>
      <strong>Interconnect.</strong> One H200 needs no GPU-to-GPU traffic. Two H100s need
      <Term id="tensor-parallelism">tensor parallelism</Term> over NVLink, so they must be <Term id="sxm">SXM</Term> GPUs in one node.
      Together they stream 6.7 TB/s, a higher ceiling of about 96 steps per second, but each GPU contributes less
      and the pair communicates on every layer.
    </li>
    <li>
      <strong>Generation.</strong> Hopper supports FP8. A <Term id="b200">B200</Term> would add bandwidth, at 8 TB/s, at a higher price.
    </li>
  </ol>
  <p>
    <strong>Decision.</strong> Serve each replica on one H200 for the most tokens per GPU, or on two SXM H100s when
    the lowest per-request <Term id="latency">latency</Term> matters more. Benchmark a B200 before scaling up.
  </p>
</Signal>

<h2>Case 2: a small embedding model with modest traffic</h2>
<Signal kind="worked" title="0.6-billion-parameter embedding model in FP16 for a search feature">
  <ol class="ie-steps">
    <li>
      <strong>Target.</strong> The search feature already runs in the cloud, so the model runs there too.
    </li>
    <li>
      <strong>Memory.</strong> 0.6 billion × 2 bytes = 1.2 GB of weights, and 1.5 × 1.2 = 1.8 GB minimum. Any
      datacenter GPU holds it many times over.
    </li>
    <li>
      <strong>Bottleneck.</strong> An <Term id="embedding-model">embedding model</Term> runs one <Term id="forward-pass">forward pass</Term> over
      each input, like <Term id="prefill">prefill</Term>, so batches of inputs are <Term id="compute-bound">compute-bound</Term>. At modest traffic, a full H100 would sit
      mostly idle.
    </li>
    <li>
      <strong>Interconnect.</strong> One small GPU slice suffices, so no link matters.
    </li>
    <li>
      <strong>Generation.</strong> A <Term id="mig">MIG</Term> slice of an H100 or a small Lovelace GPU such as the
      L4 both support the FP16 or FP8 this model needs.
    </li>
  </ol>
  <p>
    <strong>Decision.</strong> Serve the model on a 1g.10gb MIG slice of an H100, which gives one seventh of the
    GPU's compute and 10 GB of memory, so seven such services can share one GPU. Choose an L4 if the provider does
    not sell MIG <Term id="instance">instances</Term>.
  </p>
</Signal>

<h2>Case 3: an offline translation feature in a mobile app</h2>
<Signal kind="worked" title="On-device translation for travelers without a data connection">
  <ol class="ie-steps">
    <li>
      <strong>Target.</strong> The feature must work on airplanes and abroad without data, and travelers'
      conversations should stay private. Both requirements point to
      <Term id="local-inference">local inference</Term> on the phone.
    </li>
    <li>
      <strong>Memory.</strong> Phones struggle with models above a few billion parameters. A 1-billion-parameter
      translation model <Term id="quantization">quantized</Term> to 4 bits needs 1 × 0.5 = 0.5 GB of weights and about 0.75 GB with the planning
      factor, which a median phone can spare.
    </li>
    <li>
      <strong>Bottleneck.</strong> On-device decode is memory-bound, and phone memory is far slower than <Term id="hbm">HBM</Term>. A
      smaller model streams fewer bytes per token, so it translates faster and drains less battery.
    </li>
    <li><strong>Interconnect.</strong> The model runs on one device, so no link matters.</li>
    <li>
      <strong>Generation.</strong> The team targets the median device, not the newest flagship, because most
      travelers carry older phones.
    </li>
  </ol>
  <p>
    <strong>Decision.</strong> Ship a small quantized translation model on the device through the platform's
    on-device AI framework, and test it on older phones before release.
  </p>
</Signal>

<h2>Case 4: your turn, a 405-billion-parameter research assistant</h2>
<p>
  An internal research assistant serves a 405-billion-parameter model in FP8 to a few dozen analysts. Traffic is
  low, and analysts paste long documents into each request. The team rents cloud GPUs and can choose H100, H200,
  or B200 nodes. NVIDIA HGX B200 systems list 180 GB per GPU. Work steps 2 to 4, then compare your reasoning with
  the expert answer.
</p>

<p class="ie-obj">Objective 4: Calculate the minimum VRAM for a model</p>
<NumericQuestion
  id="case4_vram"
  question="Step 2: using a planning factor of 1.5, what is the minimum VRAM for the 405-billion-parameter FP8 model?"
  answer={607.5}
  tolerance={1}
  unit="GB"
  correctFeedback="Correct. 405 billion × 1 byte = 405 GB of weights, and 1.5 × 405 = 607.5 GB."
  incorrectFeedback="FP8 uses 1 byte per parameter, so the weights occupy 405 GB. Then 1.5 × 405 GB = 607.5 GB."
/>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<MultipleChoice
  id="case4_layout"
  question="Step 4: which deployment meets the 607.5 GB minimum with the fewest GPUs while keeping tensor parallelism inside one NVLink domain?"
  options={[
    'Eight H100 GPUs in one node, with 640 GB together',
    'Four B200 GPUs in one node, with 720 GB together',
    'Two nodes of eight H100 GPUs linked by 400 Gb/s NICs',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Eight H100s meet the minimum inside one NVLink domain, but they use twice as many GPUs as four B200s.',
    'Correct. Four B200s hold 720 GB, which meets the 607.5 GB minimum, and four GPUs in one node share NVLink.',
    'Incorrect. Two nodes put the tensor-parallel traffic on 50 GB/s network links instead of NVLink, and sixteen GPUs is more than the model needs.',
  ]}
/>

<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<MultipleChoice
  id="case4_bottleneck"
  question="Step 3: once each long document is processed, the assistant streams its answer to one analyst at a time. Which specification sets the speed of that streamed answer?"
  options={['Dense FP8 FLOPS', 'Memory bandwidth', 'Network bandwidth between nodes']}
  correct={1}
  optionFeedback={[
    'Incorrect. Dense FLOPS govern the prefill of the long document. Streaming the answer is decode at a batch near 1.',
    'Correct. Decode at a batch near 1 has very low arithmetic intensity, so memory bandwidth sets the speed. The B200 leads at up to 8 TB/s.',
    'Incorrect. The chosen layout fits in one node, so no traffic crosses the network.',
  ]}
/>

<RevealModal title="Expert answer for case 4">
  {#snippet trigger()}<button type="button" class="tessera-btn-primary">Show the expert answer for case 4</button>{/snippet}
  {#snippet content()}
    <h2>Expert answer: the 405-billion-parameter research assistant</h2>
    <ol class="ie-steps">
      <li><strong>Target.</strong> Cloud datacenter GPUs, because the model is far too large for local hardware.</li>
      <li><strong>Memory.</strong> 405 GB of weights and a 607.5 GB minimum. Long documents fill the <Term id="kv-cache">KV cache</Term> quickly, so leave more headroom than the minimum.</li>
      <li>
        <strong>Bottleneck.</strong> Prefill of each long document is compute-bound and benefits from FLOPS. The
        streamed answer is decode at a batch near 1, which is memory-bound and benefits from bandwidth. The B200
        leads on both.
      </li>
      <li>
        <strong>Interconnect.</strong> Four B200s with 720 GB keep tensor parallelism inside one NVLink domain.
        Eight B200s add KV cache room for longer documents without leaving the node. Avoid spreading tensor
        parallelism across nodes.
      </li>
      <li><strong>Generation.</strong> Blackwell supports FP8 and adds FP4, which could halve the weight memory again if quality holds.</li>
    </ol>
    <p><strong>Decision.</strong> Start with four B200s in one node, and move to eight if long documents exhaust the KV cache headroom.</p>
  {/snippet}
</RevealModal>

<h2>What comes next</h2>
<p>
  Chapter 4 moves up the stack to the software that runs on this hardware, from <Term id="cuda">CUDA</Term> <Term id="kernel">kernels</Term> to inference engines
  such as vLLM, SGLang, and TensorRT-LLM. Those engines decide how well a deployment reaches the compute and
  bandwidth ceilings that this chapter taught you to read from a spec sheet.
</p>
