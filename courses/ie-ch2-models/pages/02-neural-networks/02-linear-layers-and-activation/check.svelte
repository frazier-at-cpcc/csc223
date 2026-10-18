<script module>
  export const pageConfig = { title: 'Knowledge Check: Linear Layers and Activation Functions' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Linear Layers and Activation Functions</h1>

<p>
  These questions are ungraded and practice objective 1, explaining why activation functions sit between
  linear layers. Retry them as often as you like.
</p>

<NumericQuestion
  id="kc_linear_1"
  question="Layer 1 computes y = 3x + 1. Layer 2 computes z = 2y + 5. No activation function sits between them. The pair equals one layer z = wx + b. What is b?"
  answer={7}
  correctFeedback="z = 2(3x + 1) + 5 = 6x + 7, so the pair equals one layer with w = 6 and b = 7. This is the scalar form of b3 = b1W2 + b2."
  incorrectFeedback="Substitute layer 1 into layer 2: z = 2(3x + 1) + 5 = 6x + 2 + 5 = 6x + 7. The first bias passes through the second weight before the second bias is added, so b = 1 × 2 + 5 = 7."
/>

<Sorting
  id="kc_linear_2"
  question="Sort each operation by whether stacking it with linear layers collapses into one linear layer."
  items={['xW + b', 'ReLU(x) = max(0, x)', 'SiLU(x)', 'Multiplying by W1 and then by W2', 'Adding a constant bias vector']}
  targets={['Linear: the stack collapses', 'Nonlinear: the stack stays deep']}
  correct={[0, 1, 1, 0, 0]}
  correctFeedback="Matrix products and bias additions compose into one linear map. ReLU and SiLU bend the function, which keeps the layers separate."
  incorrectFeedback="Any chain of matrix multiplications and bias additions composes into a single xW + b. Only a nonlinear function such as ReLU or SiLU prevents that collapse."
/>

<MultipleChoice
  id="kc_linear_3"
  question="A team replaces every ReLU in a 12-layer network with the identity function f(x) = x. What can the modified network represent?"
  options={[
    'Only what a single linear layer can represent',
    'Only what a 6-layer network with ReLU can represent',
    'The same functions as before, at lower cost',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The identity function is linear, so the 12 matmuls and biases compose into one xW + b. The extra layers add parameters but no capacity.',
    'Incorrect. Removing the nonlinearity does not halve the depth. All 12 layers collapse into the equivalent of one.',
    'Incorrect. The identity function adds no nonlinearity. The network loses the ability to represent anything a single linear layer cannot.',
  ]}
/>
