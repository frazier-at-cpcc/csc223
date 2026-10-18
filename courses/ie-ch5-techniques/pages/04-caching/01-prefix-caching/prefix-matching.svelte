<script module>
  export const pageConfig = { title: 'How Prefixes Match' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import PrefixMatch from '../../../components/PrefixMatch.svelte';
  import PrefixExplorer from '../../../components/PrefixExplorer.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>How Prefixes Match</h1>

<h2>The end of a shared prefix</h2>
<p>
  Prefix caching works from the start of the input sequence up to the first token that differs. Consider two
  prompts of four tokens each.
</p>

<PrefixMatch
  number="5.7"
  caption="A pair of four-token sequences with a two-token matching prefix."
  description="Prompt 1 is 'Weather in SF ?' and prompt 2 is 'Weather in NYC ?'. The tokens 'Weather' and 'in' match and are read from cache. 'SF' and 'NYC' differ, so the prefix ends there. The final question mark is identical in both prompts, but it follows the first differing token, so prefill computes it again."
  rows={[
    [['Weather', 'match'], ['in', 'match'], ['SF', 'miss'], ['?', 'recomputed']],
    [['Weather', 'match'], ['in', 'match'], ['NYC', 'miss'], ['?', 'recomputed']],
  ]}
/>

<p>
  The engine re-uses the KV cache for "Weather in" and runs prefill only on the remaining tokens. The question mark
  appears in both prompts, but it comes after the first non-repeated token, so the engine recomputes it.
</p>

<h2>Context order and savings</h2>
<p>Rewrite the same request with the city first.</p>

<PrefixMatch
  number="5.8"
  caption="A pair of four-token sequences with no prefix match. The first tokens differ, so the matching tokens that follow make no difference."
  description="Prompt 1 is 'SF weather today ?' and prompt 2 is 'NYC weather today ?'. The first tokens, 'SF' and 'NYC', differ, so there is no shared prefix. The remaining three tokens are identical, but prefill computes all of them again."
  rows={[
    [['SF', 'miss'], ['weather', 'recomputed'], ['today', 'recomputed'], ['?', 'recomputed']],
    [['NYC', 'miss'], ['weather', 'recomputed'], ['today', 'recomputed'], ['?', 'recomputed']],
  ]}
/>

<p>
  Here prefix caching saves nothing. The first token differs, even though every later token is the same. The order
  of prompt content therefore determines your TTFT savings.
</p>

<Signal kind="mistake" title="Expecting identical later text to hit the cache">
  <p>
    Identical tokens count only when every token before them is also identical. A 4,000-token system prompt placed
    after a per-request timestamp never hits the cache, because the timestamp ends the shared prefix at the first
    token.
  </p>
</Signal>

<Callout type="tip">
  <p>Place novel tokens, such as the user's question, a timestamp, or a user name, as late in the context as possible.</p>
</Callout>

<PrefixExplorer />

<h2>Prefix reuse and other forms of reuse</h2>
<p>
  Prefix caching is the dominant form of KV cache re-use because LLMs are autoregressive. One novel token changes
  how the model represents every token after it, even when the later text looks identical to a human reader.
</p>
<p>
  Active research targets other forms of re-use. Caching an arbitrary sequence from the middle of a prompt requires
  correcting positional embeddings and selectively recomputing KV entries to preserve output quality. Tools such
  as CacheBlend and LMCache support these non-prefix sequences.
</p>
