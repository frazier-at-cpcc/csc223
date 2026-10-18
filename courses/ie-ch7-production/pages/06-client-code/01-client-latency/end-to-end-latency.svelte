<script module>
  export const pageConfig = { title: 'End-to-End Latency' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import SegmentedBar from '../../../components/SegmentedBar.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>End-to-End Latency</h1>

<Signal kind="recall" chapter={1}>
  <p>
    Inference time is the on-GPU time required to generate tokens. <Term id="end-to-end-latency">End-to-end latency</Term> is the full time a
    user waits, including network latency and any time the request spends in a queue. When inference is fast but
    end-to-end latency is slow, the delay comes from outside the model server.
  </p>
</Signal>

<p>
  Inference engineering draws on many technologies, from CUDA to Kubernetes. Client code is the area most often
  overlooked when teams optimize latency and build for scale. Every call has two sides.
</p>
<ul>
  <li><strong>Client:</strong> the browser, agent, or application that sends a request to the inference service.</li>
  <li><strong>Server:</strong> the inference service that handles the request and returns the model results.</li>
</ul>
<p>
  At the book's publication, the OpenAI SDK was the most widely used client library, and many providers besides
  OpenAI accept requests in its format. Frameworks and libraries such as LangChain, the Vercel AI SDK, LiteLLM, and
  LlamaIndex can also act as clients. Any client, whether a library or custom code, can add latency overhead or limit
  <Term id="throughput">throughput</Term>.
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
  Only the model server segment reflects work on the GPU. Network time on both legs and time spent in a queue, for
  synchronous requests as much as asynchronous ones, all count against the latency the user experiences. The dashed
  outline marks segments outside the model server.
</p>
<p>
  Four places can therefore cause an end-to-end latency problem: the model server, the queue, the network, and the
  client. The Observability lesson showed how to read the first two from server metrics, and the multi-cloud section
  showed how distance sets the network floor. This lesson and the next cover the client.
</p>
