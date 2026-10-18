<script module>
  export const pageConfig = { title: 'Knowledge Check: Linear Layers and Activation Functions' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Linear Layers and Activation Functions</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_linear_1"
  question="A linear layer receives the input vector x = [1, 2]. Its weights matrix is W = [[2, 0], [1, 1]] and its bias vector is b = [0, 1]. What is the output y = xW + b?"
  options={['[2, 3]', '[4, 3]', '[4, 2]']}
  correct={1}
  optionFeedback={[
    'Incorrect. This result multiplies each input only by the diagonal weight. Each output is a weighted sum of every input: 1 × 2 + 2 × 1 = 4 for the first value.',
    'Correct. xW = [1 × 2 + 2 × 1, 1 × 0 + 2 × 1] = [4, 2]. Adding b = [0, 1] gives [4, 3].',
    'Incorrect. [4, 2] is xW before the bias is added. The linear layer adds b = [0, 1] to reach [4, 3].',
  ]}
/>

<MultipleChoice
  id="kc_linear_2"
  question="ReLU returns x when x is greater than zero and returns zero otherwise. What is the output of ReLU for the input x = -3?"
  options={['-3', '0', '3']}
  correct={1}
  optionFeedback={[
    'Incorrect. ReLU passes through only positive values. A negative input does not pass through unchanged.',
    'Correct. Every negative input maps to zero, which is how ReLU breaks linearity.',
    'Incorrect. ReLU does not take the absolute value. A negative input maps to zero.',
  ]}
/>
