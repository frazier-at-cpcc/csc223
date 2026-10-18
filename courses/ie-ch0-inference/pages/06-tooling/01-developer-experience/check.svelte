<script module>
  export const pageConfig = { title: 'Knowledge Check: Developer Experience' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Developer Experience</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 8: recommend a
  developer-experience option for a described engineering team.
</p>

<h2>Matching Constraints to Positions</h2>

<Matching
  id="kc_dx_match"
  question="Match each team's constraints to the developer-experience position they support."
  pairs={[
    { left: 'Needs no tuning and has no one to do it', right: 'Black box' },
    { left: 'Must tune engines and scaling but cannot run clusters', right: 'Middle ground' },
    { left: 'Builds its own schedulers and staffs every layer', right: 'Basic constructs' },
  ]}
  correctFeedback="Correct. The need for control and the staff to use it decide the position."
  incorrectFeedback="A team that needs no control gains from a black box. A team that needs control without operating clusters needs the middle ground. A team that builds every layer needs basic constructs."
/>

<h2>Recommending a Position</h2>

<MultipleChoice
  id="kc_dx_case"
  question="A three-person marketing analytics team wants to add an internal tool that drafts weekly report summaries. Nobody on the team has served a model, a slow summary harms no customer, and the tool must ship this month. Which recommendation is most defensible?"
  options={[
    'Black box, because the team needs no tuning and has no one to operate a platform',
    'Middle ground, because every inference workload needs exposed engine settings',
    'Basic constructs, because full control keeps the cost of a small tool lowest',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The tool is non-critical, the team lacks inference expertise, and speed matters most. A black box fits every constraint.',
    'Incorrect. Exposed settings help only a team that will use them. This team has no need for them and no one to tune them.',
    'Incorrect. Basic constructs leave every layer for the team to build, which this team cannot staff or finish this month.',
  ]}
/>
