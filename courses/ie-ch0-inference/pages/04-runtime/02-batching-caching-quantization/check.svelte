<script module>
  export const pageConfig = { title: 'Knowledge Check: Batching, Caching, and Quantization' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Batching, Caching, and Quantization</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 5: select the model
  performance technique that addresses a described runtime bottleneck.
</p>

<h2>Matching Symptoms to Techniques</h2>

<Matching
  id="kc_tq_match"
  question="Match each symptom to the technique that addresses it."
  pairs={[
    { left: 'The GPU serves one request at a time and stays mostly idle', right: 'Batching' },
    { left: 'Every request begins with the same long system prompt', right: 'Caching' },
    { left: 'The weights need more memory than the GPU provides', right: 'Quantization' },
  ]}
  correctFeedback="Correct. Batching fills idle capacity, caching skips repeated prefill work, and quantization shrinks memory."
  incorrectFeedback="Idle capacity calls for batching. Repeated prefixes call for caching. Weights that exceed memory call for quantization."
/>

<h2>A Model That Does Not Fit</h2>

<MultipleChoice
  id="kc_tq_fit"
  question="A team must serve a model whose FP16 weights need 90 GB on an instance with one 80 GB GPU. The budget covers only this one GPU. Which technique lets the model run on this instance?"
  options={['Batching', 'Caching', 'Parallelism', 'Quantization']}
  correct={3}
  optionFeedback={[
    'Incorrect. Batching shares each forward pass across requests. The weights still need 90 GB.',
    'Incorrect. Caching reuses keys and values for shared prefixes. It does not change how the weights are stored.',
    'Incorrect. Parallelism spreads the same weights across more GPUs. It does not reduce the bytes the weights occupy, and the team cannot add a GPU.',
    'Correct. Storing the weights in FP8 halves them to about 45 GB, which fits on the 80 GB GPU with room for the KV cache.',
  ]}
/>
