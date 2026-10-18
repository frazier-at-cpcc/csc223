<script module>
  export const pageConfig = { title: 'Knowledge Check: Other Datacenter Accelerators' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Other Datacenter Accelerators</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="Furiosa and Qualcomm design their accelerators around which competitive edge?"
  options={['Memory bandwidth', 'Platform integration', 'Power efficiency']}
  correct={2}
  optionFeedback={[
    'Incorrect. Memory bandwidth is the edge that Cerebras and Groq pursue to accelerate decode.',
    'Incorrect. Platform integration is the edge that Amazon and Google pursue through their cloud platforms.',
    'Correct. Furiosa and Qualcomm design chips for lower power consumption, which leads to cheaper operating costs.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A new accelerator startup has a fast chip but few customers can run their models on it. Which shared challenge best explains this?"
  options={['Distribution', 'Manufacturing', 'Software']}
  correct={2}
  optionFeedback={[
    'Incorrect. Distribution concerns getting manufactured chips installed and online. The scenario describes chips that exist but cannot run customer models.',
    'Incorrect. Manufacturing concerns building the chip. The scenario states that the chip already exists and is fast.',
    'Correct. Without CUDA, a vendor must rebuild the entire inference stack, so models do not run on new hardware until that software exists.',
  ]}
/>
