<script module>
  export const pageConfig = { title: 'Knowledge Check: Dependency Management' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Dependency Management</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_dm_1"
  question="A requirements file lists transformers>=4.40.0. A rebuild next month picks up a new release that changes model output. Which change to the requirement prevents this?"
  options={[
    'Declare transformers with no version so the newest release installs.',
    'Pin transformers to one exact version, such as transformers==4.56.2.',
    'Raise the floor to a newer minimum, such as transformers>=4.56.2.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. An unversioned requirement accepts any release, which makes future breakage more likely.',
    'Correct. An exact pin resolves to the same version on every build, so an upstream release cannot change the image.',
    'Incorrect. A higher minimum still accepts every later release, so a future version can still break the build.',
  ]}
/>

<MultipleChoice
  id="kc_dm_2"
  question="A team needs fine-grained control over every engine flag and dependency in its inference container. Which starting point does the chapter recommend?"
  options={[
    'A less opinionated base image that the team builds on',
    'A multi-LLM NIM adapted to the target model',
    'An LLM-specific NIM used without changes',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Building from a less opinionated base image gives the most control over the final configuration.',
    'Incorrect. A NIM is a done-for-you configuration, and adapting one gives less control than building your own.',
    'Incorrect. An LLM-specific NIM is tuned for maximum performance out of the box, but it fixes many choices for you.',
  ]}
/>
