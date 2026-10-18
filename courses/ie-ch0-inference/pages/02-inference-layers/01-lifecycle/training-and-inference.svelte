<script module>
  export const pageConfig = { title: 'Training and Inference' };
</script>

<h1>Training and Inference</h1>

<p>A generative AI model passes through two phases in its lifecycle.</p>

<dl>
  <dt><dfn><strong>Training</strong></dfn></dt>
  <dd>The process of learning model weights from data.</dd>
  <dt><dfn><strong>Inference</strong></dfn></dt>
  <dd>Serving generative AI models in production.</dd>
</dl>

<p>
  Training produces the weights. Inference puts those weights to work. Every request a user sends to a chatbot, a
  transcription service, or an image generator is an inference request.
</p>

<h2>A familiar lifecycle</h2>

<p>
  The machine learning (ML) boom of the previous decade made this lifecycle familiar. Hundreds of thousands of data
  scientists and ML engineers learned to train models and then serve them.
</p>

<p>
  This book concerns the second phase. An <strong>inference engineer</strong> takes a model whose weights already exist
  and makes it fast, reliable, and affordable to serve at scale.
</p>
