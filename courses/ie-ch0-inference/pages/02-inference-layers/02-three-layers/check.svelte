<script module>
  export const pageConfig = { title: 'Knowledge Check: The Three Layers' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Three Layers</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_layers_1"
  question="An engineer swaps in a faster attention kernel so that one model replica on one GPU instance returns tokens sooner. Which layer does this work belong to?"
  options={['Infrastructure', 'Runtime', 'Tooling']}
  correct={1}
  optionFeedback={[
    'Incorrect. Infrastructure scales across clusters, regions, and clouds. This change affects a single instance.',
    'Correct. The runtime layer optimizes the performance of a single model on a single GPU-backed instance.',
    'Incorrect. Tooling sets the level of abstraction engineers work at. It does not change kernel performance.',
  ]}
/>

<MultipleChoice
  id="kc_layers_2"
  question="A platform team designs the interface that lets engineers deploy a model and adjust its settings without managing raw compute. Which layer does this work belong to?"
  options={['Infrastructure', 'Runtime', 'Tooling']}
  correct={2}
  optionFeedback={[
    'Incorrect. Infrastructure supplies and scales the compute. The interface engineers use to reach it is a separate layer.',
    'Incorrect. Runtime work optimizes a model on its hardware. This team is shaping the developer experience.',
    'Correct. Tooling gives engineers the right level of abstraction to balance control with productivity.',
  ]}
/>
