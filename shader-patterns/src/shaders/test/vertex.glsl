uniform float uAmplitude;
uniform float uFrequency;
uniform float uLimit;
uniform float uTime;

varying vec2 vUv;
varying float vAmplitude;
varying float vFrequency;
varying float vLimit;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
    vAmplitude = uAmplitude;
    vFrequency = uFrequency;
    vLimit = uLimit;
}