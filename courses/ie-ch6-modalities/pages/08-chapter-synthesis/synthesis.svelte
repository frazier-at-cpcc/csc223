<script module>
  export const pageConfig = { title: 'Comparing the Six Modalities' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Matching } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Comparing the Six Modalities</h1>

<p>
  The overview promised that each modality changes three things: the model architecture, the bottleneck
  that limits performance, and the metrics that describe a good user experience. Before you read the
  comparison table, retrieve the bottlenecks from memory.
</p>

<Matching
  id="synth_bottleneck"
  question="Match each modality to the bottleneck that shapes its optimization."
  pairs={[
    { left: 'Vision language model', right: 'Prefill and KV cache growth from thousands of visual tokens' },
    { left: 'Embedding model', right: 'Total throughput for backfills, or per-query latency for lookups' },
    { left: 'Speech recognition (Whisper)', right: 'The autoregressive decoder, which runs once per text token' },
    { left: 'Text-to-speech', right: 'Aggregate GPU throughput measured in real-time streams' },
    { left: 'Video generation', right: 'Attention compute over a three-dimensional latent' },
  ]}
  correctFeedback="Compare your answers with the bottleneck column of the table below."
  incorrectFeedback="Use the table below to check each pair, then retry. Each bottleneck follows from the architecture in the same row."
/>

<Signal kind="summary" title="Architecture, bottleneck, metric, and optimizations">
  <p>
    Read each row from left to right. The architecture sets the bottleneck, the bottleneck tells you which
    metric will move, and the optimizations attack that bottleneck.
  </p>
  <div class="table-wrap" role="region" aria-label="The six modalities on the chapter's three axes, with their main optimizations" use:scrollable>
    <table class="wide">
      <caption>The six modalities on the chapter's three axes, with their main optimizations</caption>
      <thead>
        <tr>
          <th scope="col">Modality</th>
          <th scope="col">Architecture</th>
          <th scope="col">Bottleneck</th>
          <th scope="col">Key metric</th>
          <th scope="col">Main optimizations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Vision language</th>
          <td>Small vision encoder feeding an autoregressive LLM</td>
          <td>Long input sequence: about 1,000 visual tokens per high-resolution image inflate prefill and the KV cache</td>
          <td>TTFT, which grows with each image or video frame</td>
          <td>Downsampling, prefix caching, KV cache quantization, disaggregation; speculation for decode</td>
        </tr>
        <tr>
          <th scope="row">Embedding</th>
          <td>BERT-style encoder or LLM backbone; one pass to one vector</td>
          <td>Throughput for backfills; latency for lookups</td>
          <td>Total throughput or request latency; cosine similarity of at least 99 percent after quantization</td>
          <td>Separate systems per traffic profile, parallel tokenizer, FP8 weights, single-GPU replicas, large batches, a queue</td>
        </tr>
        <tr>
          <th scope="row">Speech recognition</th>
          <td>Whisper encoder-decoder; the decoder is autoregressive</td>
          <td>The decoder, which runs once per output token</td>
          <td>Round-trip time per chunk, about 200 ms, for live audio; real-time factor for long files</td>
          <td>TensorRT-LLM with in-flight batching on MIG slices; WebSocket streaming with VAD; parallel chunks with hallucination repair</td>
        </tr>
        <tr>
          <th scope="row">Text-to-speech</th>
          <td>LLM backbone that emits audio tokens, plus a separate audio decoder</td>
          <td>Aggregate GPU throughput against an 80 to 100 token-per-second real-time threshold; the audio decoder</td>
          <td>TTFB, time to first sentence, and real-time streams per GPU</td>
          <td>FP8 weights and KV cache, compiled decoder with dynamic batching, WebSocket streaming, batch size matched to stream count</td>
        </tr>
        <tr>
          <th scope="row">Image generation</th>
          <td>Iterative denoiser pipeline in a two-dimensional latent space</td>
          <td>Compute: forward passes times the arithmetic in each pass</td>
          <td>End-to-end time per image, which grows with steps and passes</td>
          <td>Attention kernel matched to the GPU, kernel fusion, FP8 GEMMs, compilation on the target GPU, guidance truncation</td>
        </tr>
        <tr>
          <th scope="row">Video generation</th>
          <td>Iterative denoiser over a width × height × time latent</td>
          <td>Compute, with attention at 70 to 80 percent because its cost grows with the square of sequence length</td>
          <td>End-to-end time per clip at a batch size of one</td>
          <td>Attention kernels, timestep and transformer caching, selective attention quantization, Context Parallelism</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    Two patterns run through the table. The four autoregressive modalities reuse the Chapter 5 toolkit
    because their decoders behave like LLM decode. The two denoising modalities are compute bound, so
    their gains come from doing less arithmetic or doing it in lower precision.
  </p>
</Signal>

<h2>What comes next</h2>

<p>
  Several pipelines in this chapter chain multiple models, such as the cascading voice pipeline and the
  long-file transcription stages, and each stage must scale on its own. Chapter 7 moves from a single
  optimized model to production systems, with the containers, autoscaling, queues, and streaming
  protocols that run such pipelines reliably and economically.
</p>
