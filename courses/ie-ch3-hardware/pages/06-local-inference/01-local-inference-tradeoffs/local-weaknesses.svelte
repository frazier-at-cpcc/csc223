<script module>
  export const pageConfig = { title: 'Weaknesses of Local Inference' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Weaknesses of Local Inference</h1>

<p>
  Local inference sounds ideal in theory. In practice, most inference still happens in the cloud, because four
  weaknesses limit local applications.
</p>

<dl>
  <dt><strong>Hardware capabilities</strong></dt>
  <dd>Even high-end prosumer desktops offer a fraction of the speed and power of datacenter GPUs.</dd>
  <dt><strong>Thermal constraints</strong></dt>
  <dd>Local devices cool worse than datacenters, which further limits their sustained speed and power.</dd>
  <dt><strong>Fragmented support matrix</strong></dt>
  <dd>Endless combinations of hardware and software make standardization difficult.</dd>
  <dt><strong>Battery life</strong></dt>
  <dd>Inference is a demanding workload that drains laptop and smartphone batteries quickly.</dd>
</dl>

<h2>Design for the median device</h2>
<p>
  Keep your audience in mind when you build with local inference. An AI enthusiast may own the latest phone and a
  powerful computer. A median user is more likely to own older devices with less powerful components.
</p>

<Callout type="info">
  <p>
    Local inference is moving from experimentation to production. A strong hardware and software ecosystem, and a
    vibrant community tied to open models, support that shift.
  </p>
</Callout>
