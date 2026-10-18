<script module>
  export const pageConfig = { title: 'Chapter 6 Overview' };
</script>

<h1>Chapter 6 Overview: Modalities</h1>

<p>
  The <strong>modality</strong> of a model describes the types of input it accepts and the types of
  output it creates. Chapters 1 through 5 cover inference engineering for large language models
  (LLMs), which take text in and produce text out. This chapter extends that work to six other
  modalities.
</p>

<p>
  Many of the engines and techniques from earlier chapters carry over. Each new modality still
  changes three things: the model architecture, the bottleneck that limits performance, and the
  metrics that describe a good user experience. The chapter treats each modality in turn and
  highlights what differs from LLM serving.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol>
  <li>Classify a generative AI model by its input modality, output modality, and model archetype, and select a latency metric that fits its output.</li>
  <li>Explain how image and video inputs lengthen a vision language model's input sequence, and select optimizations that address the longer sequence.</li>
  <li>Select runtime, quantization, and scaling strategies for an embedding model deployment based on its traffic profile.</li>
  <li>Compare real-time and long-file speech recognition pipelines, and calculate the real-time factor of a transcription system.</li>
  <li>Evaluate text-to-speech performance with time to first byte, time to first sentence, and tokens per second, and explain why text-to-speech throughput scales through concurrent streams.</li>
  <li>Apply kernel selection, compilation, and guidance truncation to reduce image generation latency, and calculate the denoiser passes that guidance truncation saves.</li>
  <li>Analyze why attention dominates video generation inference, and justify attention caching, selective quantization, and Context Parallelism as responses.</li>
</ol>

<h2>How this chapter fits the book</h2>

<p>
  Chapter 2 introduced the two archetypes of generative models. Chapters 3 and 4 covered the
  hardware and software that run them, and Chapter 5 covered optimization techniques such as
  quantization, speculation, caching, parallelism, and disaggregation. This chapter applies those
  techniques to non-text modalities. Chapter 7 then moves from a single model to production
  systems, and several pipelines in this chapter preview that work.
</p>

<h2>Chapter structure</h2>

<ul>
  <li>Vision language models</li>
  <li>Embedding models</li>
  <li>Automatic speech recognition (ASR) models</li>
  <li>Text-to-speech (TTS) models</li>
  <li>Image generation models</li>
  <li>Video generation models</li>
  <li>Chapter quiz (graded, 12 items, passing score 70 percent)</li>
</ul>

<p>Each lesson ends with an ungraded knowledge check.</p>
