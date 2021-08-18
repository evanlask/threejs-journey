uniform vec3 uColorDepth;
uniform vec3 uColorSurface;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier ;
  vec3 color = mix(uColorDepth, uColorSurface, mixStrength);

  gl_FragColor = vec4(color, 1.0);
}