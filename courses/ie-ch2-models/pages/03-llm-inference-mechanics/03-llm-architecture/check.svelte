<script module>
  export const pageConfig = { title: 'Knowledge Check: LLM Architecture' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: LLM Architecture</h1>

<p>
  These questions are ungraded and practice objective 3, interpreting a model's architecture from its name and
  block structure. Retry them as often as you like.
</p>

<Matching
  id="kc_arch_1"
  question="Match each part of a decoder-only LLM to its role."
  pairs={[
    { left: 'Embedding layer', right: 'Looks up one vector for each token ID' },
    { left: 'Attention sublayer', right: 'Relates each token to the tokens before it' },
    { left: 'Feed-forward sublayer', right: 'Holds most of the weights and applies the activation function' },
    { left: 'Normalization sublayer', right: 'Rescales each hidden state to a stable range' },
    { left: 'LMHead', right: 'Converts the final hidden state into one logit per vocabulary token' },
  ]}
  correctFeedback="The embedding layer and the LMHead sit at the two ends. Each transformer block between them holds normalization, attention, and feed-forward sublayers."
  incorrectFeedback="Trace Figure 2.7 from bottom to top: the embedding layer turns token IDs into vectors, each block normalizes and then applies attention and the feed-forward network, and the LMHead turns the last hidden state into logits."
/>

<MultipleChoice
  id="kc_arch_2"
  question="A team has a highly optimized deployment of Llama 70B Instruct. Which new model can the team deploy while keeping the same kernel and engine support?"
  options={['A LoRA fine-tune of Llama 70B Instruct', 'A masked language model of similar size', 'A Mixture of Experts model of similar size']}
  correct={0}
  optionFeedback={[
    'Correct. LoRA changes behavior, not architecture, so the fine-tune runs on the same kernels and engine configuration.',
    'Incorrect. A masked language model fills in blanks from both directions. It is a different architecture from a causal LLM.',
    'Incorrect. A Mixture of Experts model adds a router and experts, so it is a different architecture from the dense Llama model, even at a similar size.',
  ]}
/>

<MultipleChoice
  id="kc_arch_3"
  question="A config.json file lists the architecture BertForMaskedLM. Which task suits this model?"
  options={[
    'Generating a long chat reply one token at a time',
    'Producing a vector that represents a sentence for search',
    'Transcribing an audio clip into text',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Generation needs a causal language model. A masked language model fills in blanks using context on both sides.',
    'Correct. A masked language model reads the whole input in both directions, which suits understanding tasks such as embeddings for search.',
    'Incorrect. Transcription needs an encoder for the audio and a decoder for the text. BERT is a text-only, encoder-only model.',
  ]}
/>
