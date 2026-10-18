<script module>
  export const pageConfig = { title: 'Knowledge Check: Fine-Tuning and Distillation' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Fine-Tuning and Distillation</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 7: Differentiate fine-tuning, fine-tuning on teacher-generated data, and knowledge distillation.</p>

<Matching
  id="kc_adapt_1"
  question="Match each method to the training signal it uses."
  pairs={[
    { left: 'Fine-tuning on labeled data', right: 'Input-output pairs that people wrote or checked' },
    { left: 'Fine-tuning on teacher-generated data', right: 'Answers that a larger model wrote as text' },
    { left: 'Knowledge distillation', right: "A larger model's probability for every candidate token" },
    { left: 'Step distillation', right: "A many-step image model's results, matched in fewer steps" },
  ]}
  correctFeedback="Correct. The training signal is what separates these methods, even when releases call all of them distills."
  incorrectFeedback="Not yet. Ask what the student sees during training: human-checked pairs, a teacher's written text, a teacher's full probabilities, or an image teacher's output reached in fewer steps."
/>

<p class="ie-obj">Objective 7: Differentiate fine-tuning, fine-tuning on teacher-generated data, and knowledge distillation.</p>

<MultipleChoice
  id="kc_adapt_2"
  question="A team can reach a large closed model only through an API that returns generated text. It wants a 7-billion-parameter open model that imitates the closed model on customer-support replies. Which method is available to the team?"
  options={[
    'Fine-tuning on text that the closed model generates',
    'Knowledge distillation from the closed model',
    'Step distillation from the closed model',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The API supplies generated text, which is exactly the signal that fine-tuning on teacher-generated data needs.',
    'Not quite. Knowledge distillation needs the teacher\'s full probability distributions, which a text-only API does not return.',
    'Not quite. Step distillation cuts the denoising steps of image models. It does not apply to a text model.',
  ]}
/>

<p class="ie-obj">Objective 7: Differentiate fine-tuning, fine-tuning on teacher-generated data, and knowledge distillation.</p>

<MultipleChoice
  id="kc_adapt_3"
  question="DeepSeek built its R1 distills by fine-tuning existing pre-trained Qwen 2.5 and Llama 3 models. What did that training change in those models?"
  options={[
    'Their architectures, which were enlarged to match R1',
    'Their layer counts, which shrank as training removed layers',
    'Their weight values, inside the original architectures',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. The distills kept the Qwen and Llama architectures, which is why existing performance tooling still worked on them.',
    'Not quite. Fine-tuning does not remove layers. The Qwen and Llama models kept their original sizes.',
    'Correct. Fine-tuning sets new weight values and keeps the architecture, so the distills stayed small and fast to serve.',
  ]}
/>
