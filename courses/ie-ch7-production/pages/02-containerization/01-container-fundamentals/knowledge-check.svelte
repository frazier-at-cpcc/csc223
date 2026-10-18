<script module>
  export const pageConfig = { title: 'Knowledge Check: Container Fundamentals' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Container Fundamentals</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 1: explain reproducible inference builds</p>
<Matching
  id="kc_cf_terms"
  question="Match each Docker term to the role it plays in shipping an inference service."
  pairs={[
    { left: 'Dockerfile', right: 'The recipe that lists build instructions' },
    { left: 'Image', right: 'The read-only package that the recipe produces' },
    { left: 'Container', right: 'A running instance of the package' },
    { left: 'Registry', right: 'The store that publishes and distributes packages' },
  ]}
  correctFeedback="Correct. A Dockerfile produces an image, the registry stores and distributes that image, and a container is the image running on a host."
  incorrectFeedback="Trace the life cycle in order. The Dockerfile holds the instructions, the build produces an image, the registry stores the image, and a host runs the image as a container."
/>

<p class="ie-objective">Practices objective 1: explain reproducible inference builds</p>
<MultipleChoice
  id="kc_cf_layer"
  question="An inference service running in a container downloads a tokenizer file to its working directory at runtime. The container is then replaced by a new container from the same image. Where is the tokenizer file now?"
  options={[
    'In the base image, ready for the new container',
    'Nowhere, because the container layer was discarded',
    'In the registry, beside the image it ran from',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Image layers, including the base image, are read only. Runtime writes never change them.',
    'Correct. Runtime writes land in the thin container layer, which disappears with the container. Anything the service needs on every start belongs in an image layer or in external storage.',
    'Incorrect. A registry stores images that someone builds and pushes. Runtime changes inside a container are never published there.',
  ]}
/>
