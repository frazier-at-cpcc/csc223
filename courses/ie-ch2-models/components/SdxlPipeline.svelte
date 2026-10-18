<ol class="ie-flow" aria-label="SDXL pipeline stages in order">
  <li>
    <span class="ie-flow__step">1. Noise</span>
    Random latent, 128 × 128
    <span class="ie-flow__note">Prompt is encoded for the denoisers.</span>
  </li>
  <li class="ie-flow__model">
    <span class="ie-flow__step">2. Base model</span>
    Denoises from pure noise to a coherent image
    <span class="ie-flow__note">Conditioned on the prompt</span>
  </li>
  <li>
    <span class="ie-flow__step">3. Unrefined latent</span>
    128 × 128
  </li>
  <li class="ie-flow__model">
    <span class="ie-flow__step">4. Refiner model</span>
    Adds detail and improves prompt adherence
    <span class="ie-flow__note">Conditioned on the prompt</span>
  </li>
  <li>
    <span class="ie-flow__step">5. Refined latent</span>
    128 × 128
  </li>
  <li class="ie-flow__model">
    <span class="ie-flow__step">6. VAE decoder</span>
    Converts latent space to pixel space
  </li>
  <li>
    <span class="ie-flow__step">7. Final image</span>
    1024 × 1024 pixels
  </li>
</ol>
