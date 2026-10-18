<script module>
  export const pageConfig = { title: 'Distillation' };
</script>

<script>
  import WeightMatrixFigure from '../../../components/WeightMatrixFigure.svelte';
</script>

<h1>Distillation</h1>

<p>Distillation aims to keep most of a large model's intelligence at a fraction of its size.</p>

<p>
  <strong>Distillation</strong> trains a smaller "student" model to emulate a larger "teacher" model.
  The student learns from the teacher's probability distributions over possible outputs, not only from the teacher's final answers.
</p>

<WeightMatrixFigure mode="distill" />

<h2>Distillation versus fine-tuning on synthetic data</h2>

<p>
  A team can also generate synthetic training data with a large model and fine-tune a small model on it.
  The two approaches differ in the training signal.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Comparison of fine-tuning and distillation</caption>
    <thead>
      <tr>
        <th scope="col">Property</th>
        <th scope="col">Fine-tuning</th>
        <th scope="col">Distillation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Training signal</th>
        <td>Input-output pairs, including synthetic pairs from a larger model</td>
        <td>The teacher's full probability distributions</td>
      </tr>
      <tr>
        <th scope="row">What the model learns</th>
        <td>Better performance in a specific domain</td>
        <td>The teacher's overall behavior, both good and bad</td>
      </tr>
      <tr>
        <th scope="row">Effect on the model</th>
        <td>New weight values in the same architecture</td>
        <td>A separate, smaller model that imitates a larger one</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  A probability distribution carries more information than a single answer.
  It tells the student how likely the teacher considered every alternative token, which helps the student reproduce the teacher's reasoning style.
</p>
