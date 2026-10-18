<script module>
  export const pageConfig = { title: 'Kubernetes Clusters' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ClusterPlanes from '../../../components/ClusterPlanes.svelte';
</script>

<h1>Kubernetes Clusters</h1>

<p>
  Autoscaling systems use <strong>Kubernetes</strong>, an open-source container orchestration system, together with a
  cluster-level system that provisions and releases compute. Kubernetes runs one or more replicas of a model container.
</p>

<ul>
  <li>A <strong>replica</strong> is one running copy of a model container.</li>
  <li>An <strong>instance</strong> is the provisioned virtual machine that a replica runs on. It includes the GPUs, CPU, memory, storage, and networking that the container requires.</li>
</ul>

<h2>Control plane and worker plane</h2>

<p>Kubernetes groups hardware resources into a <strong>cluster</strong>. A cluster has two types of components.</p>

<ul>
  <li><strong>Control plane:</strong> makes routing and scaling decisions.</li>
  <li><strong>Worker plane:</strong> runs the containerized applications.</li>
</ul>

<Figure
  number="7.5"
  caption="Kubernetes clusters have a single control plane that orchestrates multiple workers."
  description="One control plane box connects to four worker plane boxes. The control plane decides where work runs and how many replicas exist. The worker planes run the model containers."
>
  <ClusterPlanes />
</Figure>

<p>
  One cluster can run several replicas of several models. The open question is how many replicas of each model to run.
  Unless traffic is unusually steady, no single replica count fits every hour of the day. Autoscaling answers that
  question continuously.
</p>
