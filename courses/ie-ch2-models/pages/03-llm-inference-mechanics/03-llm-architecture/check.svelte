<script module>
  export const pageConfig = { title: 'Knowledge Check: LLM Architecture' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: LLM Architecture</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_arch_1"
  question="A team has a highly optimized deployment of Llama 70B Instruct. Which new model can the team deploy while keeping the same architecture-level optimizations?"
  options={['A LoRA fine-tune of Llama 70B Instruct', 'A masked language model of similar size', 'A Mixture of Experts model of similar size']}
  correct={0}
  optionFeedback={[
    'Correct. LoRA changes behavior, not architecture, so the fine-tune shares the architecture of the deployed model.',
    'Incorrect. A masked language model fills in blanks from both directions. It is a different kind of model from a causal LLM.',
    'Incorrect. A Mixture of Experts model uses a different architecture from the dense Llama model, even at a similar size.',
  ]}
/>

<MultipleChoice
  id="kc_arch_2"
  question="Which sublayers hold the majority of the trainable weights in an LLM?"
  options={['The attention sublayers', 'The feed-forward linear sublayers', 'The normalization sublayers']}
  correct={1}
  optionFeedback={[
    'Incorrect. Attention sublayers are the second-largest component by weight. Attention is the more complex operation, but it holds fewer weights.',
    'Correct. The feed-forward network is a multi-layer perceptron, and its linear sublayers hold most of the weights.',
    'Incorrect. Normalization is a rounding error in the model size.',
  ]}
/>
