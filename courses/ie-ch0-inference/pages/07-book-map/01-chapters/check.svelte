<script module>
  export const pageConfig = { title: 'Knowledge Check: Chapters and Layers' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Chapters and Layers</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 9: identify the
  chapter of the book that addresses a given inference engineering topic.
</p>

<h2>Topics and Chapters</h2>

<Matching
  id="kc_map_match"
  question="Match each task to the chapter that covers it."
  pairs={[
    { left: 'Setting a latency budget for a new feature', right: 'Chapter 1, Prerequisites' },
    { left: 'Finding where a model architecture is bottlenecked', right: 'Chapter 2, Models' },
    { left: 'Choosing between vLLM and SGLang', right: 'Chapter 4, Software' },
    { left: 'Serving a speech synthesis model', right: 'Chapter 6, Modalities' },
    { left: 'Configuring autoscaling for production traffic', right: 'Chapter 7, Production' },
  ]}
  correctFeedback="Correct. Requirements come first in Chapter 1, the runtime fills Chapters 2 to 5, modalities are Chapter 6, and operations are Chapter 7."
  incorrectFeedback="Use the layer column of the chapter table. Budgets are prerequisites, bottlenecks are models, engines are software, speech is a modality, and autoscaling is production."
/>

<h2>Finding a Chapter</h2>

<MultipleChoice
  id="kc_map_gpu"
  question="An engineer wants to compare NVIDIA datacenter GPU generations and their memory specifications before buying capacity. Which chapter covers this topic?"
  options={['Chapter 2, Models', 'Chapter 3, Hardware', 'Chapter 4, Software', 'Chapter 7, Production']}
  correct={1}
  optionFeedback={[
    'Incorrect. Chapter 2 covers model architectures and bottlenecks, not GPU specifications.',
    'Correct. Chapter 3 starts at the GPU spec sheet and covers compute, memory, and datacenter GPU generations.',
    'Incorrect. Chapter 4 covers the software stack that runs on the GPU, from CUDA to inference engines.',
    'Incorrect. Chapter 7 covers operating production infrastructure and applications, not GPU selection.',
  ]}
/>
