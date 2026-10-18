<script module>
  export const pageConfig = { title: 'Containerization Terms' };
</script>

<h1>Containerization Terms</h1>

<p>
  <strong>Containerization</strong> is the practice of packaging an application together with its dependencies to
  standardize deployment in production. A container turns a program into a packaged artifact that runs the same way
  on any compatible host. The familiar complaint that code "works on my machine" stops applying.
</p>

<p>
  Containers are lightweight because they share the host operating system kernel. In this context, kernel means the
  Linux kernel, not a CUDA kernel. That light footprint makes containers a good fit for packaging inference services.
</p>

<h2>Core vocabulary</h2>

<p>For most developers, containerization means Docker. Docker work uses four terms.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Term</th><th scope="col">Definition</th></tr>
  </thead>
  <tbody>
    <tr><td>Container</td><td>An actively running environment that isolates an application and its dependencies.</td></tr>
    <tr><td>Image</td><td>An executable package that contains everything needed to run a piece of software.</td></tr>
    <tr><td>Dockerfile</td><td>A human-readable file with well-specified, machine-interpretable instructions for creating an image.</td></tr>
    <tr><td>Registry</td><td>A central repository for managing, storing, sharing, and distributing images.</td></tr>
  </tbody>
</table>

<p>
  An image is the static package. A container is a running instance of that image. A Dockerfile is the recipe that
  produces the image, and a registry is where finished images are published and retrieved.
</p>

<h2>Registries</h2>

<p>
  NVIDIA, several cloud providers, and Docker itself operate container registries. Docker Hub is a popular registry
  for AI work. Docker Hub plays the same role for images that Hugging Face plays for model weights and that PyPI plays
  for Python packages.
</p>
