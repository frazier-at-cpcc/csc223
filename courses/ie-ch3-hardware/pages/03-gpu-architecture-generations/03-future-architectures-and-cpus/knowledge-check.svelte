<script module>
  export const pageConfig = { title: 'Knowledge Check: Future Architectures and CPUs' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Future Architectures and CPUs</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="An inference platform stores KV caches from earlier requests in CPU memory and reloads them onto the GPU. Which feature of a GH200 superchip speeds up this reload?"
  options={[
    'HBM4 memory stacked on the GPU package',
    'NVLink Chip to Chip from the Grace CPU to the GPU',
    'NVSwitch links between the GPUs in a node',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. HBM4 arrives with Rubin and speeds transfers within GPU memory. It does not affect the CPU-to-GPU link.',
    'Correct. NVLink Chip to Chip provides up to 900 GB/s between CPU and GPU memory, several times faster than PCIe.',
    'Incorrect. NVSwitch coordinates GPU-to-GPU traffic within a node. It does not carry CPU-to-GPU transfers.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="Which Rubin addition targets the compute-bound prefill phase of LLM inference?"
  options={['HBM4 memory', 'The CPX chip', 'The Vera CPU']}
  correct={1}
  optionFeedback={[
    'Incorrect. HBM4 raises memory bandwidth, which helps memory-bound decode rather than compute-bound prefill.',
    'Correct. The Rubin CPX is a separate chip built for compute-bound tasks such as LLM prefill.',
    'Incorrect. The Vera CPU replaces Grace as the host CPU. It does not perform prefill computation.',
  ]}
/>
