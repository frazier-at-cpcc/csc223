<script module>
  export const pageConfig = { title: 'Before You Begin' };
</script>

<script>
  import ScrollTable from '../../components/ScrollTable.svelte';
  import Term from '$shared/Term.svelte';

  const primers = [
    {
      topic: 'HTTP',
      assumed: 'A client sends a request to a server and receives a response. Inference services are called this way.',
      source: 'MDN Web Docs',
      title: 'An overview of HTTP',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
    },
    {
      topic: 'Containers',
      assumed: 'An application and its dependencies are packaged as an image and run as an isolated process.',
      source: 'Docker documentation',
      title: 'What is a container?',
      href: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/',
    },
    {
      topic: 'Python packaging',
      assumed: 'Libraries are installed with pip into a virtual environment, and versions can be pinned.',
      source: 'Python Packaging User Guide',
      title: 'Installing packages',
      href: 'https://packaging.python.org/en/latest/tutorials/installing-packages/',
    },
    {
      topic: 'Matrix multiplication',
      assumed: 'Two matrices multiply when the inner dimensions match, and each output entry is a sum of products.',
      source: 'Khan Academy',
      title: 'Matrices unit, Precalculus',
      href: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:matrices',
    },
    {
      topic: 'Cloud object storage',
      assumed: 'Files are stored as objects in named buckets and fetched over HTTP. Model weights often live there.',
      source: 'Google Cloud',
      title: 'What is object storage?',
      href: 'https://cloud.google.com/learn/what-is-object-storage',
    },
    {
      topic: 'Benchmark suites',
      assumed: 'A fixed public set of questions scores models against each other. MMLU is a common example.',
      source: 'arXiv',
      title: 'Measuring Massive Multitask Language Understanding (the MMLU paper)',
      href: 'https://arxiv.org/abs/2009.03300',
    },
  ];
</script>

<h1>Before You Begin</h1>

<p>
  This series is written for software engineers and computing students who are new to serving generative AI models. It
  does not assume any knowledge of inference, GPUs, or model architecture. Section 02 of this chapter teaches the core
  vocabulary from the beginning.
</p>

<p>
  The series does assume general computing background. Later chapters use the six topics below without teaching them.
  Each row names one reputable primer. Review any topic that is unfamiliar before you reach the chapter that relies on it.
</p>

<h2>Assumed Background and Primers</h2>

<ScrollTable label="Background the series assumes, with one external primer for each topic">
<table>
  <caption>Background the series assumes, with one external primer for each topic</caption>
  <thead>
    <tr>
      <th scope="col">Topic</th>
      <th scope="col">What the series assumes</th>
      <th scope="col">Primer</th>
    </tr>
  </thead>
  <tbody>
    {#each primers as p (p.topic)}
      <tr>
        <th scope="row">{p.topic}</th>
        <td>{p.assumed}</td>
        <td>
          {p.source}:
          <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}<span class="sr-only"> (opens in a new tab)</span></a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
</ScrollTable>

<h2>Where the Background Matters</h2>

<ul>
  <li>Chapter 1 compares models with <Term id="benchmark-suite">benchmark suites</Term>.</li>
  <li>Chapter 2 describes the main work of every model layer as <Term id="matmul">matrix multiplication</Term>.</li>
  <li>
    Chapter 7 packages models in <Term id="container">containers</Term>, loads weights from
    <Term id="object-storage">object storage</Term>, and serves requests over <Term id="http">HTTP</Term>.
  </li>
  <li>Chapters 4 and 7 install inference engines as Python packages and pin their versions.</li>
</ul>

<p>This chapter uses no code and no mathematics beyond multiplication.</p>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
