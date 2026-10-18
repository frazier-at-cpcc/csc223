<script module>
  export const pageConfig = { title: 'Knowledge Check: The Three Engines' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Three Engines</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_engines_1"
  question="A lab serves a large mixture-of-experts model to heavy traffic across four GB200 NVL72 nodes. The team wants high throughput and the ability to customize individual engine components. Which engine best fits?"
  options={['SGLang', 'TensorRT-LLM', 'vLLM']}
  correct={0}
  optionFeedback={[
    'Correct. SGLang has invested heavily in multi-node MoE deployments on systems such as the GB200 NVL72, and its design supports component-level customization.',
    'TensorRT-LLM offers top performance, but the scenario stresses multi-node MoE throughput and component customization, which are SGLang strengths.',
    'vLLM excels at broad model and hardware support. The scenario calls for MoE scale-out and deep customization.',
  ]}
/>

<MultipleChoice
  id="kc_engines_2"
  question="An engineer finds a TensorRT-LLM deployment at version 0.21.0. What does the version number reveal about its architecture?"
  options={[
    'It is a plugin for NVIDIA TensorRT.',
    'It is a standalone PyTorch package with no TensorRT dependency.',
    'It is a backend built for NVIDIA Dynamo.',
    'It is a fork of vLLM.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Major versions starting with zero are V0, a plugin for NVIDIA TensorRT.',
    'The standalone PyTorch-based package is V1, with versions that start with one.',
    'Dynamo can use TensorRT-LLM as a backend, but the version number describes the engine itself.',
    'TensorRT-LLM is NVIDIA\'s own engine, not a fork of vLLM.',
  ]}
/>
