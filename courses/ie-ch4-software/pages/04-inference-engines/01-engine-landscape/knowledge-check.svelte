<script module>
  export const pageConfig = { title: 'Knowledge Check: The Engine Landscape' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Engine Landscape</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_landscape_1"
  question="A team must serve an image generation model and rules out TensorRT-LLM. What is the reason?"
  options={[
    'It lacks support for image and video models.',
    'It needs a separate license for image models.',
    'It requires AMD GPUs for image models.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. TensorRT-LLM does not support image or video generation models. vLLM Omni, SGLang Diffusion, TensorRT, or PyTorch can serve them instead.',
    'All three engines use the Apache 2.0 license, and no separate license applies to image models.',
    'TensorRT-LLM runs on NVIDIA GPUs only. Hardware is not the reason it is ruled out.',
  ]}
/>

<MultipleChoice
  id="kc_landscape_2"
  question="TensorRT-LLM achieves the best performance of the three engines. Which principle of inference engineering explains this result?"
  options={[
    'Broader model support produces better performance.',
    'More constraints allow better performance.',
    'Open-source licenses produce faster kernels.',
    'Simpler interfaces produce faster engines.',
  ]}
  correct={1}
  optionFeedback={[
    'Broad support is the strength of vLLM, and it works against peak performance.',
    'Correct. TensorRT-LLM narrows its scope to NVIDIA hardware and well-supported models, which lets it specialize.',
    'All three engines use the Apache 2.0 license, so licensing cannot explain the difference.',
    'TensorRT-LLM has the hardest interface of the three and still performs best.',
  ]}
/>
