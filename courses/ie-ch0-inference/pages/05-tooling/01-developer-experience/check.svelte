<script module>
  export const pageConfig = { title: 'Knowledge Check: Developer Experience' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Developer Experience</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_dx_1"
  question="A platform accepts model weights and returns an API endpoint. Engineers cannot change the inference engine, the quantization settings, or the autoscaling rules. Where does this platform sit on the developer experience spectrum?"
  options={['Basic constructs', 'Black box', 'Middle ground']}
  correct={1}
  optionFeedback={[
    'Incorrect. Basic constructs expose raw compute, network, and disk. This platform hides everything below the API.',
    'Correct. A black box takes weights and returns an API, which leaves engineers little control.',
    'Incorrect. The middle ground still exposes the controls that matter. This platform exposes none of them.',
  ]}
/>
