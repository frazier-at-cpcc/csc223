<script module>
  export const pageConfig = { title: 'Knowledge Check: AI-Native Applications' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: AI-Native Applications</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_apps_1"
  question="Which builder must design its inference system to support any model and any use case?"
  options={[
    'A company building a coding assistant inside its own IDE',
    'A company building a customer service agent for retailers',
    'A company building an internal platform that serves all of its product teams',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. A coding assistant is a vertical application with a narrow, well-defined use case.',
    'Not quite. A customer service agent is a vertical application that can add many constraints.',
    'Correct. An inference platform must serve any model and any use case, so it cannot rely on narrow constraints.',
  ]}
/>

<MultipleChoice
  id="kc_apps_2"
  question="In a sales prospecting agent, one click by the user triggers a chain of 12 inference calls. How does the latency of each call affect the user?"
  options={[
    'Each call adds to the total time the user waits for a result',
    "The first call's time to first token sets the entire wait",
    'Per-call latency is irrelevant because agents run without a user',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Many calls per action means per-call latency accumulates into the wait the user experiences.',
    'Not quite. The user waits for the whole chain of calls, not only for the first token of the first call.',
    'Not quite. A user starts the action and waits for its result, so latency still matters.',
  ]}
/>
