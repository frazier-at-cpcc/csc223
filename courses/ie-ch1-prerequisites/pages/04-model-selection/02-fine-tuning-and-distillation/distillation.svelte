<script module>
  export const pageConfig = { title: 'Distillation' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import SoftLabelFigure from '../../../components/SoftLabelFigure.svelte';
</script>

<h1>Distillation</h1>

<p>Distillation aims to keep most of a large model's intelligence at a fraction of its size.</p>

<p>
  <dfn><strong>Distillation</strong></dfn> uses a large <dfn><strong>teacher</strong></dfn> model to train a smaller <dfn><strong>student</strong></dfn> model to emulate the teacher's behavior.
  A teacher can pass on two different training signals, and each one defines a different method.
</p>

<h2>Two training signals from one teacher</h2>

<p>
  At every output position, a language model computes a probability for each <Term id="token">token</Term> in its <Term id="vocabulary">vocabulary</Term>.
  Chapter 2 shows how the model turns its raw scores, called <Term id="logits">logits</Term>, into these probabilities.
  The model then writes one token, and the probabilities behind that choice disappear unless someone records them.
</p>

<ul>
  <li>
    <dfn><strong>Knowledge distillation</strong></dfn> trains the student to match the teacher's full probability distribution at every position.
    The student learns which answer the teacher preferred and how the teacher ranked every alternative.
    This method needs access to the teacher's probabilities, which usually means running the teacher's weights yourself.
  </li>
  <li>
    <dfn><strong>Fine-tuning on teacher-generated data</strong></dfn>, also called fine-tuning on synthetic data, has the teacher write answers and then fine-tunes the student on that text.
    The student sees only the tokens the teacher wrote.
    Research papers also call this method sequence-level distillation, and model releases often call its results distills.
  </li>
</ul>

<SoftLabelFigure />

<p>
  A probability distribution carries more information than a single answer.
  It tells the student that "Sydney" is a far more plausible mistake than "a," which helps the student reproduce the teacher's reasoning style.
</p>

<h2>Comparing the three methods</h2>

<div class="ie-table-wrap" role="region" aria-label="Fine-tuning, fine-tuning on teacher-generated data, and knowledge distillation compared" use:scrollable>
  <table class="ie-table">
    <caption>Fine-tuning, fine-tuning on teacher-generated data, and knowledge distillation compared</caption>
    <thead>
      <tr>
        <th scope="col">Property</th>
        <th scope="col">Fine-tuning on labeled data</th>
        <th scope="col">Fine-tuning on teacher-generated data</th>
        <th scope="col">Knowledge distillation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Training signal</th>
        <td>Input-output pairs that people wrote or checked</td>
        <td>Text that the teacher model generated</td>
        <td>The teacher's full probability distribution at each position</td>
      </tr>
      <tr>
        <th scope="row">What the model learns</th>
        <td>Better performance in one domain</td>
        <td>The teacher's answers and style on the prompts used</td>
        <td>The teacher's overall behavior, both good and bad</td>
      </tr>
      <tr>
        <th scope="row">What changes in the model</th>
        <td>New weight values in the same architecture</td>
        <td>New weight values for a smaller student, which may start from an existing pre-trained model</td>
        <td>New weight values for a smaller student, which may start from an existing pre-trained model</td>
      </tr>
      <tr>
        <th scope="row">Access to the teacher</th>
        <td>None needed</td>
        <td>Its text outputs, which an API can supply</td>
        <td>Its probabilities, which usually require its weights</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Image models use the word distillation in a third sense.
  <Term id="step-distillation">Step distillation</Term> trains an image model to produce a usable image in far fewer denoising steps than its teacher, and Chapter 2 covers it.
</p>
