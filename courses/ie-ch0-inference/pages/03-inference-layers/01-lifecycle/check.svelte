<script module>
  export const pageConfig = { title: 'Knowledge Check: The Model Lifecycle' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Model Lifecycle</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 3: explain why serving
  generative AI models is harder than serving classic machine learning models.
</p>

<h2>Classic or Generative Inference</h2>

<Sorting
  id="kc_life_sort"
  question="Sort each description into the kind of inference it describes."
  items={[
    'A fraud score returned from one computation',
    'A model of a few megabytes that runs on a CPU',
    'A fixed set of input values in every request',
    'Hundreds of forward passes for one response',
    'Prompts that range from ten tokens to a hundred thousand',
    'Weights larger than the memory of one GPU',
  ]}
  targets={['Classic ML inference', 'Generative AI inference']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="Correct. Classic models are small, fixed-size, and single-step. Generative models are large, variable, and sequential."
  incorrectFeedback="Classic ML inference runs one small computation on a fixed input. Generative AI inference runs many forward passes over inputs of varying length with weights that can exceed one GPU."
/>

<h2>Diagnosing a Failed Deployment</h2>

<MultipleChoice
  id="kc_life_why"
  question="A team replaces an XGBoost fraud model with a 70-billion-parameter LLM. Its first plan loads the model in FP16 onto one GPU with 80 GB of VRAM, and the deployment fails before it serves a single request. Which property of generative AI inference explains the failure?"
  options={[
    'Long answers need many sequential decode passes',
    'Request lengths vary widely from prompt to prompt',
    'The weights are larger than the memory of one GPU',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Sequential generation makes long answers slow, but this deployment failed before any request arrived.',
    'Incorrect. Variable lengths complicate batching and capacity planning. They do not stop a model from loading.',
    'Correct. 70 billion parameters × 2 bytes = 140 GB, which cannot load into 80 GB of VRAM.',
  ]}
/>
