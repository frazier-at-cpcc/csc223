<script module>
  export const pageConfig = { title: 'Internal Representations' };
</script>

<h1>Internal Representations</h1>

<p>
  Hidden states are one kind of <strong>internal representation</strong>: the form data takes inside a
  neural network. A key property of an internal representation is its
  <strong>dimensionality</strong>, the actual size of the vectors used.
</p>

<h2>Dimensionality for text and images</h2>

<ul>
  <li>
    Text representations increase dimensionality. A model encodes a chunk of text into a vector of
    hundreds or thousands of numbers to capture its semantic meaning.
  </li>
  <li>
    Image representations reduce dimensionality. A model compresses millions of pixels down to a
    manageable size.
  </li>
</ul>

<h2>Encoders and decoders</h2>

<p>Some neural networks create internal representations, and others use them.</p>

<ul>
  <li><strong>Encoder:</strong> a network that takes an input such as text or an image and creates an internal representation that adds information and semantic meaning.</li>
  <li><strong>Decoder:</strong> a network that uses the internal representation to generate an output such as text or an image.</li>
</ul>

<p>
  Neural networks are composable. Engineers combine several networks into a single model, or run them
  in sequence as a pipeline. Three common combinations appear in production models:
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Encoder and decoder combinations</caption>
    <thead>
      <tr><th scope="col">Architecture</th><th scope="col">How common it is</th><th scope="col">Example</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Decoder-only</th><td>Standard for modern LLMs</td><td>Generative LLMs</td></tr>
      <tr><th scope="row">Encoder-only</th><td>Somewhat rare today</td><td>Older text embedding models in the BERT family</td></tr>
      <tr><th scope="row">Encoder-decoder</th><td>Common in other modalities</td><td>Whisper, which encodes audio input and decodes text tokens</td></tr>
    </tbody>
  </table>
</div>
