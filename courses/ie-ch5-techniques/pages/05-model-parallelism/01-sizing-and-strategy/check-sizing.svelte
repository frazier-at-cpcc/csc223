<script module>
  export const pageConfig = { title: 'Knowledge Check: Sizing and Strategy' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Sizing and Strategy</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_sizing_1"
  question="Why must multi-GPU inference be designed around the interconnect topology?"
  options={[
    'GPU interconnects run at a fraction of VRAM speed while decode is memory bound',
    'Inference engines can address only GPUs that share one NVSwitch',
    'Prefill cannot run on more than one GPU at a time',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. NVLink and InfiniBand are slower than VRAM, so careless communication becomes the bottleneck for memory-bound decode.',
    'Incorrect. Engines can span nodes over InfiniBand. The concern is bandwidth, not addressability.',
    'Incorrect. Prefill can be parallelized across GPUs like any other phase.',
  ]}
/>

<MultipleChoice
  id="kc_sizing_2"
  question="Which form of model parallelism splits the tensors inside every layer across GPUs?"
  options={['Expert Parallelism', 'Pipeline Parallelism', 'Tensor Parallelism']}
  correct={2}
  optionFeedback={[
    'Incorrect. Expert Parallelism keeps each expert whole on one GPU.',
    'Incorrect. Pipeline Parallelism keeps layers whole and assigns groups of layers to different GPUs.',
    'Correct. Tensor Parallelism divides each layer, so every GPU holds a slice of every layer.',
  ]}
/>
