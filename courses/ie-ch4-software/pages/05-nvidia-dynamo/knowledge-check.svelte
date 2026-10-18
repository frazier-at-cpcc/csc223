<script module>
  export const pageConfig = { title: 'Knowledge Check: NVIDIA Dynamo' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: NVIDIA Dynamo</h1>

<p>
  These questions are ungraded. The sorting item practices objective 7: judge
  whether a deployment carries enough traffic to justify the added complexity of
  NVIDIA Dynamo. The other two check how Dynamo relates to the engines and what
  its planner does.
</p>

<Sorting
  id="kc_dynamo_sort"
  question="Sort each deployment by the better serving choice."
  items={[
    'A trillion-parameter MoE model behind a public API with millions of daily users',
    'A frontier lab launching an API for a model it trained from scratch',
    'A popular consumer chat product built on an open model, running on dozens of replicas',
    'A single-GPU summarizer for one team that sends a few requests per hour',
    'A weekend hackathon demo running on one node',
    'A nightly batch job on two GPUs whose prompts share no common prefix',
  ]}
  targets={['Adopt Dynamo', 'Use the inference engine alone']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="Dynamo pays off when volume keeps many workers busy, so disaggregation and cache-aware routing have work to do. Small, quiet, or prefix-free deployments gain nothing from them."
  incorrectFeedback="Look for volume and worker count. Disaggregation needs enough traffic to fill separate prefill and decode pools. Cache-aware routing needs shared prefixes and several workers to choose among."
/>

<MultipleChoice
  id="kc_dynamo_relation"
  question="How does NVIDIA Dynamo relate to vLLM, SGLang, and TensorRT-LLM?"
  options={[
    'Dynamo compiles their models into TensorRT engine files.',
    'Dynamo orchestrates them as backends across a deployment.',
    'Dynamo replaces them with its own kernels.',
  ]}
  correct={1}
  optionFeedback={[
    'Compiling a TensorRT engine file is a TensorRT task. Dynamo orchestrates serving.',
    'Correct. Dynamo uses each engine as a backend and adds an orchestration layer for large-scale deployments.',
    'Dynamo depends on the engines for model execution. It does not replace them.',
  ]}
/>

<MultipleChoice
  id="kc_dynamo_planner"
  question="A Dynamo deployment must keep time to first token under a target as traffic rises through the day. Which Dynamo capability addresses this?"
  options={[
    'A fixed number of GPUs assigned at startup',
    'A kernel profiler for attention operations',
    'A planner that scales prefill and decode workers',
  ]}
  correct={2}
  optionFeedback={[
    'A fixed allocation cannot respond to rising traffic. Dynamo scales workers in real time.',
    'Profiling diagnoses kernels offline. It does not adjust a running deployment.',
    'Correct. The planner scales prefill and decode workers up and down to keep TTFT and TPS within their targets.',
  ]}
/>
