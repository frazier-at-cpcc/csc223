<script module>
  export const pageConfig = { title: 'Distillation in Practice' };
</script>

<h1>Distillation in Practice</h1>

<p>Distillation sees far less real-world use than fine-tuning.</p>

<h2>Model families are usually trained independently</h2>

<p>
  Frontier labs often release a family of models in several sizes.
  The smaller models in a family are usually not distilled from the largest one.
  Labs train each size independently, so the biases of the large model do not limit the smaller models.
</p>
<p>When a lab trains only one large model, distillation can make that model more accessible.</p>

<h2>Case study: DeepSeek-R1 distills</h2>

<p>
  In January 2025, the open model research lab DeepSeek released DeepSeek-R1, its flagship reasoning model at the time.
  DeepSeek-R1 has 671 billion parameters.
  Because the model was so large, DeepSeek also released distilled versions built on the most popular open model architectures of the time, Llama 3 and Qwen 2.5.
</p>

<ul>
  <li>The distilled models showed reasoning behavior similar to DeepSeek-R1.</li>
  <li>Their intelligence benchmark scores were lower than those of the full model.</li>
  <li>They were small, and they ran on architectures that already had extensive performance tooling.</li>
</ul>

<p>
  At the book's publication, the DeepSeek-R1 distills were still among the most popular distilled models on Hugging Face.
  Distills of Whisper for audio transcription and of some image generation models are also popular.
</p>
