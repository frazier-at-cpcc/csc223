<script module>
  export const pageConfig = { title: 'Sequences and the Context Window' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Sequences and the Context Window</h1>

<h2>The three sequences</h2>

<p>An inference request involves two or three sequences of tokens:</p>

<ul>
  <li><strong>Input sequence:</strong> the prompt, chat history, context, function definitions, and any other input passed to the LLM.</li>
  <li><strong>Reasoning sequence:</strong> an optional intermediate output in which a <Term id="reasoning-model">reasoning model</Term> generates reasoning tokens before it answers.</li>
  <li><strong>Output sequence:</strong> the response the LLM generates.</li>
</ul>

<h2>The context window</h2>

<p>
  The <strong>context window</strong> is the maximum number of tokens a model can process and generate
  for a single request. The input, reasoning, and output sequences together must fit inside it. A
  request may also cap the output length with a <code>max_tokens</code> argument.
</p>

<Signal kind="worked" title="The context window budget">
  <pre><code>Context window:              32,000 tokens
Input sequence:            - 30,000 tokens
Left for reasoning + output:   2,000 tokens</code></pre>
  <p>
    The request can produce at most 2,000 reasoning and output tokens combined, even if
    <code>max_tokens</code> is set higher. A reasoning model that spends 1,500 of them thinking leaves 500
    for the visible answer.
  </p>
</Signal>

<h2>The chat template</h2>

<p>
  The model receives its input sequence as a single string. LLMs, however, are trained to accept varied
  inputs, such as multi-turn chats with roles, function signatures for tool calls, and in some cases
  multimodal content. These inputs must be combined into one sequence.
</p>

<p>
  The <strong>chat template</strong> performs that combination. It is the model-specific formatting of
  messages, roles, separators, and beginning-of-sequence and end-of-sequence tokens. Chat templates
  differ subtly from model to model. The <Term id="inference-engine">inference engine</Term> must implement each one exactly, or output
  quality suffers.
</p>

<p>
  Applying the chat template and tokenizing the result is step zero of inference. The two main phases
  of inference follow in the next lesson.
</p>
