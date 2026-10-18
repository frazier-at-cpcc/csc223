<script module>
  export const pageConfig = { title: 'Techniques Across Modalities' };
</script>

<h1>Techniques Across Modalities</h1>

<p>
  The six model performance techniques apply to models of all modalities, not only to large language models (LLMs). A
  <dfn><strong>modality</strong></dfn> is the kind of data a model takes in or produces, such as text, images, audio, or
  video.
</p>

<h2>Modalities in this book</h2>

<ul>
  <li>Vision language models</li>
  <li>Embedding models</li>
  <li>Automatic speech recognition (ASR)</li>
  <li>Speech synthesis</li>
  <li>Image generation</li>
  <li>Video generation</li>
</ul>

<p>
  Each modality extends what AI systems can do. Each also needs its own inference optimizations on top of the shared
  techniques. Chapter 6 covers these modalities.
</p>

<h2>Summary of the six techniques</h2>

<table>
  <caption>Model performance techniques and what each one does</caption>
  <thead>
    <tr>
      <th scope="col">Technique</th>
      <th scope="col">What it does</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Batching</th><td>Interleaves requests token by token to increase throughput.</td></tr>
    <tr><th scope="row">Caching</th><td>Reuses the KV cache between requests that share a prefix.</td></tr>
    <tr><th scope="row">Quantization</th><td>Lowers the precision of select model pieces to gain compute and save memory.</td></tr>
    <tr><th scope="row">Speculation</th><td>Drafts and verifies tokens to emit more than one token per forward pass.</td></tr>
    <tr><th scope="row">Parallelism</th><td>Spreads a large model across several GPUs without new bottlenecks.</td></tr>
    <tr><th scope="row">Disaggregation</th><td>Runs prefill and decode on independently scaling workers.</td></tr>
  </tbody>
</table>
