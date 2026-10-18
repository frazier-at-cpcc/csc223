<script module>
  export const pageConfig = { title: 'Knowledge Check: NVIDIA Dynamo' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: NVIDIA Dynamo</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_dynamo_1"
  question="How does NVIDIA Dynamo relate to vLLM, SGLang, and TensorRT-LLM?"
  options={[
    'Dynamo compiles their models into TensorRT engines.',
    'Dynamo orchestrates them as backends across a deployment.',
    'Dynamo replaces them with its own kernels.',
    'Dynamo requires TensorRT-LLM as its backend.',
  ]}
  correct={1}
  optionFeedback={[
    'Compiling to a TensorRT engine is a TensorRT task. Dynamo orchestrates serving.',
    'Correct. Dynamo uses each engine as a backend and adds an orchestration layer for large-scale deployments.',
    'Dynamo depends on the engines for model execution. It does not replace them.',
    'Dynamo works with all three engines. TensorRT-LLM is the most deeply integrated, but any of the three can serve as a backend.',
  ]}
/>

<MultipleChoice
  id="kc_dynamo_2"
  question="A Dynamo deployment must keep time to first token under a user-defined limit as traffic rises. Which Dynamo capability addresses this?"
  options={[
    'An SLA-based planner that scales prefill and decode workers',
    'Automatic conversion of weights from safetensors to ONNX',
    'A built-in kernel profiler for attention operations',
    'A fixed number of GPUs assigned at startup',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The SLA-based planner scales prefill and decode workers up and down against TTFT and TPS targets.',
    'Format conversion does not respond to traffic. Dynamo adjusts workers at runtime.',
    'Profiling diagnoses kernels offline. It does not adjust a running deployment.',
    'A fixed allocation cannot respond to rising traffic. Dynamo scales workers in real time.',
  ]}
/>
