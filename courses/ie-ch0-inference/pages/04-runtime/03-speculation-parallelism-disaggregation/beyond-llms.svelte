<script module>
  export const pageConfig = { title: 'Techniques Across Modalities' };
</script>

<script>
  import ScrollTable from '../../../components/ScrollTable.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Techniques Across Modalities</h1>

<p>
  The six model performance techniques apply to models of all modalities, not only to large language models. A
  <dfn><strong>modality</strong></dfn> is the kind of data a model takes in or produces, such as text, images, audio, or
  video.
</p>

<h2>Modalities in This Book</h2>

<ul>
  <li><Term id="vlm">Vision language models</Term></li>
  <li><Term id="embedding-model">Embedding models</Term></li>
  <li><Term id="asr">Automatic speech recognition (ASR)</Term></li>
  <li>Speech synthesis</li>
  <li>Image generation</li>
  <li>Video generation</li>
</ul>

<p>
  Each modality extends what AI systems can do. Each also needs its own inference optimizations on top of the shared
  techniques. Chapter 6 covers these modalities.
</p>

<h2>Summary of the Six Techniques</h2>

<ScrollTable label="Model performance techniques, what each one does, and the bottleneck it addresses">
<table>
  <caption>Model performance techniques, what each one does, and the bottleneck it addresses</caption>
  <thead>
    <tr>
      <th scope="col">Technique</th>
      <th scope="col">What it does</th>
      <th scope="col">Bottleneck it addresses</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Batching</th>
      <td>Interleaves requests token by token so one read of the weights serves many users.</td>
      <td>An underused GPU and low total throughput</td>
    </tr>
    <tr>
      <th scope="row">Caching</th>
      <td>Reuses stored keys and values for a prefix that requests share.</td>
      <td>High time to first token from long, repeated prefixes</td>
    </tr>
    <tr>
      <th scope="row">Quantization</th>
      <td>Lowers the precision of select model pieces to gain compute and save memory.</td>
      <td>A model that does not fit, or decode that moves too many bytes</td>
    </tr>
    <tr>
      <th scope="row">Speculation</th>
      <td>Drafts tokens and verifies them in one pass, which can emit more than one token per pass.</td>
      <td>Slow decode for each user on predictable text</td>
    </tr>
    <tr>
      <th scope="row">Parallelism</th>
      <td>Spreads one model across several GPUs without new bottlenecks.</td>
      <td>A model too large or too slow for one GPU</td>
    </tr>
    <tr>
      <th scope="row">Disaggregation</th>
      <td>Runs prefill and decode on independently scaling workers.</td>
      <td>Interference between phases and uneven prefill and decode demand</td>
    </tr>
  </tbody>
</table>
</ScrollTable>
