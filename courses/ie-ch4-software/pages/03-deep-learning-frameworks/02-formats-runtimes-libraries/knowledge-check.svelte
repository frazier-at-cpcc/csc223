<script module>
  export const pageConfig = { title: 'Knowledge Check: Formats and Runtimes' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Formats and Runtimes</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_formats_1"
  question="A security review asks why the team loads model weights from safetensors files instead of a generic format. Which property of safetensors answers the question?"
  options={[
    'It bundles the execution graph with the weights.',
    'It compiles the weights for a specific GPU.',
    'It holds only tensor data and no executable code.',
    'It packs the weights into one file per model.',
  ]}
  correct={2}
  optionFeedback={[
    'Bundling the graph describes ONNX. Safetensors stores weights only.',
    'Compiling for a GPU describes TensorRT or torch.compile, not a file format.',
    'Correct. A generic format can run arbitrary Python code while loading. Safetensors holds only tensor data.',
    'Large models split their weights across dozens of safetensors files.',
  ]}
/>

<MultipleChoice
  id="kc_formats_2"
  question="A team must run an exported model on GPUs from three different vendors. Which option fits that requirement?"
  options={['ONNX Runtime', 'TensorRT', 'TensorRT-LLM V0', 'Torch-TensorRT']}
  correct={0}
  optionFeedback={[
    'Correct. ONNX Runtime is an open community standard that supports many types of GPUs.',
    'TensorRT runs on NVIDIA GPUs only.',
    'TensorRT-LLM V0 is a plugin for TensorRT and runs on NVIDIA GPUs only.',
    'Torch-TensorRT connects PyTorch to TensorRT, which runs on NVIDIA GPUs only.',
  ]}
/>

<MultipleChoice
  id="kc_formats_3"
  question="An engineer finds transformers sample code on a model card. What is the most appropriate use of that code?"
  options={[
    'Confirming the model input and output specification',
    'Replacing the inference engine in production',
    'Serving the model at large scale without changes',
    'Training a new base model from scratch',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The reference code shows the exact input and output specification and suits local experiments.',
    'The reference libraries are not designed for production. Use compiled PyTorch or an inference engine there.',
    'The transformers library is a reference implementation, not a large-scale serving system.',
    'Model card sample code demonstrates inference. Pretraining a base model is a separate, much larger task.',
  ]}
/>
