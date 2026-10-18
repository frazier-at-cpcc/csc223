<script module>
  export const pageConfig = { title: 'Distillation in Practice' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Distillation in Practice</h1>

<p>Distillation sees far less real-world use than fine-tuning.</p>

<h2>How labs build model families</h2>

<p>
  Frontier labs often release a family of models in several sizes.
  Practice varies from lab to lab.
  Some labs train each size independently, so that the biases of the large model do not limit the smaller models.
  Others distill the smaller sizes from a larger member of the family.
  Google trained the 2-billion and 9-billion-parameter Gemma 2 models in 2024 with knowledge distillation from a larger model.
  Meta used the output probabilities of larger Llama 3.1 models when it trained the 1-billion and 3-billion-parameter Llama 3.2 models in 2024.
</p>

<p>When a lab trains only one large model, distillation can make that model more accessible.</p>

<h2>Case study: the DeepSeek-R1 distills</h2>

<p>
  In January 2025, the <Term id="open-model">open model</Term> research lab DeepSeek released DeepSeek-R1, its flagship <Term id="reasoning-model">reasoning model</Term> at the time.
  DeepSeek-R1 has 671 billion parameters.
  Because the model was so large, DeepSeek also released smaller versions built on the most popular open model architectures of the time, Llama 3 and Qwen 2.5.
</p>

<p>
  DeepSeek's report describes how it built them.
  R1 generated about 800,000 training samples, and DeepSeek fine-tuned existing pre-trained Llama and Qwen models on those samples.
  That method is fine-tuning on teacher-generated data.
  The students never saw R1's probability distributions, so the method is not knowledge distillation.
</p>

<ul>
  <li>The smaller models showed reasoning behavior similar to DeepSeek-R1.</li>
  <li>Their <Term id="intelligence-benchmark">intelligence benchmark</Term> scores were lower than those of the full model.</li>
  <li>They were small, and they ran on architectures that already had extensive performance tooling.</li>
</ul>

<Signal kind="mistake" title="Reading every distill as knowledge distillation">
  <p>
    Model releases use the word distill for any small model trained to imitate a larger one.
    The name does not tell you the training signal.
    The DeepSeek-R1 distills, for example, learned from R1's generated text, not from R1's probabilities.
    Read the model card or the technical report to learn which method a release used.
  </p>
</Signal>

<p>
  At the book's publication in 2025, the DeepSeek-R1 distills were among the most popular distilled models on <Term id="hugging-face">Hugging Face</Term>.
  Distills of <Term id="whisper">Whisper</Term> for audio transcription and of some image generation models were also popular.
</p>
