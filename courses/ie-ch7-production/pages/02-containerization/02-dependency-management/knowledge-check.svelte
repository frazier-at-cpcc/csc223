<script module>
  export const pageConfig = { title: 'Knowledge Check: Dependency Management' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Dependency Management</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 1: explain reproducible inference builds</p>
<MultipleChoice
  id="kc_dm_lock"
  question="A requirements file pins vllm==0.9.2 and nothing else. The image is rebuilt two months later, and the engine now crashes at startup. The vllm version is unchanged. Which addition to the build would have prevented the crash?"
  options={[
    'A lock file for every transitive dependency',
    'A higher version floor, such as vllm>=0.9.2',
    'A newer GPU driver installed inside the image',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The exact pin froze vllm itself, but the packages vllm depends on still resolved to new releases. A lock file records the whole resolved tree, so the rebuild installs the same versions.',
    'Incorrect. A floor accepts every later release, so it pins less than the exact version already in place. The change came from a dependency of vllm, not from vllm.',
    'Incorrect. The GPU driver lives on the host, not in the image. The crash followed a rebuild with an unchanged host, so the change came from the image contents.',
  ]}
/>

<p class="ie-objective">Practices objective 1: explain reproducible inference builds</p>
<Sorting
  id="kc_dm_where"
  question="Sort each component by where it lives when an inference container runs on a GPU host."
  items={['CUDA runtime libraries', 'NVIDIA GPU driver', 'Inference engine such as SGLang', 'ffmpeg system package', 'Linux kernel']}
  targets={['Inside the image', 'On the host']}
  correct={[0, 1, 0, 0, 1]}
  correctFeedback="Correct. The image carries user-space software: the CUDA libraries, the engine, and system packages. The kernel and the GPU driver belong to the host, and every container on that host shares them."
  incorrectFeedback="Containers share the host kernel, and the GPU driver is installed on the host. Everything the service needs in user space, including the CUDA runtime libraries, the engine, and packages such as ffmpeg, goes in the image."
/>

<p class="ie-objective">Practices objective 1: explain reproducible inference builds</p>
<MultipleChoice
  id="kc_dm_base"
  question="A team must control every engine flag and dependency in its inference container and wants rebuilds to stay identical. Which starting point fits?"
  options={[
    'An LLM-specific NIM, used exactly as published',
    'A multi-LLM NIM, adapted to the target model',
    'A minimal base image, referenced by digest',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. An LLM-specific NIM is tuned for performance out of the box, but it fixes many configuration choices in advance.',
    'Incorrect. Adapting a NIM means working around choices NVIDIA already made, which gives less control than building your own image.',
    'Correct. A minimal, less opinionated base gives the most control, and a digest reference keeps every rebuild on the same foundation.',
  ]}
/>
