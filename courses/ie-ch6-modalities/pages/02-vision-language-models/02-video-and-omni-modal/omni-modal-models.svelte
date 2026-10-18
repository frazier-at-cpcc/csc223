<script module>
  export const pageConfig = { title: 'Omni-Modal Models and Pipelines' };
</script>

<h1>Omni-Modal Models and Pipelines</h1>

<p>
  VLMs belong to a broader trend toward <strong>omni-modal</strong> models, which accept multiple
  modalities of input and produce multiple modalities of output.
</p>

<h2>Tradeoffs of omni models</h2>

<ul>
  <li>The blend of modalities in one model provides capabilities that separate models lack.</li>
  <li>Smaller specialized models are often faster and more accurate within a specific domain.</li>
</ul>

<p>
  Text recognition illustrates the tradeoff. Many VLMs have text recognition trained into their image
  processing. Dedicated optical character recognition (OCR) models still outperform them, and OCR
  models are generally a fraction of the size.
</p>

<h2>Production VLMs are pipelines</h2>

<p>
  Production VLM inference often coordinates several models and preprocessing steps. A single
  request might pass through these components before the VLM sees it:
</p>

<ul>
  <li>a preprocessor that extracts data from PDFs,</li>
  <li>an OCR model that reads text from images, and</li>
  <li>a transcription model that converts a video's audio to text.</li>
</ul>

<p>
  Optimize each component in the pipeline for speed individually. Each component should also scale
  independently, so that one slow stage does not become a bottleneck for the rest.
</p>
