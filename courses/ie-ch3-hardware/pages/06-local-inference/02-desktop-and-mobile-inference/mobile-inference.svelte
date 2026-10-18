<script module>
  export const pageConfig = { title: 'Mobile Inference' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Mobile Inference</h1>

<p>
  Mobile devices run the majority of on-device inference today. Both major operating systems offer developer
  tooling, as of October 2026.
</p>
<dl>
  <dt><strong>Android</strong></dt>
  <dd>Google's AI Edge SDK and ML Kit GenAI APIs interface with Gemini Nano and open-source Gemma models.</dd>
  <dt><strong>iOS</strong></dt>
  <dd>
    Apple's Foundation Models framework exposes Apple's on-device language model, and Core ML runs models across
    modalities.
  </dd>
</dl>

<h2>Constraints on phones</h2>
<p>
  Phones have very limited memory, compute, and battery capacity. Even high-end phones struggle to run models
  with more than a few billion parameters. Apple's on-device foundation model has about 3 billion parameters, and
  Gemini Nano runs at a similar scale on flagship Android phones.
</p>

<h2>Workloads that fit on phones</h2>
<ul>
  <li>
    Transcription and speech synthesis are sensitive to <Term id="latency">latency</Term>. Some of these models are small enough to run in real
    time on modern phones.
  </li>
  <li>Discrete tasks such as translation run well on small fine-tuned models.</li>
</ul>

<h2>Local and cloud together</h2>
<p>
  Many products combine local and cloud execution. Small models and quick queries run on end-user devices.
  Demanding workloads stay on datacenter GPUs in the cloud. A hybrid design must still decide what happens when
  the device is offline and which data may leave it.
</p>
