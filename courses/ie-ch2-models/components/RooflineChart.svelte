<svg viewBox="0 0 560 360" role="img" aria-labelledby="roof-title">
  <title id="roof-title">Roofline chart. Performance on the vertical axis rises along a diagonal bandwidth ceiling as arithmetic intensity increases, until it meets a flat horizontal compute ceiling at the ridge point. Points left of the ridge are memory bound. Points right of the ridge are compute bound.</title>
  <!-- axes -->
  <line class="ie-svg-line" x1="70" y1="300" x2="530" y2="300" />
  <line class="ie-svg-line" x1="70" y1="300" x2="70" y2="30" />
  <!-- bandwidth ceiling (diagonal) and its extension -->
  <line x1="70" y1="300" x2="270" y2="110" stroke="var(--tessera-primary-dark)" stroke-width="3" />
  <line x1="270" y1="110" x2="350" y2="34" stroke="var(--tessera-text-light)" stroke-width="1.5" stroke-dasharray="4 4" />
  <!-- compute ceiling (horizontal) -->
  <line x1="270" y1="110" x2="530" y2="110" stroke="var(--tessera-primary-dark)" stroke-width="3" />
  <!-- ridge point -->
  <line class="ie-svg-line" x1="270" y1="110" x2="270" y2="300" stroke-dasharray="4 4" />
  <circle cx="270" cy="110" r="6" fill="var(--tessera-primary-dark)" />
  <text class="ie-svg-text" x="280" y="96">Ridge point = GPU ops:byte ratio</text>
  <text class="ie-svg-text" x="400" y="130" text-anchor="middle">Compute ceiling (horizontal)</text>
  <text class="ie-svg-text" x="150" y="178" text-anchor="middle" transform="rotate(-43 150 178)">Bandwidth ceiling (diagonal)</text>
  <rect class="ie-svg-box--plain" x="125" y="240" width="120" height="28" rx="4" />
  <text class="ie-svg-label" x="185" y="259" text-anchor="middle">Memory bound</text>
  <rect class="ie-svg-box" x="345" y="200" width="130" height="28" rx="4" />
  <text class="ie-svg-label" x="410" y="219" text-anchor="middle">Compute bound</text>
  <text class="ie-svg-label" x="300" y="335" text-anchor="middle">Arithmetic intensity (operations per byte)</text>
  <text class="ie-svg-label" transform="translate(30 165) rotate(-90)" text-anchor="middle">Performance (operations per second)</text>
</svg>
