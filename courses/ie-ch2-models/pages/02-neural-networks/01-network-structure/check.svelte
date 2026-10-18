<script module>
  export const pageConfig = { title: 'Knowledge Check: Network Structure' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Network Structure</h1>

<p>These questions are ungraded and build the encoder and decoder vocabulary that objective 3 uses to interpret architecture names. Retry them as often as you like.</p>

<Matching
  id="kc_structure_1"
  question="Match each part of a neural network to its description."
  pairs={[
    { left: 'Hidden state', right: 'The output of a hidden layer, which the next layer reads as input' },
    { left: 'Weight', right: 'A learned value that a node multiplies its input by' },
    { left: 'Encoder', right: 'A network that turns raw input into an internal representation' },
    { left: 'Decoder', right: 'A network that generates output from an internal representation' },
  ]}
  correctFeedback="Weights are fixed after training. Hidden states change with every input. Encoders build representations, and decoders generate from them."
  incorrectFeedback="Weights are learned values fixed after training. A hidden state is the output a hidden layer passes forward. An encoder builds an internal representation, and a decoder generates output from one."
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
