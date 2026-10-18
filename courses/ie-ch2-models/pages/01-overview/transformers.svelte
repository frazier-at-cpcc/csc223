<script module>
  export const pageConfig = { title: 'From Neural Networks to Transformers' };
</script>

<h1>From Neural Networks to Transformers</h1>

<p>
  Generative AI models are compositions of large, complex neural networks. The research behind them
  spans roughly seven decades.
</p>

<h2>A short history</h2>

<ul>
  <li>In the 1950s, researchers implemented the first perceptrons in hardware for simple binary classification.</li>
  <li>Perceptrons fell out of favor and were later reinvented as multi-layer perceptrons. Back-propagation introduced hidden states between layers and a procedure that repeatedly adjusts the weights in the network.</li>
  <li>In the 2000s, research began into deep neural networks with dozens of layers.</li>
  <li>In 2012, AlexNet showed real-world capability from a deep network and demonstrated that GPUs are effective for deep learning. Word embedding models for text and Generative Adversarial Networks (GANs) for images followed.</li>
  <li>In 2017, Vaswani and colleagues published "Attention Is All You Need," which introduced the transformer.</li>
</ul>

<p>
  A <strong>transformer</strong> is a neural network with an attention mechanism that learns
  relationships between the parts of a sequence. Transformers are the foundation of generative AI.
  They power every modality, from embeddings to voice to image and video generation.
</p>

<h2>Two styles of generation</h2>

<p>Transformer-based models generate output in one of two styles.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The two generation styles covered in this chapter</caption>
    <thead>
      <tr><th scope="col">Style</th><th scope="col">Starting point</th><th scope="col">Process</th><th scope="col">Example models</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Autoregressive token generation</th>
        <td>A tokenized sequence</td>
        <td>Predict the most likely next token, append it, and repeat.</td>
        <td>LLMs</td>
      </tr>
      <tr>
        <th scope="row">Iterative denoising</th>
        <td>Random noise</td>
        <td>Refine the noise toward the most likely output over many steps. This process is called diffusion.</td>
        <td>Image and video generation models</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  This chapter examines the architecture of LLMs first and then the architecture of image generation
  models. The distinction between the two styles returns throughout the chapter, because each style
  stresses GPU hardware differently.
</p>
