<script module>
  export const pageConfig = { title: 'Knowledge Check: Benchmarking' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Benchmarking</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_bench_1"
  question="A team can copy live production requests onto a test deployment without affecting users. What is this technique called?"
  options={['Canary deployment', 'Load testing', 'Profiling', 'Shadow traffic']}
  correct={3}
  optionFeedback={[
    'A canary deployment sends a small share of live traffic to a new deployment, and users receive its responses.',
    'Load testing sends sustained high traffic to probe limits. It does not mirror production requests.',
    'Profiling measures where time is spent inside the system. It does not supply traffic.',
    'Correct. Shadow traffic mirrors real production requests onto the system under test, which makes it the best benchmark input.',
  ]}
/>

<MultipleChoice
  id="kc_bench_2"
  question="A benchmark of a chat service uses prompts of about 50 tokens. Production prompts average 6,000 tokens because they include long documents. Which workload dimension does the benchmark fail to match?"
  options={[
    'Input parameters',
    'Request contents',
    'Sequence lengths',
    'Volume and pattern of traffic',
  ]}
  correct={2}
  optionFeedback={[
    'Input parameters are settings such as temperature and reasoning effort. The mismatch here is prompt size.',
    'Request contents concern what the prompts say, which affects cache hits. The mismatch here is how many tokens they hold.',
    'Correct. Input sequence length drives time to first token and memory use, so a 50-token benchmark misrepresents a 6,000-token workload.',
    'Volume and pattern concern how many requests arrive and when. The mismatch here is the size of each request.',
  ]}
/>
