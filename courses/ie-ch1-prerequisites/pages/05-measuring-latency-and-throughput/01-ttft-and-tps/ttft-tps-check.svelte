<script module>
  export const pageConfig = { title: 'Knowledge Check: TTFT and TPS' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: TTFT and TPS</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_ttft_1"
  question="Which phase of LLM inference determines time to first token?"
  options={[
    'Decode, which is bound by memory bandwidth',
    'Prefill, which is compute-bound',
    'Tokenization, which runs on the CPU',
  ]}
  correct={1}
  optionFeedback={[
    'Not quite. Decode generates the tokens after the first one, so it governs TPS.',
    'Correct. The model must process the full input in prefill before it can emit the first token.',
    'Not quite. Tokenization is a fast preprocessing step. The book ties TTFT to prefill.',
  ]}
/>

<MultipleChoice
  id="kc_ttft_2"
  question="An agent makes a tool call and cannot act until the complete JSON output arrives. Which metric best describes the latency of this call?"
  options={['Perceived TPS', 'Time to first token', 'Total response time']}
  correct={2}
  optionFeedback={[
    'Not quite. Perceived TPS describes a streamed experience. Individual tokens of a tool call are not useful on their own.',
    'Not quite. The first token of a tool call is not usable, so its arrival time does not reflect the wait.',
    'Correct. When output is only useful once complete, measure the total time from request to full response.',
  ]}
/>
