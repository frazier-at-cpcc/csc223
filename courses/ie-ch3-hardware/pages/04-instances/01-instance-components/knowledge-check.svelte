<script module>
  export const pageConfig = { title: 'Knowledge Check: Instance Components' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Instance Components</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<Matching
  id="kc_host_device"
  question="Match each instance term to what it refers to."
  pairs={[
    { left: 'Device', right: 'A GPU in the instance' },
    { left: 'Device memory', right: 'VRAM on a GPU' },
    { left: 'Host', right: 'The CPU that runs everything outside the GPU' },
    { left: 'Host memory', right: 'RAM attached to the CPU' },
  ]}
  correctFeedback="Correct. The host is the CPU side of the instance and the device is the GPU side. Each side has its own memory."
  incorrectFeedback="Review the pairs. The CPU is the host and its RAM is host memory. A GPU is a device and its VRAM is device memory."
/>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<MultipleChoice
  id="kc_load_path"
  question="An instance loads model weights from local disk into the VRAM of each GPU. After the weights reach host memory, which link do they cross to reach VRAM in a standard x86 server?"
  options={['InfiniBand', 'NVLink', 'PCIe']}
  correct={2}
  optionFeedback={[
    'Incorrect. InfiniBand connects separate nodes. A transfer inside one server does not use it.',
    'Incorrect. NVLink connects GPUs to each other. In a standard server, the CPU reaches each GPU over PCIe.',
    'Correct. In a standard server, the host CPU and its memory reach each GPU over the PCIe bus.',
  ]}
/>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<MultipleChoice
  id="kc_sxm"
  question="Two cloud providers offer A100 instances, one with the PCIe form factor and one with SXM. Your team will split one model across all eight GPUs with tensor parallelism. Which difference matters most for that plan?"
  options={[
    'SXM GPUs connect to all eight GPUs through NVLink and NVSwitch',
    'SXM GPUs have about 5 percent more memory bandwidth',
    'SXM GPUs have lower memory bandwidth but a higher power limit',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Tensor parallelism exchanges data between GPUs on every layer, so the full NVLink and NVSwitch connectivity of SXM matters most.',
    'Incorrect. The SXM A100 does have about 5 percent more bandwidth, but tensor parallelism depends far more on the links between GPUs.',
    'Incorrect. SXM GPUs have a higher power limit, but their memory bandwidth is higher, not lower, than the PCIe variant.',
  ]}
/>
