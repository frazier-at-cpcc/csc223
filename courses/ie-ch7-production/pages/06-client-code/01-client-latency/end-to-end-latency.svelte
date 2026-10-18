<script module>
  export const pageConfig = { title: 'End-to-End Latency' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import SegmentedBar from '../../../components/SegmentedBar.svelte';
</script>

<h1>End-to-End Latency</h1>

<p>
  Inference engineering draws on many technologies, from CUDA to Kubernetes. Client code is the area most often
  overlooked when teams optimize latency and build for scale.
</p>

<h2>Two sides of every call</h2>

<ul>
  <li><strong>Client:</strong> the browser, agent, or application that sends a request to the inference service.</li>
  <li><strong>Server:</strong> the inference service that handles the request and returns the model results.</li>
</ul>

<p>
  The OpenAI SDK is the industry standard for client code. It supports many compatible providers in addition to
  OpenAI's own models. Frameworks and libraries such as LangChain, the Vercel AI SDK, LiteLLM, and LlamaIndex can also
  act as clients. Any client, whether a library or custom code, can add latency overhead or limit throughput.
</p>

<Figure
  number="7.16"
  caption="On-server inference time is only a fraction of the end-to-end latency for a given request."
  description="A horizontal bar labeled end-to-end inference time is divided into four consecutive segments: network, queue, model server, and network again. The model server segment is the widest, but the two network segments and the queue segment together take a substantial share of the total. Widths show relative duration in the book's illustration, not measured times."
>
  <SegmentedBar
    title="End-to-end inference time"
    segments={[
      { label: 'Network', size: 2, alt: true },
      { label: 'Queue', size: 1.3, alt: true },
      { label: 'Model server', size: 5 },
      { label: 'Network', size: 1.8, alt: true },
    ]}
  />
</Figure>

<p>
  Only the model server segment reflects work on the GPU. Network time on both legs and time spent in a queue all count
  against the latency the user experiences. The dashed outline marks segments outside the model server.
</p>

<p>
  Real-time applications may also need a protocol other than HTTP, such as WebSockets, to keep a continuous connection
  open. The next lesson covers those protocols.
</p>
