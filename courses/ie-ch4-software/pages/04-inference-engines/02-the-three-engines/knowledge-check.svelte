<script module>
  export const pageConfig = { title: 'Knowledge Check: The Three Engines' };
</script>

<script>
  import { FillInTheBlank, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Three Engines</h1>

<p>
  These questions are ungraded. All three practice objective 6: select vLLM,
  SGLang, or TensorRT-LLM by weighing hardware, model support, performance need,
  and engineering effort. In the first two, the constraints pull in different
  directions.
</p>

<MultipleChoice
  id="kc_engines_moe"
  question="A lab serves a large mixture-of-experts model to heavy traffic on a fleet that mixes NVIDIA and AMD GPUs. Throughput is the top priority. The team wants to modify individual engine components and contribute those changes back to a community-run project. Which engine best fits?"
  options={['SGLang', 'TensorRT-LLM', 'vLLM']}
  correct={0}
  optionFeedback={[
    'Correct. The AMD GPUs rule out TensorRT-LLM. Between the two community engines, SGLang adds heavy investment in large-scale MoE throughput and a design built for component-level customization by its community.',
    'TensorRT-LLM offers top performance on NVIDIA GPUs, but it runs on NVIDIA GPUs only. Part of this fleet is AMD, so hardware rules it out first.',
    'vLLM also runs on NVIDIA and AMD GPUs, so it survives the hardware question. Its strength is breadth across models and hardware, which this single-model deployment does not need. SGLang matches the MoE throughput and customization goals more closely.',
  ]}
/>

<MultipleChoice
  id="kc_engines_dayzero"
  question="A team on H100 GPUs wants the best possible long-term performance. A new open model with an unfamiliar architecture was released this morning, and the product launch is tonight. TensorRT-LLM support for the architecture is weeks away. What is the soundest plan?"
  options={[
    'Delay the launch until TensorRT-LLM supports the model',
    'Launch on the transformers sample code, then move to an engine',
    'Launch on vLLM or SGLang, and revisit TensorRT-LLM later',
    'Port the model into TensorRT-LLM by hand before tonight',
  ]}
  correct={2}
  optionFeedback={[
    'Waiting breaks the launch requirement. Model support is a hard constraint today, while peak performance is a goal that can wait.',
    'The reference libraries are not built for production serving. A production engine with day-zero support is available.',
    'Correct. Model support decides the engine for launch night, and the general engines offer day-zero support. Once TensorRT-LLM adds the architecture, the team benchmarks it against the running engine and switches only if the gain justifies the effort.',
    'Porting a new architecture into the hardest engine in one afternoon is not realistic. It spends the most engineering effort for a launch that a general engine already supports.',
  ]}
/>

<FillInTheBlank
  id="kc_engines_version"
  question="A deployment reports TensorRT-LLM version 0.21.0. Which major version is it? Type V0 or V1."
  answers={['V0']}
  correctFeedback="Versions that start with zero are V0, which builds on TensorRT and compiles a TensorRT engine file. Follow V0 documentation for this deployment."
  incorrectFeedback="The major version is the first number. A version that starts with 0 is V0, the TensorRT-based generation. V1 versions start with 1 and are PyTorch-based."
/>
