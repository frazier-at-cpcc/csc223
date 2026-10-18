<script module>
  export const pageConfig = { title: 'Applying LLM Techniques to VLMs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Applying LLM Techniques to VLMs</h1>

<p>
  Every technique from Chapter 5 helps with the longer sequences that images create. The table maps
  each technique to the VLM problem it addresses. Choose a technique by first naming the symptom: a
  slow first token points to prefill, slow streaming points to decode, and memory pressure points to the
  KV cache.
</p>

<div class="table-wrap" role="region" aria-label="Chapter 5 techniques applied to vision language models" use:scrollable>
  <table>
    <caption>Chapter 5 techniques applied to vision language models</caption>
    <thead>
      <tr><th scope="col">Technique</th><th scope="col">VLM problem it addresses</th><th scope="col">How it helps</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><Term id="kv-cache-quantization">KV cache quantization</Term></td>
        <td>Memory pressure</td>
        <td>Lower-precision keys and values cut the memory bandwidth and storage cost of longer sequences.</td>
      </tr>
      <tr>
        <td><Term id="speculative-decoding">Speculative decoding</Term></td>
        <td>Slow decode</td>
        <td>VLM decode matches LLM decode, so speculation, especially <Term id="eagle">EAGLE</Term>, accelerates it.</td>
      </tr>
      <tr>
        <td><Term id="prefix-caching">Prefix caching</Term></td>
        <td>Slow first token on repeated images</td>
        <td>The KV cache for an image is reused across turns of a chat and across repeated queries about the same image.</td>
      </tr>
      <tr>
        <td><Term id="tensor-parallelism">Tensor Parallelism</Term></td>
        <td>Large model or long context</td>
        <td>Splitting the model across GPUs gives fast inference and more combined VRAM.</td>
      </tr>
      <tr>
        <td><Term id="disaggregation">Disaggregation</Term></td>
        <td>Image-heavy prefill slowing decode</td>
        <td>Prefill moves to specialized, independently scaled workers that absorb long image-heavy sequences.</td>
      </tr>
    </tbody>
  </table>
</div>

<Signal kind="worked" title="Repeated questions about one photo">
  <p>
    A support assistant lets a customer upload one photo of a damaged part and then ask several follow-up
    questions about it.
  </p>
  <ol>
    <li>Symptom: every turn waits for the photo's 1,000 visual tokens to prefill again.</li>
    <li>Problem type: repeated prefill of the same image.</li>
    <li>Technique: prefix caching stores the KV cache for the photo after the first turn.</li>
    <li>Result: later turns skip the photo's prefill, and their time to first token falls.</li>
  </ol>
</Signal>
