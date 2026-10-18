<script module>
  export const pageConfig = { title: 'Knowledge Check: A Map of the Book' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: A Map of the Book</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_map_1"
  question="An engineer wants to compare NVIDIA datacenter GPU architectures and their memory specifications before buying capacity. Which chapter covers this topic?"
  options={['Chapter 2, Models', 'Chapter 3, Hardware', 'Chapter 4, Software', 'Chapter 7, Production']}
  correct={1}
  optionFeedback={[
    'Incorrect. Chapter 2 covers model architectures and bottlenecks, not GPU specifications.',
    'Correct. Chapter 3 starts at the GPU spec sheet and covers compute, memory, architectures, and SKUs.',
    'Incorrect. Chapter 4 covers the software stack that runs on the GPU, from CUDA to inference engines.',
    'Incorrect. Chapter 7 covers operating production infrastructure and applications, not GPU selection.',
  ]}
/>
