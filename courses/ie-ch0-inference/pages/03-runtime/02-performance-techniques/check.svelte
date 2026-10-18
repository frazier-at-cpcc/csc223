<script module>
  export const pageConfig = { title: 'Knowledge Check: Model Performance Techniques' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Model Performance Techniques</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_techniques_1"
  question="A model stored in FP16 needs more GPU memory than one instance provides. The team wants to shrink its memory footprint on that same instance by storing selected weights in FP8. Which technique is the team applying?"
  options={['Caching', 'Disaggregation', 'Parallelism', 'Quantization']}
  correct={3}
  optionFeedback={[
    'Incorrect. Caching reuses attention results between requests. It does not change how weights are stored.',
    'Incorrect. Disaggregation splits prefill and decode onto separate workers. It does not reduce the size of the weights.',
    'Incorrect. Parallelism spreads the model across more GPUs. This team is shrinking the model on the same instance.',
    'Correct. Quantization lowers the precision of select pieces of the model, which reduces its memory burden.',
  ]}
/>

<MultipleChoice
  id="kc_techniques_2"
  question="In Figure 0.2, the model accepts the draft tokens 'tel' and 'le' and rejects 'vis'. What happens to the draft token 'ion'?"
  options={[
    'The model accepts it in place of the rejected token.',
    'The model discards it along with the rejected token.',
    'The model verifies it again in the next forward pass.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A draft that follows a rejected token cannot be accepted. The model generates its own token instead.',
    'Correct. Every draft after the first rejection is discarded. The model then generates its own token, "scope".',
    'Incorrect. The step does not carry "ion" forward. The model discards it and generates "scope" instead.',
  ]}
/>
