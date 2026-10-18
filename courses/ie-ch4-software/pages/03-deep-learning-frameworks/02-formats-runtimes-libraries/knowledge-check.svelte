<script module>
  export const pageConfig = { title: 'Knowledge Check: Formats and Runtimes' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Formats and Runtimes</h1>

<p>
  These questions are ungraded. All three practice objective 5: choose the model
  format, runtime, or PyTorch tool that fits a stated storage or deployment need.
</p>

<Matching
  id="kc_formats_match"
  question="Match each need to the format, runtime, or library that fits it best."
  pairs={[
    { left: 'Store weights with no executable code for an inference engine to load', right: 'Safetensors' },
    { left: 'Store weights together with the execution graph in one portable file', right: 'ONNX' },
    { left: 'Run an exported graph on GPUs from several vendors', right: 'ONNX Runtime' },
    { left: 'Compile an exported graph into an engine file for one NVIDIA GPU', right: 'TensorRT' },
    { left: 'Check the exact input and output specification of a new model', right: 'transformers sample code' },
  ]}
  correctFeedback="Safetensors and ONNX are storage formats, ONNX Runtime and TensorRT are runtimes for an exported graph, and the transformers sample code is a reference for learning a model's interface."
  incorrectFeedback="Separate storage from execution. Safetensors stores weights only and ONNX stores weights with a graph. ONNX Runtime runs the graph on many GPU types, and TensorRT compiles it for one NVIDIA GPU. The reference libraries show a model's inputs and outputs."
/>

<MultipleChoice
  id="kc_formats_safe"
  question="A security review asks why the team loads model weights from safetensors files instead of PyTorch bin files. Which property of safetensors answers the question?"
  options={[
    'It bundles the execution graph with the weights.',
    'It compiles the weights for a specific GPU.',
    'It holds only tensor data and no executable code.',
    'It loads through memory mapping, without a full copy.',
  ]}
  correct={2}
  optionFeedback={[
    'Bundling the graph describes ONNX. Safetensors stores weights only.',
    'Compiling for a GPU describes TensorRT or torch.compile, not a file format.',
    'Correct. A bin file is a Python pickle, which can run arbitrary code while it loads. Safetensors holds only tensor data, so loading it cannot run code.',
    'Memory mapping makes safetensors fast to load. Speed is not the property a security review asks about.',
  ]}
/>

<MultipleChoice
  id="kc_formats_ref"
  question="An engineer finds transformers sample code on a model card. What is the most appropriate use of that code?"
  options={[
    'Confirming the model input and output specification',
    'Replacing the inference engine in production',
    'Serving the model at large scale without changes',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The reference code shows the exact input and output specification and suits local experiments.',
    'The reference libraries are not designed for production. Use PyTorch code tuned for the model or an inference engine there.',
    'The transformers library is a reference implementation, not a large-scale serving system.',
  ]}
/>
