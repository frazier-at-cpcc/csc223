<script module>
  export const pageConfig = { title: 'Knowledge Check: Container Fundamentals' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Container Fundamentals</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_cf_1"
  question="An inference service running under Docker writes a temporary file to disk at runtime. The running instance then terminates. What happens to the file?"
  options={[
    'It is lost, because the container layer is ephemeral.',
    'It is pushed to the registry with the image.',
    'It is saved into the base image for the next run.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Runtime writes go to the thin container layer, which disappears when the container terminates.',
    'Incorrect. A registry stores images that someone builds and pushes. Runtime file changes are not published there.',
    'Incorrect. The base image is read only. Runtime changes land in the container layer and do not alter any image layer.',
  ]}
/>

<MultipleChoice
  id="kc_cf_2"
  question="Which artifact holds the machine-interpretable instructions that produce a Docker image?"
  options={['Container', 'Dockerfile', 'Registry']}
  correct={1}
  optionFeedback={[
    'Incorrect. A container is a running instance of an image, not the instructions that build it.',
    'Correct. A Dockerfile is a human-readable file of instructions for creating an image.',
    'Incorrect. A registry stores and distributes finished images.',
  ]}
/>
