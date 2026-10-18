<script module>
  export const pageConfig = { title: 'A Catalog of Modalities' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>A Catalog of Modalities</h1>

<p>
  <Term id="generative-ai">Generative AI</Term> models cover a wide range of input and output types. The table lists the common
  combinations and the category name for each. This chapter covers six of them in depth: vision
  language, embedding, transcription, speech synthesis, image generation, and video generation.
</p>

<div class="table-wrap" role="region" aria-label="Common generative AI modalities by input, output, and category" use:scrollable>
  <table>
    <caption>Common generative AI modalities by input, output, and category</caption>
    <thead>
      <tr><th scope="col">Input</th><th scope="col">Output</th><th scope="col">Category</th></tr>
    </thead>
    <tbody>
      <tr><td>Text and image or video</td><td>Text</td><td>Vision language</td></tr>
      <tr><td>Text or image or video</td><td>Vector</td><td>Embedding</td></tr>
      <tr><td>Audio (voice)</td><td>Text</td><td>Transcription</td></tr>
      <tr><td>Text</td><td>Audio (voice)</td><td>Speech synthesis</td></tr>
      <tr><td>Text</td><td>Audio (music)</td><td>Music generation</td></tr>
      <tr><td>Audio (voice)</td><td>Audio (voice)</td><td>Speech-to-speech</td></tr>
      <tr><td>Text, image, or both</td><td>3D model</td><td>Generative CAD</td></tr>
      <tr><td>Text, image, or both</td><td>Image or video</td><td>Image and video generation</td></tr>
      <tr><td>Image or video</td><td>Text</td><td>Captioning</td></tr>
      <tr><td>Image or video</td><td>Mask</td><td>Segmentation</td></tr>
      <tr><td>Text and image</td><td>Image</td><td>Image editing</td></tr>
    </tbody>
  </table>
</div>

<p>
  Read each row as a contract. The input column tells you what the serving system must accept and
  preprocess. The output column tells you what the user waits for, and therefore what latency
  means for that product.
</p>
