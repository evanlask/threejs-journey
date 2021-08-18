uniform float uAmplitude;
uniform vec2 uFrequency;
uniform float uTime;

varying float vElevation;
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * uAmplitude;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * uAmplitude;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vElevation = elevation;
  vUv = uv;
}