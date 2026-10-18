<script module>
  export const pageConfig = { title: 'Knowledge Check: Network Structure' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Network Structure</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_structure_1"
  question="In a neural network, the outputs of the hidden layers are passed forward as input to the next layer. What are these outputs called?"
  options={['Biases', 'Hidden states', 'Logits', 'Weights']}
  correct={1}
  optionFeedback={[
    'Incorrect. A bias is a value a node adds during its calculation. It is a parameter, not a layer output.',
    'Correct. The output of each hidden layer is a hidden state, which the next layer reads as input.',
    'Incorrect. Logits are the output of the final layer of an LLM, one per vocabulary token. They are not passed between hidden layers.',
    'Incorrect. Weights are values set during training that a node multiplies its input by. They are not outputs.',
  ]}
/>

<MultipleChoice
  id="kc_structure_2"
  question="An audio transcription model first converts an audio clip into an internal representation and then generates text tokens from that representation. Which architecture does this model use?"
  options={['Decoder-only', 'Encoder-decoder', 'Encoder-only']}
  correct={1}
  optionFeedback={[
    'Incorrect. A decoder-only model, such as a modern LLM, has no separate stage that encodes a non-text input.',
    'Correct. An encoder creates the internal representation of the audio, and a decoder generates text from it. Whisper works this way.',
    'Incorrect. An encoder-only model, such as a BERT-family embedding model, produces a representation but does not generate tokens.',
  ]}
/>
