<script module>
  export const pageConfig = { title: 'Mobile Inference' };
</script>

<h1>Mobile Inference</h1>

<p>Mobile devices run the majority of on-device inference today. Both major operating systems offer developer tooling.</p>
<dl>
  <dt><strong>Android</strong></dt>
  <dd>Google's AI Edge SDK and ML Kit GenAI APIs interface with Gemini Nano and open-source Gemma models.</dd>
  <dt><strong>iOS</strong></dt>
  <dd>Apple's Foundation Models and Core ML frameworks provide APIs for models across modalities.</dd>
</dl>

<h2>Constraints on phones</h2>
<p>
  Phones have very limited hardware and battery capacity. Even high-end phones struggle to run models with more than
  one or two billion parameters.
</p>

<h2>Workloads that fit on phones</h2>
<ul>
  <li>
    Transcription and speech synthesis are latency-sensitive. Some of these models are small enough to run in real
    time on modern phones.
  </li>
  <li>Discrete tasks such as translation run well on small fine-tuned models.</li>
</ul>

<h2>Local and cloud together</h2>
<p>
  The future of inference combines local and cloud execution. Small models and quick queries will run on end-user
  devices. Demanding workloads will stay on datacenter GPUs in the cloud.
</p>
