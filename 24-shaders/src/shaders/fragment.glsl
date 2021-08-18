uniform vec3 uColor;
uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.5;
  gl_FragColor = textureColor;
}