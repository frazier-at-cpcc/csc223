<script module>
  export const pageConfig = { title: 'Tokens and Tokenization' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import TokenizationDiagram from '../../../components/TokenizationDiagram.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Tokens and Tokenization</h1>

<p>
  <Term id="llm">LLMs</Term> perform <Term id="autoregressive-generation">autoregressive generation</Term>. An LLM generates new tokens one
  at a time, and each new token depends on every token before it.
</p>

<h2>Tokens</h2>

<p>
  A <strong>token</strong> is the atomic unit of a language model: an integer that represents a chunk
  of text. Modern LLMs use <strong>subword tokenization</strong>. Each token is a whole word or a
  fraction of a word. In English, most tokenizers produce about four tokens for every three words.
</p>

<Figure
  number="2.5"
  caption="Subword tokenization uses one token per common word and punctuation mark, but it splits less common words into multiple tokens."
  description="The sentence 'Inference engineering makes AI apps fast.' contains 41 characters and 6 words. A tokenizer splits it into 8 tokens: In (ID 644), ference (ID 2251), engineering (ID 15000), makes (ID 3727), AI (ID 15502), apps (ID 10721), fast (ID 5043), and the period (ID 13). The less common word Inference becomes two tokens. Every other word and the period become one token each."
>
  <TokenizationDiagram />
</Figure>

<h2>Tokenizers and vocabularies</h2>

<p>
  Converting text into tokens, and tokens back into text, requires no neural network. A
  <strong>tokenizer</strong> is a deterministic mapping between strings and their numerical token
  representation.
</p>

<p>
  A model's <strong>vocabulary</strong> is the complete mapping between its tokens and strings. As of
  early 2026, most widely used LLMs have vocabularies of more than 100,000 tokens. In other modalities, such as speech
  synthesis, the vocabulary expands so that tokens can represent other information, such as audio
  waveforms.
</p>

<h2>Why tokenizers matter for performance</h2>

<p>
  Vocabularies and tokenizers vary from model to model. Recent models tend to use more efficient
  tokenization schemes. A model that needs fewer tokens to express the same output finishes inference
  sooner, so a more efficient tokenizer improves <Term id="end-to-end-latency">end-to-end latency</Term>.
</p>
