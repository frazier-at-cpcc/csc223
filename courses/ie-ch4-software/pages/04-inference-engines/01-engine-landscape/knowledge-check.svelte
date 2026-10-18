<script module>
  export const pageConfig = { title: 'Knowledge Check: The Engine Landscape' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Engine Landscape</h1>

<p>
  These questions are ungraded. Both practice objective 6: select vLLM, SGLang,
  or TensorRT-LLM by weighing hardware, model support, performance need, and
  engineering effort. Here you weigh one constraint at a time. The next lesson
  combines constraints that pull in different directions.
</p>

<Sorting
  id="kc_landscape_sort"
  question="Sort each deployment constraint by the engines it favors when it is the only constraint."
  items={[
    'The fleet includes AMD GPUs',
    'The model architecture was released yesterday',
    'The team has no time to learn a complex engine',
    'Every percent of throughput matters for a mature model on NVIDIA Blackwell GPUs',
    'The team plans to serve through NVIDIA Dynamo and wants the deepest integration',
  ]}
  targets={['Favors vLLM or SGLang', 'Favors TensorRT-LLM']}
  correct={[0, 0, 0, 1, 1]}
  correctFeedback="Hardware breadth, day-zero model support, and ease of use favor the general engines. Peak performance on NVIDIA hardware and Dynamo integration favor TensorRT-LLM."
  incorrectFeedback="Use the comparison table. vLLM and SGLang are broad and easy. TensorRT-LLM is narrow, NVIDIA-only, harder to use, and fastest on the hardware it targets."
/>

<MultipleChoice
  id="kc_landscape_principle"
  question="TensorRT-LLM achieves the best performance of the three engines. Which principle of inference engineering explains this result?"
  options={[
    'Broader model support produces better performance.',
    'More constraints allow better performance.',
    'Open-source licenses produce faster kernels.',
    'Simpler interfaces produce faster engines.',
  ]}
  correct={1}
  optionFeedback={[
    'Broad support is the strength of vLLM, and it works against peak performance.',
    'Correct. TensorRT-LLM narrows its scope to NVIDIA hardware and well-supported models, which lets it specialize.',
    'All three engines use the Apache 2.0 license, so licensing cannot explain the difference.',
    'TensorRT-LLM has the hardest interface of the three and still performs best.',
  ]}
/>
