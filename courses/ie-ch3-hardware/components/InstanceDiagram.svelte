<script>
  import Figure from './Figure.svelte';
  const gpus = [0, 1, 2, 3];
</script>

<Figure
  caption="Figure 3.5: The host and device sides of a cloud GPU instance, and the links that join them."
  description="The left side of the diagram is the host. It holds a CPU box, a host memory box labeled RAM, a storage box labeled disk, and a network interface box labeled NIC. A PCIe link runs from the host to the device side on the right. The device side holds four GPU boxes, each with its own VRAM, which the diagram calls device memory. A thick bar labeled NVLink and NVSwitch joins all four GPUs. The NIC connects outward to the datacenter network, which leads to other nodes and the internet. Data moving from host memory to a GPU crosses PCIe, data moving between GPUs crosses NVLink, and data moving to another node crosses the NIC. The single NIC shown here carries ordinary datacenter traffic. Servers built for multi-node inference add one high-speed NIC per GPU, as the Multi-GPU Instances lesson explains."
>
  <svg viewBox="0 0 640 300" role="img" aria-labelledby="instance-title">
    <title id="instance-title">Host components linked to GPUs by PCIe, GPUs linked to each other by NVLink</title>
    <rect x="10" y="10" width="220" height="280" class="ie-svg-box" />
    <text x="120" y="32" text-anchor="middle" class="ie-svg-label">Host</text>
    <rect x="30" y="48" width="180" height="40" class="ie-svg-inner" />
    <text x="120" y="73" text-anchor="middle" class="ie-svg-small">CPU</text>
    <rect x="30" y="100" width="180" height="40" class="ie-svg-inner" />
    <text x="120" y="125" text-anchor="middle" class="ie-svg-small">Host memory (RAM)</text>
    <rect x="30" y="152" width="180" height="40" class="ie-svg-inner" />
    <text x="120" y="177" text-anchor="middle" class="ie-svg-small">Storage (disk)</text>
    <rect x="30" y="204" width="180" height="40" class="ie-svg-inner" />
    <text x="120" y="229" text-anchor="middle" class="ie-svg-small">Network interface (NIC)</text>
    <line x1="30" y1="264" x2="210" y2="264" class="ie-svg-line" />
    <text x="120" y="282" text-anchor="middle" class="ie-svg-small">to other nodes and the internet</text>

    <line x1="230" y1="150" x2="320" y2="150" class="ie-svg-line" />
    <text x="275" y="140" text-anchor="middle" class="ie-svg-small">PCIe</text>

    <rect x="320" y="10" width="310" height="280" class="ie-svg-box" />
    <text x="475" y="32" text-anchor="middle" class="ie-svg-label">Device</text>
    {#each gpus as g (g)}
      <rect x={336 + g * 72} y="52" width="62" height="90" class="ie-svg-accent" />
      <text x={367 + g * 72} y="80" text-anchor="middle" class="ie-svg-small">GPU</text>
      <rect x={342 + g * 72} y="96" width="50" height="34" class="ie-svg-chip" />
      <text x={367 + g * 72} y="118" text-anchor="middle" class="ie-svg-small">VRAM</text>
      <line x1={367 + g * 72} y1="142" x2={367 + g * 72} y2="186" class="ie-svg-line" />
    {/each}
    <rect x="336" y="186" width="278" height="34" class="ie-svg-inner" />
    <text x="475" y="208" text-anchor="middle" class="ie-svg-small">NVLink and NVSwitch</text>
    <text x="475" y="252" text-anchor="middle" class="ie-svg-small">Device memory = VRAM on each GPU</text>
  </svg>
</Figure>
