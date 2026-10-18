<script module>
  export const pageConfig = { title: 'Training and Inference' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Training and Inference</h1>

<p>A <Term id="generative-ai">generative AI</Term> model passes through two phases in its lifecycle.</p>

<dl>
  <dt><dfn><strong>Training</strong></dfn></dt>
  <dd>The process of learning model <Term id="weights">weights</Term> from data.</dd>
  <dt><dfn><strong>Inference</strong></dfn></dt>
  <dd>Running a trained model on new inputs to produce outputs. In production, inference means serving the model to users.</dd>
</dl>

<p>
  Training produces the weights. Inference puts those weights to work. Every request a user sends to a chatbot, a
  transcription service, or an image generator is an inference request. This book concerns inference for generative AI
  models, the models that produce text, images, audio, and video.
</p>

<h2>The Machine Learning Lifecycle</h2>

<p>
  The machine learning (ML) boom of the previous decade made this two-phase lifecycle familiar. Hundreds of thousands of
  data scientists and ML engineers learned to train models and then serve them.
</p>

<p>
  An <dfn><strong>inference engineer</strong></dfn> works on the second phase. An inference engineer takes a model whose
  weights already exist and makes it fast, reliable, and affordable to serve at scale.
</p>
