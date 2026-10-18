<script module>
  export const pageConfig = { title: 'Applying LLM Techniques to VLMs' };
</script>

<h1>Applying LLM Techniques to VLMs</h1>

<p>
  Every technique from Chapter 5 helps with the longer sequences that images create. The table maps
  each technique to the VLM problem it addresses.
</p>

<div class="table-wrap">
  <table>
    <caption>Chapter 5 techniques applied to vision language models</caption>
    <thead>
      <tr><th scope="col">Technique</th><th scope="col">How it helps a VLM</th></tr>
    </thead>
    <tbody>
      <tr><td>Quantization</td><td>KV cache quantization reduces the memory bandwidth and storage cost of longer sequences.</td></tr>
      <tr><td>Speculation</td><td>VLM decode matches LLM decode, so speculative decoding, especially EAGLE, accelerates it.</td></tr>
      <tr><td>Prefix caching</td><td>The KV cache for an image is reused across turns of a chat and across repeated queries about the same image.</td></tr>
      <tr><td>Parallelism</td><td>Tensor Parallelism gives fast inference and more combined VRAM for large models and long contexts.</td></tr>
      <tr><td>Disaggregation</td><td>Prefill moves to specialized, independently scaling workers that absorb long image-heavy sequences.</td></tr>
    </tbody>
  </table>
</div>

<div class="worked">
  <p>
    <strong>Example.</strong> A support assistant lets a customer upload one photo of a damaged part and
    then ask several follow-up questions about it. Prefix caching stores the KV cache for the photo
    after the first turn. Later turns skip the 1,000-token prefill for that photo.
  </p>
</div>
