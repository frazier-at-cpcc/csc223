<script module>
  export const pageConfig = { title: 'Logs and Integration' };
</script>

<h1>Logs and Integration</h1>

<h2>Server Logs and Audit Logs</h2>
<p>
  When something goes wrong, inference engineers need information to fix it. Two kinds of logs deliver that
  information in real time.
</p>
<ul>
  <li><strong>Server logs</strong> record what the inference service does as it handles requests.</li>
  <li><strong>Audit logs</strong> record changes made to the inference service, including who made each change and when.</li>
</ul>

<h2>Integration with Existing Tools</h2>
<p>
  Build inference observability into the observability and alerting tools the organization already uses, such as
  Grafana, Datadog, PagerDuty, and Sentry. Integration places inference information in context with the rest of the
  application. An engineer investigating an incident then sees model behavior beside the application events around it.
</p>
