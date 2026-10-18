<script module>
  export const pageConfig = { title: 'Knowledge Check: Embedding Fundamentals' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Embedding Fundamentals</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_embed_fund_1"
  question="A team replaces its embedding model with a newer one that produces vectors of the same length. Queries are now embedded with the new model, but the document index still holds vectors from the old model. What happens to search quality?"
  options={[
    'It degrades, because the two models encode inputs into different semantic spaces',
    'It improves, because the newer model produces better query vectors',
    'It stays the same, because matching vector lengths keep the vectors comparable',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Vectors from different models are not meaningfully comparable, even at the same length. The corpus must be re-embedded.',
    'A better query vector does not help when it lives in a different semantic space from the stored vectors.',
    'Equal length does not make vectors comparable. Each model defines its own semantic space.',
  ]}
/>
