<script>
  // Figure 6.3: high-performance embedding inference pipeline.
  import Figure from './Figure.svelte';
  const uid = $props.id();
  const description =
    'A client request arrives over HTTP at a model server, which handles input and output. The model server forwards requests to a multi-worker tokenizer, where four tokenizer workers run in parallel. The tokenizer passes tokenized sentences to a batch manager that holds a token queue. The batch manager sends batches to TensorRT-LLM for inference and receives the results. The batch manager returns the vector outputs to the model server, which sends them back to the client over HTTP.';
</script>

<Figure number="6.3" caption="A high-performance embedding inference pipeline adds parallel tokenization and batch management in front of an optimized inference engine." {description}>
  <svg viewBox="0 0 800 270" role="img" aria-label="Embedding inference pipeline: request, model server, multi-worker tokenizer, batch manager, and TensorRT-LLM">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>
    <g stroke="#0b5cad" stroke-width="1.5">
      <rect x="8" y="166" width="84" height="40" rx="5" fill="#e6f0fa" />
      <rect x="130" y="150" width="160" height="92" rx="6" fill="#e6f0fa" />
      <rect x="320" y="14" width="210" height="150" rx="6" fill="#e6f0fa" />
      <rect x="520" y="150" width="130" height="92" rx="6" fill="#e6f0fa" />
      <rect x="682" y="150" width="110" height="92" rx="6" fill="#e6f0fa" />
      <g fill="#ffffff" stroke-dasharray="4 3">
        <rect x="142" y="200" width="136" height="30" rx="4" />
        <rect x="334" y="56" width="88" height="40" rx="4" />
        <rect x="428" y="56" width="88" height="40" rx="4" />
        <rect x="334" y="108" width="88" height="40" rx="4" />
        <rect x="428" y="108" width="88" height="40" rx="4" />
        <rect x="532" y="200" width="106" height="30" rx="4" />
        <rect x="694" y="200" width="86" height="30" rx="4" />
      </g>
    </g>
    <g font-size="14" text-anchor="middle" dominant-baseline="middle">
      <text x="50" y="186">Request</text>
      <text x="210" y="172" font-weight="700">Model server</text>
      <text x="210" y="215">Input/output</text>
      <text x="425" y="34" font-weight="700">Multi-worker tokenizer</text>
      <text x="378" y="76">Tokenizer</text>
      <text x="472" y="76">Tokenizer</text>
      <text x="378" y="128">Tokenizer</text>
      <text x="472" y="128">Tokenizer</text>
      <text x="585" y="172" font-weight="700">Batch manager</text>
      <text x="585" y="215">Token queue</text>
      <text x="737" y="172" font-weight="700">TensorRT-LLM</text>
      <text x="737" y="215">Inference</text>
    </g>
    <g stroke="#0b5cad" stroke-width="1.5" fill="none">
      <line x1="92" y1="178" x2="128" y2="178" marker-end="url(#arrow-{uid})" />
      <line x1="128" y1="196" x2="94" y2="196" marker-end="url(#arrow-{uid})" />
      <polyline points="210,150 210,90 318,90" marker-end="url(#arrow-{uid})" />
      <polyline points="530,90 585,90 585,148" marker-end="url(#arrow-{uid})" />
      <line x1="650" y1="186" x2="680" y2="186" marker-end="url(#arrow-{uid})" />
      <line x1="680" y1="208" x2="652" y2="208" marker-end="url(#arrow-{uid})" />
      <line x1="520" y1="236" x2="292" y2="236" marker-end="url(#arrow-{uid})" />
    </g>
    <g font-size="12" text-anchor="middle">
      <text x="110" y="166">HTTP</text>
      <text x="262" y="82">Requests</text>
      <text x="585" y="80">Sentences</text>
      <text x="666" y="140">Batches</text>
      <text x="405" y="258">Vector outputs</text>
    </g>
  </svg>
</Figure>
