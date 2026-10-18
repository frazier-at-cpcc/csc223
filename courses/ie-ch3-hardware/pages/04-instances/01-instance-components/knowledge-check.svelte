<script module>
  export const pageConfig = { title: 'Knowledge Check: Instance Components' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Instance Components</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="In instance terminology, what does host memory refer to?"
  options={['Disk storage for model files', 'RAM attached to the CPU', 'VRAM on the GPU']}
  correct={1}
  optionFeedback={[
    'Incorrect. Disk is the storage component. It holds files but is not host memory.',
    'Correct. The CPU is the host, so host memory is the traditional RAM the CPU uses.',
    'Incorrect. VRAM belongs to the GPU, which is the device. VRAM is device memory.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="Two cloud providers both offer A100 instances. One uses the PCIe form factor and the other uses SXM. Which statement describes the SXM instance?"
  options={[
    'It has more memory bandwidth and is the standard for inference',
    'It has the same specifications in a different physical slot',
    'It plugs into a standard PCI Express slot for easier upgrades',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. SXM GPUs support higher-bandwidth connections and often have higher base specifications. The SXM A100 has 5 percent more memory bandwidth than the PCIe A100.',
    'Incorrect. Form factor changes specifications. The SXM A100 has more memory bandwidth than the PCIe A100.',
    'Incorrect. The PCIe form factor uses a standard PCI Express slot. SXM is a socketed module.',
  ]}
/>
