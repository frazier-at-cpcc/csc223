<script module>
  export const pageConfig = { title: 'Chapter 6 Overview' };
</script>

<script>
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 6 Overview: Modalities</h1>

<p>Content current as of October 2026.</p>

<p>
  The <strong>modality</strong> of a model describes the types of input it accepts and the types of
  output it creates. Chapters 1 through 5 cover inference engineering for <Term id="llm">large language
  models (LLMs)</Term>, which take text in and produce text out. This chapter extends that work to six
  other modalities.
</p>
<p>
  Many of the engines and techniques from earlier chapters carry over. Each new modality still
  changes three things: the model architecture, the bottleneck that limits performance, and the
  metrics that describe a good user experience. The chapter treats each modality in turn and
  highlights what differs from LLM serving. The synthesis page at the end of the chapter compares all
  six modalities on those three axes.
</p>

<StackMap highlight={6} />

<h2>Learning objectives</h2>
<p>After completing this chapter, you will be able to:</p>
<ol>
  <li>Classify a generative AI model by its input modality, output modality, and model archetype.</li>
  <li>Estimate the input tokens that images and video add to a vision language model request.</li>
  <li>Select optimizations for a vision language model workload with long visual-token sequences.</li>
  <li>Select an embedding deployment design that fits a workload's traffic profile.</li>
  <li>Calculate the real-time factor of a transcription system.</li>
  <li>Compare real-time and long-file speech recognition pipelines.</li>
  <li>Evaluate a text-to-speech deployment against latency and real-time stream-capacity targets.</li>
  <li>Calculate the forward passes through the denoising model in an image generation run that uses guidance truncation.</li>
  <li>Justify an optimization plan for image or video generation from the workload's compute-bound, attention-heavy profile.</li>
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
  <li>Recall from earlier chapters</li>
  <li>Vision language models</li>
  <li>Embedding models</li>
  <li>Automatic speech recognition (ASR) models</li>
  <li>Text-to-speech (TTS) models</li>
  <li>Image generation models</li>
  <li>Video generation models</li>
  <li>Chapter synthesis and chapter glossary</li>
  <li>Chapter quiz (graded, 14 items, passing score 70 percent)</li>
</ul>
<p>
  Each lesson ends with an ungraded knowledge check. Lessons with a calculation objective also include
  a worked example, a partly completed example for you to finish, and practice items with new numbers.
</p>
