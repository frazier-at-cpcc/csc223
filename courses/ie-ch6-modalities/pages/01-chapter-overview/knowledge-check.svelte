<script module>
  export const pageConfig = { title: 'Knowledge Check: Modalities and Archetypes' };
</script>

<script>
  import { Matching, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Modalities and Archetypes</h1>

<p>
  This check is ungraded. Both items practice objective 1: classify a model by its input modality,
  output modality, and archetype.
</p>

<Matching
  id="kc_overview_category"
  question="Match each product feature to the category of model that serves it."
  pairs={[
    { left: 'Reads a recorded voice memo and returns written notes', right: 'Transcription (ASR)' },
    { left: 'Turns a support article into a fixed-length list of numbers for search', right: 'Embedding' },
    { left: 'Answers a typed question about an uploaded chart', right: 'Vision language' },
    { left: 'Reads a chatbot reply aloud', right: 'Speech synthesis (TTS)' },
    { left: 'Renders a five-second product clip from a text prompt', right: 'Video generation' },
  ]}
  correctFeedback="Read each feature as a contract: the input type and the output type together name the category."
  incorrectFeedback="Identify the input and the output first. Audio in and text out is transcription. Text in and a vector out is embedding. Image and text in, text out is vision language. Text in and audio out is speech synthesis. Text in and video out is video generation."
/>

<Sorting
  id="kc_overview_archetype"
  question="Sort each model by how it produces its output."
  items={[
    'Whisper transcribing a meeting recording',
    'Orpheus TTS reading a reply aloud',
    'A diffusion transformer rendering a product photo',
    'A video model generating a four-second clip',
    'A BERT-style model embedding a search query',
  ]}
  targets={['Autoregressive token generation', 'Iterative denoising', 'One forward pass to a single vector']}
  correct={[0, 0, 1, 1, 2]}
  correctFeedback="Whisper's decoder and TTS models generate tokens one at a time. Image and video models refine noise over many steps. Embedding models read the whole input once and return one vector."
  incorrectFeedback="Whisper and TTS models are transformer decoders that generate tokens one at a time. Image and video generation models refine random noise over many denoising steps. An embedding model reads its input in one pass and outputs a single vector."
/>
