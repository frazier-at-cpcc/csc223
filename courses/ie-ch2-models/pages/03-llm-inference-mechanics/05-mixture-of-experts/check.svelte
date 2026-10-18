<script module>
  export const pageConfig = { title: 'Knowledge Check: Mixture of Experts' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Mixture of Experts</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_moe_1"
  question="A model has 128 experts per layer and 48 layers. Its router activates 8 experts per layer. How many expert activations occur to generate one token?"
  options={['8', '128', '384']}
  correct={2}
  optionFeedback={[
    'Incorrect. 8 is the count for one layer. The router picks experts separately at every layer.',
    'Incorrect. 128 is the number of experts available per layer, not the number activated.',
    'Correct. The router picks 8 experts at each of the 48 layers: 8 × 48 = 384 activations per token.',
  ]}
/>

<MultipleChoice
  id="kc_moe_2"
  question="A team needs a 7-billion-parameter model for code tab completion. Which architecture does the chapter recommend for this case?"
  options={['A dense architecture', 'A Mixture of Experts architecture with many experts', 'A Mixture of Experts architecture with two experts']}
  correct={0}
  optionFeedback={[
    'Correct. Models under 8 billion parameters use dense architectures efficiently, and a domain-specific model is effectively one expert.',
    'Incorrect. MoE pays off mainly for models above 100 billion parameters. A small domain-specific model gains little from it.',
    'Incorrect. Splitting a small domain-specific model into experts adds routing work without a meaningful benefit.',
  ]}
/>
