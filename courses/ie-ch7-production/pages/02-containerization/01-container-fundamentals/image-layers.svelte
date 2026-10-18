<script module>
  export const pageConfig = { title: 'Image Layers' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ContainerLayers from '../../../components/ContainerLayers.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Image Layers</h1>

<p>
  A Docker <Term id="container-image">image</Term> is built from layers. You start from a preconfigured base image and
  add layers of filesystem changes on top of it. Three types of layers make up a running container.
</p>
<ul>
  <li><strong>Base image:</strong> an operating system distribution such as Ubuntu, or a more complex image taken from a registry. The base image itself contains several layers.</li>
  <li><strong>Additional layers:</strong> filesystem changes that Dockerfile instructions specify, including dependencies, application code, and configuration files.</li>
  <li><strong>Container layer:</strong> a thin, ephemeral layer created at runtime. Any file that the running container creates, updates, or deletes is written here. Those changes disappear when the container terminates.</li>
</ul>

<Figure
  number="7.1"
  caption="Docker containers are composed of layers, from a base image up to an ephemeral, writable top layer."
  description="A stack of five layers. The bottom layer is the base image. Three image layers sit above it. All four of these layers are read only. The top layer is the container layer, which is the only read-write layer, and it exists only while the container runs."
>
  <ContainerLayers />
</Figure>

<h2>Choosing a Base Image</h2>
<p>
  The base image is the first reproducibility decision, because every later layer depends on it. <Term id="inference-engine">Inference engines</Term>
  such as <Term id="vllm" /> and <Term id="sglang" /> publish official base images for their active releases. Starting
  from one of these proven images is usually a better choice than building an image from scratch. A proven image gives
  the rest of the build a known working foundation. The Dependency Management lesson shows how to make sure that a
  rebuild months later starts from exactly the same base.
</p>
