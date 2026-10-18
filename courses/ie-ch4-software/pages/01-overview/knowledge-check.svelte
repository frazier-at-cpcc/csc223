<script module>
  export const pageConfig = { title: 'Knowledge Check: The Software Stack' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Software Stack</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_stack_1"
  question="An engineer adjusts launch flags for a vLLM server so that it splits a model across eight GPUs. At which level of the software stack is the engineer working?"
  options={[
    'CUDA',
    'Deep learning frameworks',
    'Inference engines',
    'NVIDIA Dynamo',
  ]}
  correct={2}
  optionFeedback={[
    'CUDA is the lowest level. The engineer is not writing or selecting GPU kernels.',
    'PyTorch is the framework that vLLM is built on, but the engineer is configuring vLLM itself, not writing PyTorch code.',
    'Correct. vLLM is an inference engine, and configuring its server flags is inference engine work.',
    'Dynamo orchestrates engines across a large deployment. Configuring one vLLM server does not involve Dynamo.',
  ]}
/>

<MultipleChoice
  id="kc_stack_2"
  question="Running a newly released open model on its first day can require nightly or prerelease builds of its dependencies. What explains this requirement?"
  options={[
    'GPU drivers need a reinstall for each new model.',
    'Open models ship with their own proprietary runtime.',
    'Support for new models lands in fast-moving releases.',
    'Stable releases cannot load weights split across files.',
  ]}
  correct={2}
  optionFeedback={[
    'New models do not require a driver reinstall. The support gap is in the higher-level software.',
    'Open models ship weights and configuration, not a proprietary runtime.',
    'Correct. Software iterates quickly, so support for a new model often exists only in the newest builds.',
    'Stable releases load multi-file weights routinely. File count is not the issue.',
  ]}
/>
