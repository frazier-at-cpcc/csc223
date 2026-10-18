<script module>
  export const pageConfig = { title: 'Kubernetes Clusters' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ClusterPlanes from '../../../components/ClusterPlanes.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Kubernetes Clusters</h1>

<p>
  Autoscaling systems use <strong>Kubernetes</strong>, an open-source container orchestration system, together with a
  cluster-level system that provisions and releases compute. Kubernetes runs one or more replicas of a model <Term id="container">container</Term>.
</p>
<ul>
  <li>A <Term id="replica">replica</Term>, as Chapter 0 defined it, is one running copy of a model container.</li>
  <li>An <Term id="instance">instance</Term> is the provisioned virtual machine that a replica runs on. It includes the GPUs, CPU, memory, storage, and networking that the container requires.</li>
  <li>A <strong>pod</strong> is the smallest unit that Kubernetes schedules. It holds one or more containers that run together on the same machine. A model replica usually runs as one pod.</li>
</ul>

<h2>Control Plane and Worker Nodes</h2>
<p>Kubernetes groups hardware resources into a <strong>cluster</strong>. A cluster has two types of components.</p>
<ul>
  <li><strong>Control plane:</strong> schedules pods onto machines and keeps the cluster in its desired state, including the replica count that the autoscaler sets.</li>
  <li><strong>Worker nodes:</strong> the machines that run the containerized applications. The book calls this part the worker plane.</li>
</ul>
<p>
  Requests themselves do not pass through the control plane. They travel on the data path, through Kubernetes
  services, <Term id="load-balancer">load balancers</Term>, and the routers covered later in this section. Production clusters run several copies of
  the control plane, so the loss of one copy does not stop scheduling.
</p>
<Figure
  number="7.5"
  caption="A Kubernetes control plane schedules containers onto multiple worker nodes."
  description="One control plane box connects to four worker node boxes. The control plane decides where pods run and how many replicas exist. The worker nodes run the model containers. Production clusters replicate the control plane for availability, which the figure does not show."
>
  <ClusterPlanes />
</Figure>
<p>
  One cluster can run several replicas of several models. The open question is how many replicas of each model to run.
  Unless traffic is unusually steady, no single replica count fits every hour of the day. Autoscaling answers that
  question continuously.
</p>
