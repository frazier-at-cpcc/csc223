<script module>
  export const pageConfig = { title: 'Knowledge Check: Future Architectures and CPUs' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Future Architectures and CPUs</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 6: Differentiate NVIDIA GPU generations by inference features</p>
<Matching
  id="kc_superchips"
  question="Match each NVIDIA product name to what it contains."
  pairs={[
    { left: 'GB200', right: 'One Grace CPU with two Blackwell GPUs' },
    { left: 'GH200', right: 'One Grace CPU with one Hopper GPU' },
    { left: 'Rubin CPX', right: 'A separate chip for the prefill of very long inputs' },
    { left: 'Vera', right: 'The CPU that replaces Grace in Rubin systems' },
  ]}
  correctFeedback="Correct. In a superchip name, G marks the Grace CPU and the next letter marks the GPU generation. Rubin systems swap Grace for Vera and add the CPX for prefill."
  incorrectFeedback="Read superchip names letter by letter. G is Grace, H is Hopper, and B is Blackwell. Vera is the CPU of the Rubin generation, and the CPX is the Rubin chip for compute-bound prefill."
/>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<MultipleChoice
  id="kc_kv_reload"
  question="An inference platform stores KV caches from earlier requests in CPU memory and reloads them onto the GPU. Which feature of a GH200 superchip speeds up this reload?"
  options={[
    'HBM4 memory stacked on the GPU package',
    'NVLink Chip to Chip from the Grace CPU to the GPU',
    'NVSwitch links between the GPUs in a node',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. HBM4 arrives with Rubin and speeds transfers within GPU memory. It does not affect the CPU-to-GPU link.',
    'Correct. NVLink Chip to Chip provides up to 900 GB/s between CPU and GPU memory, about seven times a PCIe Gen5 x16 link.',
    'Incorrect. NVSwitch coordinates GPU-to-GPU traffic within a node. It does not carry CPU-to-GPU transfers.',
  ]}
/>

<p class="ie-obj">Objective 6: Differentiate NVIDIA GPU generations by inference features</p>
<MultipleChoice
  id="kc_cpx"
  question="Which Rubin-generation addition targets the compute-bound prefill phase of LLM inference?"
  options={['The Rubin CPX chip', 'HBM4 memory', 'The Vera CPU']}
  correct={0}
  optionFeedback={[
    'Correct. The Rubin CPX is a separate chip built for compute-bound tasks such as the prefill of long inputs.',
    'Incorrect. HBM4 raises memory bandwidth, which helps memory-bound decode rather than compute-bound prefill.',
    'Incorrect. The Vera CPU replaces Grace as the host CPU. It does not perform prefill computation.',
  ]}
/>
