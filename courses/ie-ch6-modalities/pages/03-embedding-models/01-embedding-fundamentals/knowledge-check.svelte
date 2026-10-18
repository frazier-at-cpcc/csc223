<script module>
  export const pageConfig = { title: 'Knowledge Check: Embedding Fundamentals' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Embedding Fundamentals</h1>

<p>
  This check is ungraded. Both items practice objective 4: select an embedding deployment design that
  fits a workload's traffic profile.
</p>

<Sorting
  id="kc_embed_profile"
  question="Sort each embedding workload into its traffic profile."
  items={[
    'Re-embedding 40 million help-center articles after a model upgrade',
    "Embedding a shopper's search query while the results page loads",
    'Embedding the nightly export of new catalog products',
    'Retrieving context for each turn of a RAG chatbot',
    'Scoring a pretraining corpus for a data-quality filter',
    'Finding similar items for a recommendation panel on page load',
  ]}
  targets={['High-throughput backfill', 'Low-latency lookup']}
  correct={[0, 1, 0, 1, 0, 1]}
  correctFeedback="Ask whether a user is waiting on the result. Bulk jobs with no one waiting are backfills, and anything on a user's critical path is a lookup."
  incorrectFeedback="A backfill is a bulk job judged by total throughput: re-embedding a corpus, a nightly catalog export, or pretraining data. A lookup sits on a user's critical path: a search query, a RAG retrieval step, or a recommendation on page load."
/>

<MultipleChoice
  id="kc_embed_matryoshka"
  question="A team's vector index has grown expensive to store and slow to search. Its embedding model produces 1,024-value Matryoshka vectors. Which change cuts storage and retrieval time with the least quality loss and no change of model?"
  options={[
    'Store only the leading 256 of the 1,024 values in each vector',
    'Quantize the embedding model weights to FP8 to speed up inference',
    'Switch to a smaller embedding model that outputs shorter vectors',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Matryoshka vectors put the most meaning in the leading values, so a shorter vector keeps most of the quality while cutting storage and similarity computation.',
    'FP8 weights speed up the model, but the vectors keep all 1,024 values. Storage and search time do not change.',
    'A new model encodes a different semantic space, so the whole corpus must be re-embedded, and a smaller model usually loses quality.',
  ]}
/>
