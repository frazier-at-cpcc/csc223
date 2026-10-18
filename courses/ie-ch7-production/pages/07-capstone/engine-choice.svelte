<script module>
  export const pageConfig = { title: 'Capstone Step 4: Engine Choice' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Capstone Step 4: Engine Choice</h1>

<Signal kind="recall" chapter={4}>
  <p>
    <Term id="vllm" /> and <Term id="sglang" /> are general engines. They are easier to adopt and support more models
    on the day they launch. <Term id="tensorrt-llm" /> has a steeper learning curve and usually achieves the best
    performance, and it compiles an engine for the specific GPU before serving. The book recommends choosing an engine
    for each deployment based on its needs.
  </p>
</Signal>

<p>Beacon's situation adds three constraints to the choice.</p>
<ul>
  <li>Two engineers own the whole inference stack, and the launch is six weeks away.</li>
  <li>The support team retrains the fine-tuned model every week as new tickets arrive, so the serving stack must take a new checkpoint often.</li>
  <li>Traffic ramps up every morning, so new replicas must start quickly. Every minute of cold start becomes queueing at the top of the ramp, as step 6 shows.</li>
</ul>

<p class="ie-objective">Decision 4, drawing on Chapter 4</p>
<MultipleChoice
  id="cap_engine"
  question="Which engine plan fits Beacon's constraints?"
  options={[
    'Hugging Face Transformers, since it supports new models first',
    'TensorRT-LLM from launch, since it gives the best performance',
    'vLLM or SGLang at launch, then benchmark TensorRT-LLM later',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Transformers is a reference library for running models. It lacks the continuous batching and memory management of a production engine, so it would waste most of each GPU.',
    'Incorrect. TensorRT-LLM may win on raw speed, but each weekly checkpoint needs a new compiled engine, and uncached compilation adds minutes to every cold start. Two engineers and six weeks leave little room for that work.',
    'Correct. A general engine supports Llama 3.1 out of the box and takes a new checkpoint without a rebuild, which suits a small team on a deadline. Once traffic and cost justify the work, the team can benchmark TensorRT-LLM with a cached engine.',
  ]}
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    Beacon launches on vLLM with its compile cache enabled, so replicas that start after the first one skip most of
    the startup compilation. Benchmarks on the H100s show that one replica serves 16 concurrent users at about 50 tokens
    per second each.
  </p>
</details>
